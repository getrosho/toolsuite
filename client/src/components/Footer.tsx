import { Link } from 'wouter';
import { Wrench } from 'lucide-react';

export function Footer() {
  return (
    <footer className="transition-theme bg-gray-900 dark:bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Wrench className="text-white w-4 h-4" />
              </div>
              <span className="text-xl font-bold">ToolSuite</span>
            </div>
            <p className="text-gray-300 text-sm mb-4">
              Free online tools to boost your productivity. Convert files, generate codes, and optimize your content.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </div>

          {/* Text & File Tools */}
          <div>
            <h4 className="font-semibold mb-4">Text & File Tools</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/word-counter"><a className="text-gray-300 hover:text-white transition-colors">Word Counter</a></Link></li>
              <li><Link href="/pdf-to-word"><a className="text-gray-300 hover:text-white transition-colors">PDF to Word</a></Link></li>
              <li><Link href="/pdf-compressor"><a className="text-gray-300 hover:text-white transition-colors">PDF Compressor</a></Link></li>
              <li><Link href="/merge-pdfs"><a className="text-gray-300 hover:text-white transition-colors">Merge PDFs</a></Link></li>
              <li><Link href="/remove-background"><a className="text-gray-300 hover:text-white transition-colors">Remove Background</a></Link></li>
            </ul>
          </div>

          {/* Generators */}
          <div>
            <h4 className="font-semibold mb-4">Generators</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/qr-generator"><a className="text-gray-300 hover:text-white transition-colors">QR Code Generator</a></Link></li>
              <li><Link href="/thumbnail-downloader"><a className="text-gray-300 hover:text-white transition-colors">Thumbnail Downloader</a></Link></li>
              <li><Link href="/currency-converter"><a className="text-gray-300 hover:text-white transition-colors">Currency Converter</a></Link></li>
            </ul>
            
            <h4 className="font-semibold mb-4 mt-6">SEO Tools</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/meta-generator"><a className="text-gray-300 hover:text-white transition-colors">Meta Tag Generator</a></Link></li>
              <li><Link href="/plagiarism-checker"><a className="text-gray-300 hover:text-white transition-colors">Plagiarism Checker</a></Link></li>
              <li><Link href="/title-counter"><a className="text-gray-300 hover:text-white transition-colors">Title Counter</a></Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about"><a className="text-gray-300 hover:text-white transition-colors">About Us</a></Link></li>
              <li><Link href="/contact"><a className="text-gray-300 hover:text-white transition-colors">Contact</a></Link></li>
              <li><Link href="/privacy"><a className="text-gray-300 hover:text-white transition-colors">Privacy Policy</a></Link></li>
              <li><Link href="/terms"><a className="text-gray-300 hover:text-white transition-colors">Terms of Service</a></Link></li>
              <li><a href="/api/sitemap" className="text-gray-300 hover:text-white transition-colors">Sitemap</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2024 ToolSuite. All rights reserved. | Made with ❤️ for productivity enthusiasts</p>
        </div>
      </div>
    </footer>
  );
}
