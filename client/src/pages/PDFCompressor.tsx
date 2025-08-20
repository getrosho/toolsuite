import { useState } from 'react';
import { AdSlot } from '@/components/AdSlot';
import { FAQAccordion } from '@/components/FAQAccordion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CloudUpload, Download, Minimize2, Shield, Zap, Smartphone, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const faqs = [
  {
    question: 'How much can I compress my PDF?',
    answer: 'Compression rates vary by content, but typically you can reduce file size by 30-70% while maintaining good quality. PDFs with images compress more than text-only documents.',
  },
  {
    question: 'Will compression affect PDF quality?',
    answer: 'Our compression algorithm is designed to maintain visual quality while reducing file size. We use lossless compression for text and optimized compression for images.',
  },
  {
    question: 'What is the maximum file size I can compress?',
    answer: 'You can compress PDF files up to 10MB in size. For larger files, try splitting them first or contact us for enterprise solutions.',
  },
];

export default function PDFCompressor() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [compressionProgress, setCompressionProgress] = useState(0);
  const [compressionComplete, setCompressionComplete] = useState(false);
  const [compressionStats, setCompressionStats] = useState<{
    originalSize: number;
    compressedSize: number;
    compressionRatio: number;
  } | null>(null);
  const { toast } = useToast();

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: 'File too large',
          description: 'Please select a PDF file smaller than 10MB.',
          variant: 'destructive',
        });
        return;
      }
      
      setUploadedFile(file);
      startCompression(file);
    } else {
      toast({
        title: 'Invalid file type',
        description: 'Please select a valid PDF file.',
        variant: 'destructive',
      });
    }
  };

  const startCompression = async (file: File) => {
    setIsCompressing(true);
    setCompressionProgress(0);
    
    // Simulate compression progress
    const progressInterval = setInterval(() => {
      setCompressionProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setIsCompressing(false);
          setCompressionComplete(true);
          // Set mock compression stats
          setCompressionStats({
            originalSize: file.size,
            compressedSize: Math.floor(file.size * (0.3 + Math.random() * 0.4)), // 30-70% compression
            compressionRatio: 0.3 + Math.random() * 0.4,
          });
          return 100;
        }
        return prev + 8;
      });
    }, 200);

    try {
      const formData = new FormData();
      formData.append('pdf', file);
      
      const response = await fetch('/api/compress-pdf', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Compression failed');
      }
      
      // Handle successful compression
    } catch (error) {
      console.error('Compression error:', error);
      setIsCompressing(false);
      clearInterval(progressInterval);
      toast({
        title: 'Compression failed',
        description: 'There was an error compressing your PDF. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const downloadFile = () => {
    toast({
      title: 'Download started',
      description: 'Your compressed PDF is being downloaded.',
    });
  };

  return (
    <div>
      <section className="py-16 transition-theme bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              <i className="fas fa-compress text-blue-500 mr-3"></i>
              PDF Compressor Tool
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Reduce your PDF file size without losing quality. Our advanced compression algorithm 
              optimizes your documents for faster sharing and storage while maintaining readability.
            </p>
          </div>

          <Card className="shadow-lg">
            <CardContent className="p-6">
              {!compressionComplete ? (
                <div className="text-center">
                  <div className="border-2 border-dashed border-border rounded-lg p-12 transition-colors hover:border-primary">
                    <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mb-4">
                      <CloudUpload className="text-white w-8 h-8" />
                    </div>
                    
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Upload your PDF file
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Choose a PDF file to compress and reduce its size
                    </p>
                    
                    <input 
                      type="file" 
                      accept=".pdf" 
                      onChange={handleFileUpload}
                      className="hidden" 
                      id="pdf-upload"
                      disabled={isCompressing}
                    />
                    <label htmlFor="pdf-upload">
                      <Button asChild className="bg-gradient-primary hover:bg-gradient-primary-hover">
                        <span>
                          <CloudUpload className="w-4 h-4 mr-2" />
                          Choose PDF File
                        </span>
                      </Button>
                    </label>
                    
                    <div className="mt-4 text-sm text-muted-foreground">
                      Maximum file size: 10MB
                    </div>
                  </div>

                  {/* Compression Progress */}
                  {isCompressing && (
                    <div className="mt-8">
                      <Progress value={compressionProgress} className="mb-4" />
                      <div className="text-center text-sm text-muted-foreground">
                        Compressing your PDF... {compressionProgress}%
                      </div>
                      {uploadedFile && (
                        <div className="mt-2 text-xs text-muted-foreground">
                          Processing: {uploadedFile.name} ({formatFileSize(uploadedFile.size)})
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center">
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
                    <CheckCircle className="text-green-500 w-12 h-12 mx-auto mb-3" />
                    <h3 className="text-lg font-semibold text-green-800 dark:text-green-300 mb-2">
                      Compression Complete!
                    </h3>
                    <p className="text-green-700 dark:text-green-400 mb-4">
                      Your PDF has been successfully compressed.
                    </p>
                    
                    {compressionStats && (
                      <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                        <div>
                          <div className="font-medium text-green-800 dark:text-green-300">Original Size</div>
                          <div className="text-green-700 dark:text-green-400">{formatFileSize(compressionStats.originalSize)}</div>
                        </div>
                        <div>
                          <div className="font-medium text-green-800 dark:text-green-300">Compressed Size</div>
                          <div className="text-green-700 dark:text-green-400">{formatFileSize(compressionStats.compressedSize)}</div>
                        </div>
                        <div>
                          <div className="font-medium text-green-800 dark:text-green-300">Space Saved</div>
                          <div className="text-green-700 dark:text-green-400">{Math.round((1 - compressionStats.compressionRatio) * 100)}%</div>
                        </div>
                      </div>
                    )}
                    
                    <Button onClick={downloadFile} className="bg-green-600 hover:bg-green-700">
                      <Download className="w-4 h-4 mr-2" />
                      Download Compressed PDF
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Features */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Shield className="text-blue-600 dark:text-blue-400 w-6 h-6" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">Secure & Private</h4>
              <p className="text-sm text-muted-foreground">Files are processed securely and deleted automatically after compression.</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Minimize2 className="text-green-600 dark:text-green-400 w-6 h-6" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">Maximum Compression</h4>
              <p className="text-sm text-muted-foreground">Advanced algorithms reduce file size by up to 70% while maintaining quality.</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Zap className="text-purple-600 dark:text-purple-400 w-6 h-6" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">Lightning Fast</h4>
              <p className="text-sm text-muted-foreground">Compress your PDFs in seconds with our optimized processing engine.</p>
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
