import { useState } from 'react';
import { AdSlot } from '@/components/AdSlot';
import { FAQAccordion } from '@/components/FAQAccordion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CloudUpload, Download, Image, Wand2, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const faqs = [
  {
    question: 'What image formats are supported?',
    answer: 'We support JPEG, PNG, GIF, BMP, and WebP image formats. The output will always be a PNG with transparent background.',
  },
  {
    question: 'How accurate is the background removal?',
    answer: 'Our AI-powered background removal is highly accurate for most images, especially portraits and products. Complex backgrounds may require manual touch-ups.',
  },
  {
    question: 'What is the maximum image size?',
    answer: 'You can upload images up to 10MB in size. For best results, use high-quality images with clear subject-background distinction.',
  },
];

export default function RemoveBackground() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [originalImage, setOriginalImage] = useState<string>('');
  const [processedImage, setProcessedImage] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [processingComplete, setProcessingComplete] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/webp'];
      
      if (!validTypes.includes(file.type)) {
        toast({
          title: 'Invalid file type',
          description: 'Please select a valid image file (JPEG, PNG, GIF, BMP, or WebP).',
          variant: 'destructive',
        });
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: 'File too large',
          description: 'Please select an image file smaller than 10MB.',
          variant: 'destructive',
        });
        return;
      }
      
      setUploadedFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setOriginalImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      
      startProcessing(file);
    }
  };

  const startProcessing = async (file: File) => {
    setIsProcessing(true);
    setProcessingProgress(0);
    setProcessingComplete(false);
    
    // Simulate processing progress
    const progressInterval = setInterval(() => {
      setProcessingProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setIsProcessing(false);
          setProcessingComplete(true);
          // Simulate processed image (in reality, this would be the API response)
          setProcessedImage(originalImage);
          return 100;
        }
        return prev + 3;
      });
    }, 150);

    try {
      const formData = new FormData();
      formData.append('image', file);
      
      const response = await fetch('/api/remove-background', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Background removal failed');
      }

      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      setProcessedImage(imageUrl);
      
    } catch (error) {
      console.error('Background removal error:', error);
      setIsProcessing(false);
      clearInterval(progressInterval);
      toast({
        title: 'Processing failed',
        description: 'There was an error removing the background. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const downloadImage = () => {
    if (processedImage && uploadedFile) {
      const link = document.createElement('a');
      link.href = processedImage;
      link.download = `${uploadedFile.name.split('.')[0]}_no_bg.png`;
      link.click();
    }
  };

  const resetTool = () => {
    setUploadedFile(null);
    setOriginalImage('');
    setProcessedImage('');
    setIsProcessing(false);
    setProcessingProgress(0);
    setProcessingComplete(false);
  };

  return (
    <div>
      <section className="py-16 transition-theme bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              <i className="fas fa-magic text-pink-500 mr-3"></i>
              Remove Background Tool
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Remove image backgrounds automatically using AI technology. Perfect for product photos, 
              portraits, and creating transparent images for presentations and designs.
            </p>
          </div>

          <Card className="shadow-lg">
            <CardContent className="p-6">
              {!originalImage ? (
                <div className="text-center">
                  <div className="border-2 border-dashed border-border rounded-lg p-12 transition-colors hover:border-primary">
                    <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mb-4">
                      <CloudUpload className="text-white w-8 h-8" />
                    </div>
                    
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Upload your image
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Choose an image to remove its background automatically
                    </p>
                    
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden" 
                      id="image-upload"
                    />
                    <label htmlFor="image-upload">
                      <Button asChild className="bg-gradient-primary hover:bg-gradient-primary-hover">
                        <span>
                          <Image className="w-4 h-4 mr-2" />
                          Choose Image File
                        </span>
                      </Button>
                    </label>
                    
                    <div className="mt-4 text-sm text-muted-foreground">
                      Supported formats: JPEG, PNG, GIF, BMP, WebP • Maximum size: 10MB
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Image Comparison */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-3">Original Image</h3>
                      <div className="relative border border-border rounded-lg overflow-hidden bg-muted">
                        <img 
                          src={originalImage} 
                          alt="Original" 
                          className="w-full h-64 object-contain"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-3">Background Removed</h3>
                      <div className="relative border border-border rounded-lg overflow-hidden" 
                           style={{background: 'repeating-conic-gradient(#f0f0f0 0% 25%, transparent 0% 50%) 50% / 20px 20px'}}>
                        {processingComplete && processedImage ? (
                          <img 
                            src={processedImage} 
                            alt="Processed" 
                            className="w-full h-64 object-contain"
                          />
                        ) : (
                          <div className="w-full h-64 flex items-center justify-center">
                            {isProcessing ? (
                              <div className="text-center">
                                <Wand2 className="w-8 h-8 animate-spin text-primary mx-auto mb-2" />
                                <div className="text-sm text-muted-foreground">Processing...</div>
                              </div>
                            ) : (
                              <div className="text-sm text-muted-foreground">Processing will appear here</div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Processing Progress */}
                  {isProcessing && (
                    <div>
                      <Progress value={processingProgress} className="mb-2" />
                      <div className="text-center text-sm text-muted-foreground">
                        Removing background... {processingProgress}%
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-wrap justify-center gap-4">
                    {processingComplete ? (
                      <>
                        <Button onClick={downloadImage} className="bg-green-600 hover:bg-green-700">
                          <Download className="w-4 h-4 mr-2" />
                          Download PNG
                        </Button>
                        <Button onClick={resetTool} variant="outline">
                          <Wand2 className="w-4 h-4 mr-2" />
                          Process Another Image
                        </Button>
                      </>
                    ) : !isProcessing && (
                      <Button onClick={resetTool} variant="outline">
                        Choose Different Image
                      </Button>
                    )}
                  </div>

                  {/* Success Message */}
                  {processingComplete && (
                    <div className="text-center">
                      <div className="inline-flex items-center px-4 py-2 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                        <CheckCircle className="text-green-500 w-5 h-5 mr-2" />
                        <span className="text-green-800 dark:text-green-300 text-sm font-medium">
                          Background removed successfully!
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Features */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/30 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Wand2 className="text-pink-600 dark:text-pink-400 w-6 h-6" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">AI-Powered</h4>
              <p className="text-sm text-muted-foreground">Advanced AI technology automatically detects and removes backgrounds with precision.</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Image className="text-blue-600 dark:text-blue-400 w-6 h-6" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">High Quality</h4>
              <p className="text-sm text-muted-foreground">Maintains original image quality while providing clean, transparent backgrounds.</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Download className="text-green-600 dark:text-green-400 w-6 h-6" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">Instant Download</h4>
              <p className="text-sm text-muted-foreground">Download your processed image immediately as a high-quality PNG with transparency.</p>
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
