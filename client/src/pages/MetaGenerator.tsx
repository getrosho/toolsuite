import { useState } from 'react';
import { AdSlot } from '@/components/AdSlot';
import { FAQAccordion } from '@/components/FAQAccordion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tags, Copy, CheckCircle, Globe } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const faqs = [
  {
    question: 'What are meta tags and why are they important?',
    answer: 'Meta tags are HTML elements that provide information about your webpage to search engines and social media platforms. They help improve SEO and control how your content appears in search results and when shared.',
  },
  {
    question: 'What is the optimal length for meta descriptions?',
    answer: 'Meta descriptions should be between 120-160 characters. This ensures they display fully in search results without being truncated.',
  },
  {
    question: 'Should I include keywords in meta tags?',
    answer: 'Yes, include relevant keywords naturally in your title and description. However, avoid keyword stuffing as it can hurt your SEO rankings.',
  },
];

export default function MetaGenerator() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [keywords, setKeywords] = useState('');
  const [url, setUrl] = useState('');
  const [generatedTags, setGeneratedTags] = useState('');
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const generateMetaTags = async () => {
    if (!title.trim() || !description.trim()) {
      toast({
        title: 'Required fields missing',
        description: 'Please fill in both title and description fields.',
        variant: 'destructive',
      });
      return;
    }

    try {
      const response = await fetch('/api/generate-meta-tags', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim(),
          keywords: keywords.trim(),
          url: url.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error('Meta tag generation failed');
      }

      const data = await response.json();
      setGeneratedTags(data.metaTags);
      
      toast({
        title: 'Meta tags generated!',
        description: 'Your SEO-optimized meta tags are ready.',
      });
    } catch (error) {
      console.error('Meta tag generation error:', error);
      toast({
        title: 'Generation failed',
        description: 'There was an error generating meta tags. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedTags);
      setCopied(true);
      toast({
        title: 'Copied to clipboard',
        description: 'Meta tags have been copied to your clipboard.',
      });
      
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: 'Copy failed',
        description: 'Unable to copy to clipboard. Please select and copy manually.',
        variant: 'destructive',
      });
    }
  };

  const clearForm = () => {
    setTitle('');
    setDescription('');
    setKeywords('');
    setUrl('');
    setGeneratedTags('');
    setCopied(false);
  };

  const getTitleLength = () => title.length;
  const getDescriptionLength = () => description.length;
  
  const getTitleStatus = () => {
    const length = getTitleLength();
    if (length === 0) return { color: 'text-muted-foreground', message: 'Enter title' };
    if (length < 30) return { color: 'text-yellow-600 dark:text-yellow-400', message: 'Too short' };
    if (length > 60) return { color: 'text-red-600 dark:text-red-400', message: 'Too long' };
    return { color: 'text-green-600 dark:text-green-400', message: 'Good length' };
  };

  const getDescriptionStatus = () => {
    const length = getDescriptionLength();
    if (length === 0) return { color: 'text-muted-foreground', message: 'Enter description' };
    if (length < 120) return { color: 'text-yellow-600 dark:text-yellow-400', message: 'Too short' };
    if (length > 160) return { color: 'text-red-600 dark:text-red-400', message: 'Too long' };
    return { color: 'text-green-600 dark:text-green-400', message: 'Perfect length' };
  };

  return (
    <div>
      <section className="py-16 transition-theme bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              <i className="fas fa-tags text-teal-500 mr-3"></i>
              Meta Tag Generator
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Generate SEO-optimized meta tags for better search engine visibility and social media sharing. 
              Create perfect titles, descriptions, and Open Graph tags for your website.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Form */}
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-medium text-foreground">
                        Page Title *
                      </label>
                      <div className={`text-xs ${getTitleStatus().color}`}>
                        {getTitleLength()}/60 • {getTitleStatus().message}
                      </div>
                    </div>
                    <Input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Enter your page title (30-60 characters)"
                      className="text-base"
                      maxLength={80}
                    />
                    <div className="text-xs text-muted-foreground mt-1">
                      The main title that appears in search results and browser tabs
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-medium text-foreground">
                        Meta Description *
                      </label>
                      <div className={`text-xs ${getDescriptionStatus().color}`}>
                        {getDescriptionLength()}/160 • {getDescriptionStatus().message}
                      </div>
                    </div>
                    <Textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Write a compelling description of your page (120-160 characters)"
                      rows={3}
                      className="resize-none"
                      maxLength={200}
                    />
                    <div className="text-xs text-muted-foreground mt-1">
                      Brief summary that appears in search results below the title
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Keywords (Optional)
                    </label>
                    <Input
                      value={keywords}
                      onChange={(e) => setKeywords(e.target.value)}
                      placeholder="keyword1, keyword2, keyword3"
                      className="text-base"
                    />
                    <div className="text-xs text-muted-foreground mt-1">
                      Comma-separated relevant keywords for your content
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Page URL (Optional)
                    </label>
                    <Input
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="https://example.com/page"
                      className="text-base"
                      type="url"
                    />
                    <div className="text-xs text-muted-foreground mt-1">
                      Full URL of the page for Open Graph tags
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Button 
                      onClick={generateMetaTags}
                      disabled={!title.trim() || !description.trim()}
                      className="bg-gradient-primary hover:bg-gradient-primary-hover"
                    >
                      <Tags className="w-4 h-4 mr-2" />
                      Generate Meta Tags
                    </Button>
                    
                    {(title || description || keywords || url) && (
                      <Button onClick={clearForm} variant="outline">
                        Clear Form
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Generated Tags */}
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-foreground">Generated Meta Tags</h3>
                    {generatedTags && (
                      <Button
                        onClick={copyToClipboard}
                        variant="outline"
                        size="sm"
                        className="text-xs"
                      >
                        {copied ? (
                          <>
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3 mr-1" />
                            Copy
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                  
                  {generatedTags ? (
                    <div className="bg-muted rounded-lg p-4">
                      <pre className="text-sm font-mono text-foreground whitespace-pre-wrap overflow-x-auto">
                        {generatedTags}
                      </pre>
                    </div>
                  ) : (
                    <div className="bg-muted rounded-lg p-8 text-center">
                      <Globe className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                      <div className="text-muted-foreground text-sm">
                        Fill in the form and click "Generate Meta Tags" to see your optimized meta tags here
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* SEO Tips */}
          <div className="mt-12">
            <h3 className="text-xl font-semibold text-foreground mb-6 text-center">SEO Best Practices</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-card p-6 rounded-lg border border-border">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
                  <Tags className="text-blue-600 dark:text-blue-400 w-6 h-6" />
                </div>
                <h4 className="font-semibold text-card-foreground mb-2">Unique Titles</h4>
                <p className="text-sm text-muted-foreground">
                  Create unique, descriptive titles for each page. Include your main keyword near the beginning.
                </p>
              </div>
              
              <div className="bg-card p-6 rounded-lg border border-border">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4">
                  <Globe className="text-green-600 dark:text-green-400 w-6 h-6" />
                </div>
                <h4 className="font-semibold text-card-foreground mb-2">Compelling Descriptions</h4>
                <p className="text-sm text-muted-foreground">
                  Write engaging descriptions that encourage clicks while accurately describing your content.
                </p>
              </div>
              
              <div className="bg-card p-6 rounded-lg border border-border">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle className="text-purple-600 dark:text-purple-400 w-6 h-6" />
                </div>
                <h4 className="font-semibold text-card-foreground mb-2">Regular Updates</h4>
                <p className="text-sm text-muted-foreground">
                  Keep your meta tags updated as your content changes to maintain search engine relevance.
                </p>
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
