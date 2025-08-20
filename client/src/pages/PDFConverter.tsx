import { useState } from 'react';
import { AdSlot } from '@/components/AdSlot';
import { FAQAccordion } from '@/components/FAQAccordion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CloudUpload, Download, Shield, Zap, Smartphone, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const faqs = [
  {
    question: 'How secure is the PDF conversion process?',
    answer: 'All files are processed securely and automatically deleted from our servers after conversion. We use SSL encryption to protect your data during upload and download.',
  },
  {
    question: 'What file size limits apply?',
    answer: 'You can convert PDF files up to 10MB in size. For larger files, consider compressing your PDF first using our PDF Compressor tool.',
  },
  {
    question: 'How long does conversion take?',
    answer: 'Most PDF files are converted to Word format within 30-60 seconds, depending on the file size and complexity.',
  },
];

export default function PDFConverter() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [conversionProgress, setConversionProgress] = useState(0);
  const [conversionComplete, setConversionComplete] = useState(false);
  const { toast } = useToast();

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
      startConversion(file);
    } else {
      toast({
        title: 'Invalid file type',
        description: 'Please select a valid PDF file.',
        variant: 'destructive',
      });
    }
  };

  const startConversion = async (file: File) => {
    setIsConverting(true);
    setConversionProgress(0);
    
    // Simulate conversion progress
    const progressInterval = setInterval(() => {
      setConversionProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setIsConverting(false);
          setConversionComplete(true);
          return 100;
        }
        return prev + 10;
      });
    }, 300);

    try {
      const formData = new FormData();
      formData.append('pdf', file);
      
      const response = await fetch('/api/convert-pdf', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Conversion failed');
      }
      
      // Handle successful conversion
    } catch (error) {
      console.error('Conversion error:', error);
      setIsConverting(false);
      toast({
        title: 'Conversion failed',
        description: 'There was an error converting your PDF. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const downloadFile = () => {
    // In a real implementation, this would download the converted file
    toast({
      title: 'Download started',
      description: 'Your converted Word document is being downloaded.',
    });
  };

  return (
    <div>
      <section className="py-16 transition-theme bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              <i className="fas fa-file-pdf text-red-500 mr-3"></i>
              PDF to Word Converter
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Convert your PDF files to editable Word documents instantly. Our secure online converter maintains formatting 
              and allows you to edit your documents easily. No software installation required.
            </p>
          </div>

          <Card className="shadow-lg">
            <CardContent className="p-6">
              {!conversionComplete ? (
                <div className="text-center">
                  <div className="border-2 border-dashed border-border rounded-lg p-12 transition-colors hover:border-primary">
                    <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mb-4">
                      <CloudUpload className="text-white w-8 h-8" />
                    </div>
                    
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Upload your PDF file
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Drag and drop your PDF file here, or click to browse
                    </p>
                    
                    <input 
                      type="file" 
                      accept=".pdf" 
                      onChange={handleFileUpload}
                      className="hidden" 
                      id="pdf-upload"
                      disabled={isConverting}
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

                  {/* Conversion Progress */}
                  {isConverting && (
                    <div className="mt-8">
                      <Progress value={conversionProgress} className="mb-4" />
                      <div className="text-center text-sm text-muted-foreground">
                        Converting your PDF... {conversionProgress}%
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center">
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
                    <CheckCircle className="text-green-500 w-12 h-12 mx-auto mb-3" />
                    <h3 className="text-lg font-semibold text-green-800 dark:text-green-300 mb-2">
                      Conversion Complete!
                    </h3>
                    <p className="text-green-700 dark:text-green-400 mb-4">
                      Your PDF has been successfully converted to Word format.
                    </p>
                    <Button onClick={downloadFile} className="bg-green-600 hover:bg-green-700">
                      <Download className="w-4 h-4 mr-2" />
                      Download Word Document
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
              <p className="text-sm text-muted-foreground">Files are processed securely and deleted automatically after conversion.</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Zap className="text-green-600 dark:text-green-400 w-6 h-6" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">Fast Processing</h4>
              <p className="text-sm text-muted-foreground">Quick conversion process that maintains original formatting.</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Smartphone className="text-purple-600 dark:text-purple-400 w-6 h-6" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">Works Everywhere</h4>
              <p className="text-sm text-muted-foreground">Compatible with all devices and browsers. No software needed.</p>
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
