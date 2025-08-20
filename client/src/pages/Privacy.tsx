import { AdSlot } from '@/components/AdSlot';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Eye, Database, Lock, Mail, Calendar } from 'lucide-react';

export default function Privacy() {
  return (
    <div>
      <section className="py-16 transition-theme bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Privacy Policy
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Your privacy is important to us. This policy explains how we collect, use, and protect your information.
            </p>
            <div className="mt-4 text-sm text-muted-foreground">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
          </div>

          {/* Quick Overview */}
          <Card className="shadow-lg mb-8">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Shield className="text-green-600 dark:text-green-400 w-6 h-6 mr-3" />
                <h2 className="text-xl font-bold text-foreground">Privacy at a Glance</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center">
                  <Eye className="w-4 h-4 text-blue-500 mr-2" />
                  <span className="text-muted-foreground">No tracking cookies</span>
                </div>
                <div className="flex items-center">
                  <Database className="w-4 h-4 text-green-500 mr-2" />
                  <span className="text-muted-foreground">No personal data storage</span>
                </div>
                <div className="flex items-center">
                  <Lock className="w-4 h-4 text-purple-500 mr-2" />
                  <span className="text-muted-foreground">SSL encrypted connections</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 text-orange-500 mr-2" />
                  <span className="text-muted-foreground">No email collection</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Content Sections */}
          <div className="space-y-8">
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-foreground mb-4">Information We Collect</h2>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <p className="text-muted-foreground mb-4">
                    ToolSuite is designed with privacy in mind. We collect minimal information to provide our services:
                  </p>
                  <ul className="text-muted-foreground space-y-2">
                    <li><strong>Usage Analytics:</strong> Anonymous usage statistics through Google Analytics to understand how our tools are used and improve user experience.</li>
                    <li><strong>Technical Data:</strong> Basic technical information like IP address, browser type, and device information for security and optimization purposes.</li>
                    <li><strong>Temporary Files:</strong> Files you upload for processing are temporarily stored during conversion and immediately deleted afterward.</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-foreground mb-4">How We Use Your Information</h2>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <p className="text-muted-foreground mb-4">
                    We use the limited information we collect for the following purposes:
                  </p>
                  <ul className="text-muted-foreground space-y-2">
                    <li><strong>Service Provision:</strong> To provide and operate our online tools effectively.</li>
                    <li><strong>Improvement:</strong> To analyze usage patterns and improve our services and user experience.</li>
                    <li><strong>Security:</strong> To detect and prevent abuse, fraud, and security threats.</li>
                    <li><strong>Legal Compliance:</strong> To comply with applicable laws and regulations.</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-foreground mb-4">Data Storage and Security</h2>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <p className="text-muted-foreground mb-4">
                    We implement industry-standard security measures to protect your data:
                  </p>
                  <ul className="text-muted-foreground space-y-2">
                    <li><strong>Encryption:</strong> All data transmission is encrypted using SSL/TLS protocols.</li>
                    <li><strong>Temporary Storage:</strong> Uploaded files are processed in memory or temporary storage and deleted immediately after processing.</li>
                    <li><strong>No Long-term Storage:</strong> We do not store your personal files or documents on our servers.</li>
                    <li><strong>Secure Infrastructure:</strong> Our servers are hosted in secure, monitored environments with restricted access.</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-foreground mb-4">Third-Party Services</h2>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <p className="text-muted-foreground mb-4">
                    We use select third-party services to enhance our functionality:
                  </p>
                  <ul className="text-muted-foreground space-y-2">
                    <li><strong>Google Analytics:</strong> For anonymous usage analytics and website optimization.</li>
                    <li><strong>Remove.bg API:</strong> For background removal functionality (images are processed by their servers).</li>
                    <li><strong>Currency Exchange APIs:</strong> For real-time currency conversion data.</li>
                    <li><strong>Google AdSense:</strong> For displaying relevant advertisements to support our free services.</li>
                  </ul>
                  <p className="text-muted-foreground mt-4">
                    These services have their own privacy policies, and we encourage you to review them.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-foreground mb-4">Cookies and Tracking</h2>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <p className="text-muted-foreground mb-4">
                    We use minimal cookies and tracking technologies:
                  </p>
                  <ul className="text-muted-foreground space-y-2">
                    <li><strong>Essential Cookies:</strong> Required for basic website functionality and user preferences (like dark mode).</li>
                    <li><strong>Analytics Cookies:</strong> Google Analytics cookies to understand usage patterns (anonymous).</li>
                    <li><strong>Advertising Cookies:</strong> Used by Google AdSense to display relevant advertisements.</li>
                  </ul>
                  <p className="text-muted-foreground mt-4">
                    You can control cookies through your browser settings, though disabling them may affect some functionality.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-foreground mb-4">Your Rights and Choices</h2>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <p className="text-muted-foreground mb-4">
                    You have the following rights regarding your privacy:
                  </p>
                  <ul className="text-muted-foreground space-y-2">
                    <li><strong>Access:</strong> Since we don't store personal data, there's no personal information to access.</li>
                    <li><strong>Opt-out:</strong> You can opt out of analytics tracking by using browser privacy settings or ad blockers.</li>
                    <li><strong>Cookie Control:</strong> Manage cookies through your browser settings.</li>
                    <li><strong>Data Deletion:</strong> Files are automatically deleted after processing; no manual deletion required.</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-foreground mb-4">Children's Privacy</h2>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <p className="text-muted-foreground">
                    Our services are not directed to children under 13 years of age. We do not knowingly collect 
                    personal information from children under 13. If you are a parent or guardian and believe 
                    your child has provided us with personal information, please contact us immediately.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-foreground mb-4">Changes to This Policy</h2>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <p className="text-muted-foreground">
                    We may update this Privacy Policy from time to time. We will notify you of any changes 
                    by posting the new Privacy Policy on this page and updating the "Last updated" date. 
                    You are advised to review this Privacy Policy periodically for any changes.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-foreground mb-4">Contact Us</h2>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <p className="text-muted-foreground mb-4">
                    If you have any questions about this Privacy Policy or our privacy practices, please contact us:
                  </p>
                  <ul className="text-muted-foreground space-y-2">
                    <li><strong>Email:</strong> privacy@toolsuite.com</li>
                    <li><strong>Contact Form:</strong> Available on our Contact page</li>
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
