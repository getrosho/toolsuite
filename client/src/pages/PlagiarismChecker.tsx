import { useState } from 'react';
import { AdSlot } from '@/components/AdSlot';
import { FAQAccordion } from '@/components/FAQAccordion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Search, Shield, AlertTriangle, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const faqs = [
  {
    question: 'How accurate is the plagiarism detection?',
    answer: 'Our plagiarism checker uses advanced algorithms to detect similarities across billions of web pages and documents, providing highly accurate results.',
  },
  {
    question: 'What sources are checked for plagiarism?',
    answer: 'We scan against web pages, academic papers, journals, and other online content to ensure comprehensive plagiarism detection.',
  },
  {
    question: 'Is my content stored after checking?',
    answer: 'No, your content is not stored on our servers. All text is processed in real-time and discarded immediately after analysis.',
  },
];

interface PlagiarismResult {
  plagiarismScore: number;
  originalityPercentage: number;
  sources: string[];
}

export default function PlagiarismChecker() {
  const [text, setText] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [checkProgress, setCheckProgress] = useState(0);
  const [result, setResult] = useState<PlagiarismResult | null>(null);
  const { toast } = useToast();

  const wordCount = text.trim().split(/\s+/).filter(word => word.length > 0).length;
  const charCount = text.length;

  const checkPlagiarism = async () => {
    if (!text.trim()) {
      toast({
        title: 'Text required',
        description: 'Please enter text to check for plagiarism.',
        variant: 'destructive',
      });
      return;
    }

    if (text.trim().length < 50) {
      toast({
        title: 'Text too short',
        description: 'Please enter at least 50 characters for accurate plagiarism detection.',
        variant: 'destructive',
      });
      return;
    }

    setIsChecking(true);
    setCheckProgress(0);
    setResult(null);
    
    // Simulate checking progress
    const progressInterval = setInterval(() => {
      setCheckProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setIsChecking(false);
          return 100;
        }
        return prev + 2;
      });
    }, 100);

    try {
      const response = await fetch('/api/check-plagiarism', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: text.trim() }),
      });

      if (!response.ok) {
        throw new Error('Plagiarism check failed');
      }

      const data = await response.json();
      setResult({
        plagiarismScore: data.plagiarismScore,
        originalityPercentage: data.originalityPercentage,
        sources: data.sources,
      });
      
      toast({
        title: 'Plagiarism check complete',
        description: `Your content is ${data.originalityPercentage}% original.`,
      });
      
    } catch (error) {
      console.error('Plagiarism check error:', error);
      clearInterval(progressInterval);
      setIsChecking(false);
      toast({
        title: 'Check failed',
        description: 'There was an error checking your content. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const getScoreColor = (score: number) => {
    if (score <= 10) return 'text-green-600 dark:text-green-400';
    if (score <= 25) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getScoreIcon = (score: number) => {
    if (score <= 10) return CheckCircle;
    if (score <= 25) return AlertTriangle;
    return AlertTriangle;
  };

  const clearText = () => {
    setText('');
    setResult(null);
    setCheckProgress(0);
  };

  return (
    <div>
      <section className="py-16 transition-theme bg-gray-50 dark:bg-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              <i className="fas fa-search text-orange-500 mr-3"></i>
              Plagiarism Checker
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Check your content for plagiarism and ensure originality. Our advanced detection system 
              scans billions of sources to help you maintain academic and professional integrity.
            </p>
          </div>

          <Card className="shadow-lg">
            <CardContent className="p-6">
              <div className="space-y-6">
                {/* Input Section */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-foreground">
                      Enter your text to check:
                    </label>
                    <div className="text-xs text-muted-foreground">
                      {wordCount} words • {charCount} characters
                    </div>
                  </div>
                  <Textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    rows={12}
                    className="resize-none"
                    placeholder="Paste your content here to check for plagiarism. Minimum 50 characters required for accurate detection..."
                  />
                  <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
                    <span>Minimum 50 characters required</span>
                    <span className={text.length >= 50 ? 'text-green-600 dark:text-green-400' : ''}>
                      {text.length >= 50 ? '✓ Ready to check' : `${50 - text.length} more characters needed`}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap justify-center gap-4">
                  <Button 
                    onClick={checkPlagiarism}
                    disabled={isChecking || text.trim().length < 50}
                    className="bg-gradient-primary hover:bg-gradient-primary-hover"
                  >
                    {isChecking ? (
                      <>
                        <Search className="w-4 h-4 mr-2 animate-spin" />
                        Checking...
                      </>
                    ) : (
                      <>
                        <Search className="w-4 h-4 mr-2" />
                        Check Plagiarism
                      </>
                    )}
                  </Button>
                  
                  {text && (
                    <Button onClick={clearText} variant="outline">
                      Clear Text
                    </Button>
                  )}
                </div>

                {/* Progress */}
                {isChecking && (
                  <div className="space-y-2">
                    <Progress value={checkProgress} className="h-2" />
                    <div className="text-center text-sm text-muted-foreground">
                      Scanning for plagiarism... {checkProgress}%
                    </div>
                  </div>
                )}

                {/* Results */}
                {result && !isChecking && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Originality Score */}
                      <div className="bg-muted p-6 rounded-lg text-center">
                        <div className="flex items-center justify-center mb-2">
                          <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400 mr-2" />
                          <span className="text-sm font-medium text-foreground">Original Content</span>
                        </div>
                        <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                          {result.originalityPercentage}%
                        </div>
                      </div>

                      {/* Plagiarism Score */}
                      <div className="bg-muted p-6 rounded-lg text-center">
                        <div className="flex items-center justify-center mb-2">
                          {(() => {
                            const Icon = getScoreIcon(result.plagiarismScore);
                            return <Icon className={`w-6 h-6 mr-2 ${getScoreColor(result.plagiarismScore)}`} />;
                          })()}
                          <span className="text-sm font-medium text-foreground">Potential Issues</span>
                        </div>
                        <div className={`text-3xl font-bold ${getScoreColor(result.plagiarismScore)}`}>
                          {result.plagiarismScore}%
                        </div>
                      </div>
                    </div>

                    {/* Interpretation */}
                    <div className="bg-background border border-border rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-foreground mb-1">Result Interpretation</h4>
                          <p className="text-sm text-muted-foreground">
                            {result.plagiarismScore <= 10 
                              ? 'Excellent! Your content appears to be highly original with minimal similarity to existing sources.'
                              : result.plagiarismScore <= 25
                              ? 'Good originality with some minor similarities detected. Review flagged sections if needed.'
                              : 'Significant similarities detected. Please review and revise your content to ensure originality.'
                            }
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Sources Found */}
                    {result.sources.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="font-semibold text-foreground">Potential Sources:</h4>
                        <div className="space-y-1">
                          {result.sources.map((source, index) => (
                            <div key={index} className="text-sm text-muted-foreground bg-muted px-3 py-2 rounded">
                              {source}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Features */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Search className="text-orange-600 dark:text-orange-400 w-6 h-6" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">Comprehensive Scanning</h4>
              <p className="text-sm text-muted-foreground">Scans billions of web pages, academic papers, and documents for similarities.</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Shield className="text-blue-600 dark:text-blue-400 w-6 h-6" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">Privacy Protected</h4>
              <p className="text-sm text-muted-foreground">Your content is not stored and is processed securely in real-time.</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="text-green-600 dark:text-green-400 w-6 h-6" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">Detailed Reports</h4>
              <p className="text-sm text-muted-foreground">Get comprehensive analysis with originality scores and source identification.</p>
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
