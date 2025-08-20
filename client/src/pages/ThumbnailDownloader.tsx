import { useState } from 'react';
import { AdSlot } from '@/components/AdSlot';
import { FAQAccordion } from '@/components/FAQAccordion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download, Link, Youtube, Instagram, Video } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const faqs = [
  {
    question: 'Which platforms are supported?',
    answer: 'Currently, we support YouTube video thumbnails. Instagram and TikTok support requires API access which is limited by their platforms.',
  },
  {
    question: 'What quality thumbnails can I download?',
    answer: 'For YouTube, we can extract thumbnails in various qualities including high resolution (1280x720) when available.',
  },
  {
    question: 'Is it legal to download thumbnails?',
    answer: 'Thumbnails are generally considered fair use, but please respect copyright and use them appropriately. Always check the platform\'s terms of service.',
  },
];

export default function ThumbnailDownloader() {
  const [url, setUrl] = useState('');
  const [platform, setPlatform] = useState('youtube');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const detectPlatform = (inputUrl: string) => {
    if (inputUrl.includes('youtube.com') || inputUrl.includes('youtu.be')) {
      return 'youtube';
    } else if (inputUrl.includes('instagram.com')) {
      return 'instagram';
    } else if (inputUrl.includes('tiktok.com')) {
      return 'tiktok';
    }
    return 'youtube';
  };

  const handleUrlChange = (value: string) => {
    setUrl(value);
    if (value) {
      const detectedPlatform = detectPlatform(value);
      setPlatform(detectedPlatform);
    }
  };

  const extractThumbnail = async () => {
    if (!url.trim()) {
      toast({
        title: 'URL required',
        description: 'Please enter a valid video URL.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await fetch('/api/download-thumbnail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: url.trim(), platform }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to extract thumbnail');
      }

      const data = await response.json();
      setThumbnailUrl(data.thumbnailUrl);
      
      toast({
        title: 'Thumbnail extracted!',
        description: 'Your thumbnail has been extracted successfully.',
      });
    } catch (error) {
      console.error('Thumbnail extraction error:', error);
      toast({
        title: 'Extraction failed',
        description: error instanceof Error ? error.message : 'Failed to extract thumbnail. Please check the URL and try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const downloadThumbnail = async () => {
    if (!thumbnailUrl) return;
    
    try {
      const response = await fetch(thumbnailUrl);
      const blob = await response.blob();
      const downloadUrl = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `thumbnail-${Date.now()}.jpg`;
      link.click();
      
      URL.revokeObjectURL(downloadUrl);
      
      toast({
        title: 'Download started',
        description: 'Your thumbnail is being downloaded.',
      });
    } catch (error) {
      toast({
        title: 'Download failed',
        description: 'There was an error downloading the thumbnail.',
        variant: 'destructive',
      });
    }
  };

  const clearResults = () => {
    setUrl('');
    setThumbnailUrl('');
    setPlatform('youtube');
  };

  return (
    <div>
      <section className="py-16 transition-theme bg-gray-50 dark:bg-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              <i className="fab fa-youtube text-red-500 mr-3"></i>
              Thumbnail Downloader
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Download high-quality thumbnails from YouTube, Instagram, and TikTok videos. 
              Get the perfect preview image for your projects and presentations.
            </p>
          </div>

          <Card className="shadow-lg">
            <CardContent className="p-6">
              <div className="space-y-6">
                {/* Input Section */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Video URL
                    </label>
                    <Input
                      value={url}
                      onChange={(e) => handleUrlChange(e.target.value)}
                      placeholder="Paste your video URL here (YouTube, Instagram, TikTok)"
                      className="text-base"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Platform
                    </label>
                    <Select value={platform} onValueChange={setPlatform}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="youtube">YouTube</SelectItem>
                        <SelectItem value="instagram">Instagram</SelectItem>
                        <SelectItem value="tiktok">TikTok</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button 
                    onClick={extractThumbnail}
                    disabled={!url.trim() || isLoading}
                    className="w-full bg-gradient-primary hover:bg-gradient-primary-hover"
                  >
                    {isLoading ? (
                      <>
                        <Video className="w-4 h-4 mr-2 animate-spin" />
                        Extracting Thumbnail...
                      </>
                    ) : (
                      <>
                        <Link className="w-4 h-4 mr-2" />
                        Extract Thumbnail
                      </>
                    )}
                  </Button>
                </div>

                {/* Thumbnail Preview */}
                {thumbnailUrl && (
                  <div className="space-y-4">
                    <div className="border border-border rounded-lg overflow-hidden">
                      <img 
                        src={thumbnailUrl} 
                        alt="Video thumbnail" 
                        className="w-full h-auto max-h-80 object-contain bg-muted"
                      />
                    </div>
                    
                    <div className="flex flex-wrap justify-center gap-3">
                      <Button onClick={downloadThumbnail} className="bg-green-600 hover:bg-green-700">
                        <Download className="w-4 h-4 mr-2" />
                        Download Thumbnail
                      </Button>
                      <Button onClick={clearResults} variant="outline">
                        Extract Another
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Supported Platforms */}
          <div className="mt-12">
            <h3 className="text-xl font-semibold text-foreground mb-6 text-center">Supported Platforms</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Youtube className="text-red-600 dark:text-red-400 w-8 h-8" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">YouTube</h4>
                <p className="text-sm text-muted-foreground">Extract high-quality thumbnails from any YouTube video URL</p>
              </div>
              
              <div className="text-center opacity-50">
                <div className="w-16 h-16 bg-pink-100 dark:bg-pink-900/30 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Instagram className="text-pink-600 dark:text-pink-400 w-8 h-8" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">Instagram</h4>
                <p className="text-sm text-muted-foreground">Coming soon - requires API access</p>
              </div>
              
              <div className="text-center opacity-50">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-900/30 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Video className="text-gray-600 dark:text-gray-400 w-8 h-8" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">TikTok</h4>
                <p className="text-sm text-muted-foreground">Coming soon - requires API access</p>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-12">
            <FAQAccordion faqs={faqs} />
          </div>
        </div>
      </section>

      {/* Ad Slot */}
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AdSlot size="rectangle" className="mx-auto" />
        </div>
      </div>
    </div>
  );
}
