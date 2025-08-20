import { AdSlot } from '@/components/AdSlot';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, AlertTriangle, Shield, Scale } from 'lucide-react';

export default function Terms() {
  return (
    <div>
      <section className="py-16 transition-theme bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Terms of Service
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Please read these terms carefully before using our services. By using ToolSuite, you agree to these terms.
            </p>
            <div className="mt-4 text-sm text-muted-foreground">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
          </div>

          {/* Important Notice */}
          <Card className="shadow-lg mb-8 border-l-4 border-l-yellow-500">
            <CardContent className="p-6">
              <div className="flex items-start">
                <AlertTriangle className="text-yellow-600 dark:text-yellow-400 w-6 h-6 mr-3 mt-1" />
                <div>
                  <h2 className="text-lg font-bold text-foreground mb-2">Important Notice</h2>
                  <p className="text-muted-foreground">
                    By accessing and using ToolSuite, you acknowledge that you have read, understood, 
                    and agree to be bound by these Terms of Service. If you do not agree to these terms, 
                    please do not use our services.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Content Sections */}
          <div className="space-y-8">
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-foreground mb-4">1. Acceptance of Terms</h2>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <p className="text-muted-foreground mb-4">
                    These Terms of Service ("Terms") govern your use of ToolSuite and its services. 
                    By accessing or using our website and tools, you agree to be bound by these Terms.
                  </p>
                  <p className="text-muted-foreground">
                    We reserve the right to modify these Terms at any time. Changes will be effective 
                    immediately upon posting. Your continued use of our services after any changes 
                    constitutes acceptance of the new Terms.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-foreground mb-4">2. Description of Services</h2>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <p className="text-muted-foreground mb-4">
                    ToolSuite provides free online tools including but not limited to:
                  </p>
                  <ul className="text-muted-foreground space-y-2">
                    <li>• PDF conversion and manipulation tools</li>
                    <li>• Text analysis and counting tools</li>
                    <li>• Image processing and background removal</li>
                    <li>• QR code generation</li>
                    <li>• Currency conversion</li>
                    <li>• SEO and content optimization tools</li>
                    <li>• Social media thumbnail downloading</li>
                  </ul>
                  <p className="text-muted-foreground mt-4">
                    Our services are provided "as is" and we may modify, suspend, or discontinue 
                    any service at any time without notice.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-foreground mb-4">3. User Responsibilities</h2>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <p className="text-muted-foreground mb-4">
                    You agree to use our services responsibly and in compliance with all applicable laws. Specifically, you agree NOT to:
                  </p>
                  <ul className="text-muted-foreground space-y-2">
                    <li>• Upload or process illegal, harmful, or copyrighted content without permission</li>
                    <li>• Use our services to violate any laws or regulations</li>
                    <li>• Attempt to reverse engineer, hack, or compromise our systems</li>
                    <li>• Use automated scripts or bots to abuse our services</li>
                    <li>• Upload malicious files or content containing viruses</li>
                    <li>• Interfere with other users' access to our services</li>
                    <li>• Use our services for commercial purposes without permission</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-foreground mb-4">4. Content and Intellectual Property</h2>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <p className="text-muted-foreground mb-4">
                    <strong>Your Content:</strong> You retain ownership of all content you upload or process through our services. 
                    You grant us a temporary license to process your content for the sole purpose of providing our services.
                  </p>
                  <p className="text-muted-foreground mb-4">
                    <strong>Our Content:</strong> All website content, design, logos, and software are owned by ToolSuite 
                    or our licensors and are protected by intellectual property laws.
                  </p>
                  <p className="text-muted-foreground">
                    <strong>Copyright Compliance:</strong> You represent that you have the right to upload and process 
                    any content you submit to our services and that such use does not infringe third-party rights.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-foreground mb-4">5. Privacy and Data Protection</h2>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <p className="text-muted-foreground mb-4">
                    Your privacy is important to us. Our Privacy Policy explains how we collect, use, 
                    and protect your information. Key points include:
                  </p>
                  <ul className="text-muted-foreground space-y-2">
                    <li>• Files are processed temporarily and deleted immediately after processing</li>
                    <li>• We do not store your personal documents or files</li>
                    <li>• Anonymous usage analytics help us improve our services</li>
                    <li>• We use industry-standard security measures</li>
                  </ul>
                  <p className="text-muted-foreground mt-4">
                    By using our services, you also agree to our Privacy Policy, which is incorporated 
                    into these Terms by reference.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-foreground mb-4">6. Disclaimers and Limitations</h2>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <p className="text-muted-foreground mb-4">
                    <strong>Service Availability:</strong> We strive to maintain high uptime but do not guarantee 
                    uninterrupted service. We may experience downtime for maintenance or technical issues.
                  </p>
                  <p className="text-muted-foreground mb-4">
                    <strong>Accuracy:</strong> While we aim for accuracy in our tools (especially currency conversion 
                    and text analysis), we do not guarantee 100% accuracy and recommend verification for critical use cases.
                  </p>
                  <p className="text-muted-foreground mb-4">
                    <strong>Third-Party Services:</strong> Some tools integrate with third-party services. 
                    We are not responsible for the availability, accuracy, or policies of these external services.
                  </p>
                  <p className="text-muted-foreground">
                    <strong>Data Loss:</strong> While we take precautions to protect your data during processing, 
                    you should always maintain backups of important files.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-foreground mb-4">7. Limitation of Liability</h2>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <p className="text-muted-foreground mb-4">
                    TO THE MAXIMUM EXTENT PERMITTED BY LAW, TOOLSUITE SHALL NOT BE LIABLE FOR ANY:
                  </p>
                  <ul className="text-muted-foreground space-y-2">
                    <li>• Indirect, incidental, special, or consequential damages</li>
                    <li>• Loss of data, revenue, or business opportunities</li>
                    <li>• Damages arising from service interruptions or errors</li>
                    <li>• Issues caused by third-party services or integrations</li>
                    <li>• User error or misuse of our services</li>
                  </ul>
                  <p className="text-muted-foreground mt-4">
                    Our total liability for any claim shall not exceed the amount you paid us for the service 
                    (which is $0 for our free tools).
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-foreground mb-4">8. Indemnification</h2>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <p className="text-muted-foreground">
                    You agree to defend, indemnify, and hold harmless ToolSuite and its affiliates from any claims, 
                    damages, losses, or expenses (including legal fees) arising from your use of our services, 
                    violation of these Terms, or infringement of third-party rights.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-foreground mb-4">9. Termination</h2>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <p className="text-muted-foreground mb-4">
                    We reserve the right to terminate or restrict your access to our services at any time 
                    for any reason, including violation of these Terms.
                  </p>
                  <p className="text-muted-foreground">
                    You may stop using our services at any time. Upon termination, your right to use 
                    our services will cease immediately.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-foreground mb-4">10. Governing Law</h2>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <p className="text-muted-foreground">
                    These Terms shall be governed by and construed in accordance with the laws of the jurisdiction 
                    where ToolSuite operates, without regard to conflict of law principles. Any disputes shall be 
                    resolved through binding arbitration or in the courts of competent jurisdiction.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-foreground mb-4">11. Severability and Entire Agreement</h2>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <p className="text-muted-foreground mb-4">
                    If any provision of these Terms is found to be unenforceable, the remaining provisions 
                    will remain in full force and effect.
                  </p>
                  <p className="text-muted-foreground">
                    These Terms, together with our Privacy Policy, constitute the entire agreement between 
                    you and ToolSuite regarding your use of our services.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-foreground mb-4">12. Contact Information</h2>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <p className="text-muted-foreground mb-4">
                    If you have any questions about these Terms of Service, please contact us:
                  </p>
                  <ul className="text-muted-foreground space-y-2">
                    <li><strong>Email:</strong> legal@toolsuite.com</li>
                    <li><strong>Contact Form:</strong> Available on our Contact page</li>
                    <li><strong>Website:</strong> https://toolsuite.com</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
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
