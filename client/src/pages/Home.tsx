import { Link } from 'wouter';
import { AdSlot } from '@/components/AdSlot';
import { FileText, Wand2, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="py-16 lg:py-24 transition-theme bg-gradient-to-br from-gray-50 to-white dark:from-slate-900 dark:to-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="gradient-text">Free Online Tools</span>
              <br />
              <span className="text-foreground">for Productivity</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Convert PDFs, count words, generate QR codes, remove image backgrounds, and more. 
              Fast, secure, and completely free to use. No registration required.
            </p>
            
            {/* Popular Tools CTA */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Link href="/word-counter">
                <Button className="bg-gradient-primary hover:bg-gradient-primary-hover text-white">
                  <i className="fas fa-spell-check mr-2"></i>
                  Word Counter
                </Button>
              </Link>
              <Link href="/pdf-to-word">
                <Button variant="outline">
                  <i className="fas fa-file-pdf mr-2 text-red-500"></i>
                  PDF Converter
                </Button>
              </Link>
              <Link href="/qr-generator">
                <Button variant="outline">
                  <i className="fas fa-qrcode mr-2 text-indigo-500"></i>
                  QR Generator
                </Button>
              </Link>
            </div>

            {/* Hero Image */}
            <div className="relative max-w-4xl mx-auto">
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=600" 
                alt="Modern productivity tools interface" 
                className="rounded-2xl shadow-2xl w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-primary opacity-10 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Tools */}
      <section className="py-16 transition-theme bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Popular Tools
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose from our collection of powerful online tools designed to boost your productivity.
            </p>
          </div>

          {/* Tool Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Text & File Tools */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-foreground flex items-center">
                <FileText className="text-purple-500 mr-2" />
                Text & File Tools
              </h3>
              
              <div className="tool-card bg-card p-6 rounded-xl border border-border shadow-sm hover:shadow-lg">
                <div className="flex items-center mb-3">
                  <i className="fas fa-spell-check text-purple-500 text-xl mr-3"></i>
                  <h4 className="font-semibold text-card-foreground">Word Counter</h4>
                </div>
                <p className="text-muted-foreground text-sm mb-4">
                  Count words, characters, and sentences instantly. Perfect for content creators and writers.
                </p>
                <Link href="/word-counter">
                  <a className="inline-flex items-center text-primary font-medium text-sm hover:opacity-80">
                    Try now <i className="fas fa-arrow-right ml-1 text-xs"></i>
                  </a>
                </Link>
              </div>

              <div className="tool-card bg-card p-6 rounded-xl border border-border shadow-sm hover:shadow-lg">
                <div className="flex items-center mb-3">
                  <i className="fas fa-file-pdf text-red-500 text-xl mr-3"></i>
                  <h4 className="font-semibold text-card-foreground">PDF Converter</h4>
                </div>
                <p className="text-muted-foreground text-sm mb-4">
                  Convert PDF files to Word documents quickly and securely online.
                </p>
                <Link href="/pdf-to-word">
                  <a className="inline-flex items-center text-primary font-medium text-sm hover:opacity-80">
                    Try now <i className="fas fa-arrow-right ml-1 text-xs"></i>
                  </a>
                </Link>
              </div>
            </div>

            {/* Generator Tools */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-foreground flex items-center">
                <Wand2 className="text-indigo-500 mr-2" />
                Generators
              </h3>
              
              <div className="tool-card bg-card p-6 rounded-xl border border-border shadow-sm hover:shadow-lg">
                <div className="flex items-center mb-3">
                  <i className="fas fa-qrcode text-indigo-500 text-xl mr-3"></i>
                  <h4 className="font-semibold text-card-foreground">QR Code Generator</h4>
                </div>
                <p className="text-muted-foreground text-sm mb-4">
                  Generate custom QR codes for URLs, text, or contact information.
                </p>
                <Link href="/qr-generator">
                  <a className="inline-flex items-center text-primary font-medium text-sm hover:opacity-80">
                    Try now <i className="fas fa-arrow-right ml-1 text-xs"></i>
                  </a>
                </Link>
              </div>

              <div className="tool-card bg-card p-6 rounded-xl border border-border shadow-sm hover:shadow-lg">
                <div className="flex items-center mb-3">
                  <i className="fas fa-exchange-alt text-yellow-500 text-xl mr-3"></i>
                  <h4 className="font-semibold text-card-foreground">Currency Converter</h4>
                </div>
                <p className="text-muted-foreground text-sm mb-4">
                  Get real-time exchange rates and convert currencies instantly.
                </p>
                <Link href="/currency-converter">
                  <a className="inline-flex items-center text-primary font-medium text-sm hover:opacity-80">
                    Try now <i className="fas fa-arrow-right ml-1 text-xs"></i>
                  </a>
                </Link>
              </div>
            </div>

            {/* SEO Tools */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-foreground flex items-center">
                <Search className="text-orange-500 mr-2" />
                SEO Tools
              </h3>
              
              <div className="tool-card bg-card p-6 rounded-xl border border-border shadow-sm hover:shadow-lg">
                <div className="flex items-center mb-3">
                  <i className="fas fa-tags text-teal-500 text-xl mr-3"></i>
                  <h4 className="font-semibold text-card-foreground">Meta Tag Generator</h4>
                </div>
                <p className="text-muted-foreground text-sm mb-4">
                  Generate SEO-optimized meta tags for better search engine visibility.
                </p>
                <Link href="/meta-generator">
                  <a className="inline-flex items-center text-primary font-medium text-sm hover:opacity-80">
                    Try now <i className="fas fa-arrow-right ml-1 text-xs"></i>
                  </a>
                </Link>
              </div>

              <div className="tool-card bg-card p-6 rounded-xl border border-border shadow-sm hover:shadow-lg">
                <div className="flex items-center mb-3">
                  <i className="fas fa-search text-orange-500 text-xl mr-3"></i>
                  <h4 className="font-semibold text-card-foreground">Plagiarism Checker</h4>
                </div>
                <p className="text-muted-foreground text-sm mb-4">
                  Check your content for plagiarism and ensure originality.
                </p>
                <Link href="/plagiarism-checker">
                  <a className="inline-flex items-center text-primary font-medium text-sm hover:opacity-80">
                    Try now <i className="fas fa-arrow-right ml-1 text-xs"></i>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ad Slot */}
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AdSlot />
        </div>
      </div>
    </div>
  );
}
