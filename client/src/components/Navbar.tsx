import { Link } from 'wouter';
import { useState } from 'react';
import { useTheme } from './ThemeProvider';
import { Button } from '@/components/ui/button';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Sun, Moon, Menu, Wrench } from 'lucide-react';

const textFileTools = [
  { title: 'PDF to Word Converter', href: '/pdf-to-word', icon: 'fas fa-file-pdf', color: 'text-red-500' },
  { title: 'PDF Compressor', href: '/pdf-compressor', icon: 'fas fa-compress', color: 'text-blue-500' },
  { title: 'Merge PDFs', href: '/merge-pdfs', icon: 'fas fa-layer-group', color: 'text-green-500' },
  { title: 'Word Counter', href: '/word-counter', icon: 'fas fa-spell-check', color: 'text-purple-500' },
  { title: 'Remove Background', href: '/remove-background', icon: 'fas fa-magic', color: 'text-pink-500' },
];

const generators = [
  { title: 'QR Code Generator', href: '/qr-generator', icon: 'fas fa-qrcode', color: 'text-indigo-500' },
  { title: 'Thumbnail Downloader', href: '/thumbnail-downloader', icon: 'fab fa-youtube', color: 'text-red-500' },
  { title: 'Currency Converter', href: '/currency-converter', icon: 'fas fa-exchange-alt', color: 'text-yellow-500' },
];

const seoTools = [
  { title: 'Plagiarism Checker', href: '/plagiarism-checker', icon: 'fas fa-search', color: 'text-orange-500' },
  { title: 'Meta Tag Generator', href: '/meta-generator', icon: 'fas fa-tags', color: 'text-teal-500' },
  { title: 'Title Counter', href: '/title-counter', icon: 'fas fa-ruler', color: 'text-cyan-500' },
];

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 transition-theme bg-background/95 backdrop-blur-sm border-b border-border">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center space-x-2 cursor-pointer">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Wrench className="text-white w-4 h-4" />
              </div>
              <span className="text-xl font-bold gradient-text">ToolSuite</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link href="/">
              <a className="text-foreground hover:text-primary transition-colors">Home</a>
            </Link>
            
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-foreground hover:text-primary">
                    Text & Files
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-64 p-2">
                      {textFileTools.map((tool) => (
                        <Link key={tool.href} href={tool.href}>
                          <NavigationMenuLink className="block px-4 py-2 text-sm hover:bg-accent rounded-md transition-colors">
                            <div className="flex items-center space-x-3">
                              <i className={`${tool.icon} ${tool.color} w-5`}></i>
                              <span>{tool.title}</span>
                            </div>
                          </NavigationMenuLink>
                        </Link>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-foreground hover:text-primary">
                    Generators
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-64 p-2">
                      {generators.map((tool) => (
                        <Link key={tool.href} href={tool.href}>
                          <NavigationMenuLink className="block px-4 py-2 text-sm hover:bg-accent rounded-md transition-colors">
                            <div className="flex items-center space-x-3">
                              <i className={`${tool.icon} ${tool.color} w-5`}></i>
                              <span>{tool.title}</span>
                            </div>
                          </NavigationMenuLink>
                        </Link>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-foreground hover:text-primary">
                    SEO Tools
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-64 p-2">
                      {seoTools.map((tool) => (
                        <Link key={tool.href} href={tool.href}>
                          <NavigationMenuLink className="block px-4 py-2 text-sm hover:bg-accent rounded-md transition-colors">
                            <div className="flex items-center space-x-3">
                              <i className={`${tool.icon} ${tool.color} w-5`}></i>
                              <span>{tool.title}</span>
                            </div>
                          </NavigationMenuLink>
                        </Link>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Theme Toggle & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="icon"
              onClick={toggleTheme}
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="outline" size="icon">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="mt-6 space-y-6">
                  <div>
                    <h3 className="font-semibold mb-3">Text & Files</h3>
                    {textFileTools.map((tool) => (
                      <Link key={tool.href} href={tool.href}>
                        <a 
                          className="block py-2 px-3 text-sm hover:bg-accent rounded-md transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          <div className="flex items-center space-x-3">
                            <i className={`${tool.icon} ${tool.color} w-5`}></i>
                            <span>{tool.title}</span>
                          </div>
                        </a>
                      </Link>
                    ))}
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-3">Generators</h3>
                    {generators.map((tool) => (
                      <Link key={tool.href} href={tool.href}>
                        <a 
                          className="block py-2 px-3 text-sm hover:bg-accent rounded-md transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          <div className="flex items-center space-x-3">
                            <i className={`${tool.icon} ${tool.color} w-5`}></i>
                            <span>{tool.title}</span>
                          </div>
                        </a>
                      </Link>
                    ))}
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-3">SEO Tools</h3>
                    {seoTools.map((tool) => (
                      <Link key={tool.href} href={tool.href}>
                        <a 
                          className="block py-2 px-3 text-sm hover:bg-accent rounded-md transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          <div className="flex items-center space-x-3">
                            <i className={`${tool.icon} ${tool.color} w-5`}></i>
                            <span>{tool.title}</span>
                          </div>
                        </a>
                      </Link>
                    ))}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
}
