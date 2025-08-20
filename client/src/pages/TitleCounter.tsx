import { useState, useEffect } from 'react';
import { AdSlot } from '@/components/AdSlot';
import { FAQAccordion } from '@/components/FAQAccordion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Ruler, AlertCircle, CheckCircle, Trash2 } from 'lucide-react';

const faqs = [
  {
    question: 'What is the ideal length for SEO titles?',
    answer: 'SEO titles should be between 30-60 characters (including spaces). This ensures they display fully in search results without being truncated.',
  },
  {
    question: 'How long should meta descriptions be?',
    answer: 'Meta descriptions should be between 120-160 characters. This provides enough space to describe your content while fitting in search results.',
  },
  {
    question: 'Why do character limits matter for SEO?',
    answer: 'Search engines truncate titles and descriptions that exceed their limits. Properly sized meta tags ensure your full message appears in search results, improving click-through rates.',
  },
];

export default function TitleCounter() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const titleLength = title.length;
  const descriptionLength = description.length;

  const getTitleStatus = () => {
    if (titleLength === 0) return { status: 'empty', color: 'text-muted-foreground', icon: null };
    if (titleLength < 30) return { status: 'short', color: 'text-yellow-600 dark:text-yellow-400', icon: AlertCircle };
    if (titleLength > 60) return { status: 'long', color: 'text-red-600 dark:text-red-400', icon: AlertCircle };
    return { status: 'good', color: 'text-green-600 dark:text-green-400', icon: CheckCircle };
  };

  const getDescriptionStatus = () => {
    if (descriptionLength === 0) return { status: 'empty', color: 'text-muted-foreground', icon: null };
    if (descriptionLength < 120) return { status: 'short', color: 'text-yellow-600 dark:text-yellow-400', icon: AlertCircle };
    if (descriptionLength > 160) return { status: 'long', color: 'text-red-600 dark:text-red-400', icon: AlertCircle };
    return { status: 'good', color: 'text-green-600 dark:text-green-400', icon: CheckCircle };
  };

  const getTitleMessage = () => {
    const status = getTitleStatus().status;
    switch (status) {
      case 'empty': return 'Enter a title to check its length';
      case 'short': return `Add ${30 - titleLength} more characters for optimal length`;
      case 'long': return `Remove ${titleLength - 60} characters to avoid truncation`;
      case 'good': return 'Perfect length for SEO!';
      default: return '';
    }
  };

  const getDescriptionMessage = () => {
    const status = getDescriptionStatus().status;
    switch (status) {
      case 'empty': return 'Enter a description to check its length';
      case 'short': return `Add ${120 - descriptionLength} more characters for optimal length`;
      case 'long': return `Remove ${descriptionLength - 160} characters to avoid truncation`;
      case 'good': return 'Perfect length for SEO!';
      default: return '';
    }
  };

  const clearAll = () => {
    setTitle('');
    setDescription('');
  };

  return (
    <div>
      <section className="py-16 transition-theme bg-gray-50 dark:bg-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              <i className="fas fa-ruler text-cyan-500 mr-3"></i>
              Title & Description Counter
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Optimize your SEO titles and meta descriptions by checking their character count. 
              Ensure perfect length for search engine results and better visibility.
            </p>
          </div>

          <Card className="shadow-lg">
            <CardContent className="p-6">
              <div className="space-y-8">
                {/* Title Section */}
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-lg font-semibold text-foreground flex items-center">
                        <i className="fas fa-heading text-blue-500 mr-2"></i>
                        SEO Title
                      </h3>
                      <div className={`text-sm font-medium ${getTitleStatus().color}`}>
                        {titleLength}/60 characters
                      </div>
                    </div>
                    
                    <Input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Enter your SEO title here..."
                      className="text-base"
                    />
                    
                    <div className="mt-3 space-y-2">
                      {/* Progress Bar */}
                      <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className={`absolute left-0 top-0 h-full transition-all duration-300 ${
                            titleLength <= 60 ? 'bg-gradient-primary' : 'bg-red-500'
                          }`}
                          style={{ width: `${Math.min((titleLength / 60) * 100, 100)}%` }}
                        />
                        {/* Optimal range indicators */}
                        <div className="absolute left-0 top-0 h-full w-full flex">
                          <div style={{ width: '50%' }} className="border-r border-white/30"></div>
                        </div>
                      </div>
                      
                      {/* Status Message */}
                      <div className={`flex items-center text-sm ${getTitleStatus().color}`}>
                        {getTitleStatus().icon && (
                          <getTitleStatus().icon className="w-4 h-4 mr-2" />
                        )}
                        {getTitleMessage()}
                      </div>
                    </div>
                  </div>

                  {/* Title Preview */}
                  {title && (
                    <div className="bg-background border border-border rounded-lg p-4">
                      <div className="text-xs text-muted-foreground mb-1">Search Result Preview:</div>
                      <div className="text-blue-600 dark:text-blue-400 text-lg font-medium hover:underline cursor-pointer">
                        {title.length > 60 ? `${title.substring(0, 57)}...` : title}
                      </div>
                    </div>
                  )}
                </div>

                {/* Description Section */}
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-lg font-semibold text-foreground flex items-center">
                        <i className="fas fa-align-left text-green-500 mr-2"></i>
                        Meta Description
                      </h3>
                      <div className={`text-sm font-medium ${getDescriptionStatus().color}`}>
                        {descriptionLength}/160 characters
                      </div>
                    </div>
                    
                    <Textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Enter your meta description here..."
                      rows={3}
                      className="resize-none text-base"
                    />
                    
                    <div className="mt-3 space-y-2">
                      {/* Progress Bar */}
                      <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className={`absolute left-0 top-0 h-full transition-all duration-300 ${
                            descriptionLength <= 160 ? 'bg-gradient-primary' : 'bg-red-500'
                          }`}
                          style={{ width: `${Math.min((descriptionLength / 160) * 100, 100)}%` }}
                        />
                        {/* Optimal range indicators */}
                        <div className="absolute left-0 top-0 h-full w-full flex">
                          <div style={{ width: '75%' }} className="border-r border-white/30"></div>
                        </div>
                      </div>
                      
                      {/* Status Message */}
                      <div className={`flex items-center text-sm ${getDescriptionStatus().color}`}>
                        {getDescriptionStatus().icon && (
                          <getDescriptionStatus().icon className="w-4 h-4 mr-2" />
                        )}
                        {getDescriptionMessage()}
                      </div>
                    </div>
                  </div>

                  {/* Description Preview */}
                  {description && (
                    <div className="bg-background border border-border rounded-lg p-4">
                      <div className="text-xs text-muted-foreground mb-1">Search Result Preview:</div>
                      <div className="text-sm text-muted-foreground">
                        {description.length > 160 ? `${description.substring(0, 157)}...` : description}
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Button */}
                {(title || description) && (
                  <div className="text-center">
                    <Button onClick={clearAll} variant="outline">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Clear All
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Guidelines */}
          <div className="mt-12">
            <h3 className="text-xl font-semibold text-foreground mb-6 text-center">SEO Length Guidelines</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card p-6 rounded-lg border border-border">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mr-4">
                    <i className="fas fa-heading text-blue-600 dark:text-blue-400"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-card-foreground">SEO Title</h4>
                    <div className="text-sm text-muted-foreground">30-60 characters optimal</div>
                  </div>
                </div>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Include primary keyword near the beginning</li>
                  <li>• Make it compelling and click-worthy</li>
                  <li>• Unique for each page</li>
                  <li>• Avoid keyword stuffing</li>
                </ul>
              </div>
              
              <div className="bg-card p-6 rounded-lg border border-border">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mr-4">
                    <i className="fas fa-align-left text-green-600 dark:text-green-400"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-card-foreground">Meta Description</h4>
                    <div className="text-sm text-muted-foreground">120-160 characters optimal</div>
                  </div>
                </div>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Summarize page content accurately</li>
                  <li>• Include relevant keywords naturally</li>
                  <li>• Add a call-to-action when appropriate</li>
                  <li>• Make it engaging to encourage clicks</li>
                </ul>
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
