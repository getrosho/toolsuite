import { useState } from 'react';
import { AdSlot } from '@/components/AdSlot';
import { FAQAccordion } from '@/components/FAQAccordion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { QrCode, Download, Share2, Link, Wifi, Contact, Instagram } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const faqs = [
  {
    question: 'What types of QR codes can I generate?',
    answer: 'You can generate QR codes for URLs, plain text, email addresses, phone numbers, WiFi credentials, and contact information.',
  },
  {
    question: 'Are the QR codes free to use?',
    answer: 'Yes, all QR codes generated are completely free to use for personal and commercial purposes without any restrictions.',
  },
  {
    question: 'What format should I choose for my QR code?',
    answer: 'PNG is best for web use and printing, JPG for smaller file sizes, and SVG for scalable vector graphics that can be resized without quality loss.',
  },
];

export default function QRGenerator() {
  const [qrType, setQrType] = useState('url');
  const [content, setContent] = useState('');
  const [size, setSize] = useState('300x300');
  const [format, setFormat] = useState('PNG');
  const [generatedQR, setGeneratedQR] = useState<string | null>(null);
  const { toast } = useToast();

  const generateQR = async () => {
    if (!content.trim()) {
      toast({
        title: 'Content required',
        description: 'Please enter content for your QR code.',
        variant: 'destructive',
      });
      return;
    }

    try {
      const response = await fetch('/api/generate-qr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: qrType,
          content: content.trim(),
          size,
          format,
        }),
      });

      if (!response.ok) {
        throw new Error('QR code generation failed');
      }

      const data = await response.json();
      setGeneratedQR(data.qrCode);
      
      toast({
        title: 'QR code generated!',
        description: 'Your QR code has been created successfully.',
      });
    } catch (error) {
      console.error('QR generation error:', error);
      toast({
        title: 'Generation failed',
        description: 'There was an error generating your QR code. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const downloadQR = () => {
    if (generatedQR) {
      const link = document.createElement('a');
      link.href = generatedQR;
      link.download = `qr-code.${format.toLowerCase()}`;
      link.click();
    }
  };

  const shareQR = () => {
    if (navigator.share && generatedQR) {
      navigator.share({
        title: 'QR Code',
        text: 'Check out this QR code I generated!',
        url: generatedQR,
      });
    } else {
      // Fallback to copying to clipboard
      navigator.clipboard.writeText(generatedQR || '');
      toast({
        title: 'Copied to clipboard',
        description: 'QR code URL copied to clipboard.',
      });
    }
  };

  return (
    <div>
      <section className="py-16 transition-theme bg-gray-50 dark:bg-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              <i className="fas fa-qrcode text-indigo-500 mr-3"></i>
              QR Code Generator
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Generate custom QR codes for URLs, text, contact information, or any data you need. 
              High-quality QR codes that work with all standard QR code readers.
            </p>
          </div>

          <Card className="shadow-lg">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Input Section */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      QR Code Type
                    </label>
                    <Select value={qrType} onValueChange={setQrType}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="url">Website URL</SelectItem>
                        <SelectItem value="text">Plain Text</SelectItem>
                        <SelectItem value="email">Email Address</SelectItem>
                        <SelectItem value="phone">Phone Number</SelectItem>
                        <SelectItem value="wifi">WiFi Network</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Content
                    </label>
                    <Textarea
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      rows={4}
                      className="resize-none"
                      placeholder="Enter URL, text, or other data for your QR code..."
                    />
                  </div>

                  {/* Customization Options */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Size
                      </label>
                      <Select value={size} onValueChange={setSize}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="200x200">200x200</SelectItem>
                          <SelectItem value="300x300">300x300</SelectItem>
                          <SelectItem value="500x500">500x500</SelectItem>
                          <SelectItem value="1000x1000">1000x1000</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Format
                      </label>
                      <Select value={format} onValueChange={setFormat}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="PNG">PNG</SelectItem>
                          <SelectItem value="JPG">JPG</SelectItem>
                          <SelectItem value="SVG">SVG</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button 
                    onClick={generateQR}
                    className="w-full bg-gradient-primary hover:bg-gradient-primary-hover"
                  >
                    <QrCode className="w-4 h-4 mr-2" />
                    Generate QR Code
                  </Button>
                </div>

                {/* QR Code Preview */}
                <div className="flex flex-col items-center justify-center">
                  <div className="w-64 h-64 bg-muted border-2 border-dashed border-border rounded-lg flex items-center justify-center mb-4">
                    {generatedQR ? (
                      <img src={generatedQR} alt="Generated QR Code" className="max-w-full max-h-full" />
                    ) : (
                      <div className="text-muted-foreground text-center">
                        <QrCode className="w-16 h-16 mx-auto mb-2" />
                        <p className="text-sm">QR code will appear here</p>
                      </div>
                    )}
                  </div>

                  {/* Download Options */}
                  {generatedQR && (
                    <div className="space-y-2 w-full">
                      <Button onClick={downloadQR} className="w-full bg-indigo-600 hover:bg-indigo-700">
                        <Download className="w-4 h-4 mr-2" />
                        Download QR Code
                      </Button>
                      <Button onClick={shareQR} variant="outline" className="w-full">
                        <Share2 className="w-4 h-4 mr-2" />
                        Share QR Code
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Use Cases */}
          <div className="mt-12">
            <h3 className="text-xl font-semibold text-foreground mb-6 text-center">Popular Use Cases</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-card p-4 rounded-lg border border-border text-center">
                <Link className="text-blue-500 w-8 h-8 mx-auto mb-2" />
                <h4 className="font-medium text-card-foreground">Website Links</h4>
              </div>
              <div className="bg-card p-4 rounded-lg border border-border text-center">
                <Wifi className="text-green-500 w-8 h-8 mx-auto mb-2" />
                <h4 className="font-medium text-card-foreground">WiFi Access</h4>
              </div>
              <div className="bg-card p-4 rounded-lg border border-border text-center">
                <Contact className="text-purple-500 w-8 h-8 mx-auto mb-2" />
                <h4 className="font-medium text-card-foreground">Contact Info</h4>
              </div>
              <div className="bg-card p-4 rounded-lg border border-border text-center">
                <Instagram className="text-pink-500 w-8 h-8 mx-auto mb-2" />
                <h4 className="font-medium text-card-foreground">Social Media</h4>
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
