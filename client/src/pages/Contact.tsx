import { useState } from 'react';
import { AdSlot } from '@/components/AdSlot';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Mail, MessageSquare, Clock, MapPin, Send, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: 'Required fields missing',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // In a real implementation, this would send to a contact form API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', subject: '', category: '', message: '' });
        toast({
          title: 'Message sent successfully!',
          description: 'We\'ll get back to you within 24 hours.',
        });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      toast({
        title: 'Failed to send message',
        description: 'Please try again or contact us directly via email.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setFormData({ name: '', email: '', subject: '', category: '', message: '' });
  };

  return (
    <div>
      <section className="py-16 transition-theme bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Contact Us
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have a question, suggestion, or need help? We'd love to hear from you. 
              Get in touch and we'll respond as soon as possible.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Information */}
            <div className="space-y-6">
              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Mail className="text-primary w-6 h-6 mr-3" />
                    <h3 className="text-lg font-semibold text-foreground">Email Us</h3>
                  </div>
                  <p className="text-muted-foreground mb-3">
                    Send us an email and we'll respond within 24 hours.
                  </p>
                  <a href="mailto:support@toolsuite.com" className="text-primary hover:underline font-medium">
                    support@toolsuite.com
                  </a>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Clock className="text-primary w-6 h-6 mr-3" />
                    <h3 className="text-lg font-semibold text-foreground">Response Time</h3>
                  </div>
                  <div className="space-y-2 text-muted-foreground">
                    <p><strong>General Inquiries:</strong> Within 24 hours</p>
                    <p><strong>Technical Issues:</strong> Within 12 hours</p>
                    <p><strong>Business Inquiries:</strong> Within 48 hours</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <MessageSquare className="text-primary w-6 h-6 mr-3" />
                    <h3 className="text-lg font-semibold text-foreground">What We Help With</h3>
                  </div>
                  <ul className="text-muted-foreground space-y-1 text-sm">
                    <li>• Technical support and bug reports</li>
                    <li>• Feature requests and suggestions</li>
                    <li>• Business partnerships and collaborations</li>
                    <li>• Media inquiries and press requests</li>
                    <li>• Privacy and security concerns</li>
                    <li>• General questions about our tools</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="shadow-lg">
                <CardContent className="p-6">
                  {isSubmitted ? (
                    <div className="text-center py-8">
                      <CheckCircle className="text-green-500 w-16 h-16 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        Message Sent Successfully!
                      </h3>
                      <p className="text-muted-foreground mb-6">
                        Thank you for contacting us. We've received your message and will get back to you within 24 hours.
                      </p>
                      <Button onClick={resetForm} variant="outline">
                        Send Another Message
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            Full Name *
                          </label>
                          <Input
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            placeholder="Your full name"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            Email Address *
                          </label>
                          <Input
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            placeholder="your.email@example.com"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            Category
                          </label>
                          <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="technical">Technical Support</SelectItem>
                              <SelectItem value="feature">Feature Request</SelectItem>
                              <SelectItem value="business">Business Inquiry</SelectItem>
                              <SelectItem value="media">Media/Press</SelectItem>
                              <SelectItem value="privacy">Privacy/Security</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            Subject
                          </label>
                          <Input
                            value={formData.subject}
                            onChange={(e) => handleInputChange('subject', e.target.value)}
                            placeholder="Brief subject line"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Message *
                        </label>
                        <Textarea
                          value={formData.message}
                          onChange={(e) => handleInputChange('message', e.target.value)}
                          rows={6}
                          placeholder="Please provide details about your inquiry, including any relevant information that might help us assist you better."
                          className="resize-none"
                          required
                        />
                        <div className="text-xs text-muted-foreground mt-1">
                          {formData.message.length}/1000 characters
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4">
                        <Button 
                          type="submit" 
                          disabled={isSubmitting}
                          className="bg-gradient-primary hover:bg-gradient-primary-hover"
                        >
                          {isSubmitting ? (
                            <>
                              <Send className="w-4 h-4 mr-2 animate-pulse" />
                              Sending...
                            </>
                          ) : (
                            <>
                              <Send className="w-4 h-4 mr-2" />
                              Send Message
                            </>
                          )}
                        </Button>
                        
                        <div className="text-xs text-muted-foreground flex items-center">
                          <p>
                            By submitting this form, you agree to our{' '}
                            <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>
                            {' '}and{' '}
                            <a href="/terms" className="text-primary hover:underline">Terms of Service</a>.
                          </p>
                        </div>
                      </div>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-center text-foreground mb-8">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-2">How quickly do you respond?</h3>
                  <p className="text-sm text-muted-foreground">
                    We typically respond to all inquiries within 24 hours. Technical issues are prioritized and usually addressed within 12 hours.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-2">Can I suggest new tools?</h3>
                  <p className="text-sm text-muted-foreground">
                    Absolutely! We love hearing ideas for new tools. Use the "Feature Request" category when contacting us with your suggestions.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-2">Do you offer API access?</h3>
                  <p className="text-sm text-muted-foreground">
                    We're exploring API options for developers. Contact us with "Business Inquiry" to discuss your specific needs.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-2">Is my data secure when contacting you?</h3>
                  <p className="text-sm text-muted-foreground">
                    Yes, all contact form submissions are encrypted and handled according to our Privacy Policy. We never share your information with third parties.
                  </p>
                </CardContent>
              </Card>
            </div>
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
