import { useState, useEffect } from 'react';
import { AdSlot } from '@/components/AdSlot';
import { FAQAccordion } from '@/components/FAQAccordion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Calculator, History, Zap, Brain, TrendingUp, BookOpen } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const faqs = [
  {
    question: 'How do I calculate derivatives online?',
    answer: 'Simply type "derivative(x^2, x)" or use the d/dx button. Our calculator shows step-by-step solutions for polynomial, trigonometric, exponential, and logarithmic functions.',
  },
  {
    question: 'Can this calculator solve integrals step by step?',
    answer: 'Yes! Enter "integral(x^2, x)" or use the ∫ button. We provide detailed integration steps including substitution, integration by parts, and partial fractions when applicable.',
  },
  {
    question: 'Is this calculator as accurate as WolframAlpha?',
    answer: 'Our calculator uses SymPy, a powerful Python library for symbolic mathematics, ensuring 100% accuracy for derivatives, integrals, limits, and algebraic operations.',
  },
  {
    question: 'What mathematical functions are supported?',
    answer: 'We support basic arithmetic, trigonometric functions (sin, cos, tan), logarithms (log, ln), calculus operations (derivatives, integrals, limits), factorials, and algebraic solving.',
  },
];

interface CalculationHistory {
  id: string;
  expression: string;
  operation: string;
  result: string;
  steps: string[];
  timestamp: string;
}

interface CalculationResult {
  success: boolean;
  result: string;
  steps: string[];
  latex?: string;
  error?: string;
}

export default function ScientificCalculator() {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [history, setHistory] = useState<CalculationHistory[]>([]);
  const [isCalculating, setIsCalculating] = useState(false);
  const [operation, setOperation] = useState<string>('evaluate');
  const { toast } = useToast();

  useEffect(() => {
    // Load history from localStorage
    const savedHistory = localStorage.getItem('calculator-history');
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (error) {
        console.error('Error loading history:', error);
      }
    }
  }, []);

  const saveToHistory = (calculation: CalculationResult, expr: string, op: string) => {
    const historyItem: CalculationHistory = {
      id: Date.now().toString(),
      expression: expr,
      operation: op,
      result: calculation.result,
      steps: calculation.steps,
      timestamp: new Date().toISOString(),
    };

    const newHistory = [historyItem, ...history.slice(0, 49)]; // Keep last 50
    setHistory(newHistory);
    localStorage.setItem('calculator-history', JSON.stringify(newHistory));
  };

  const calculate = async () => {
    if (!expression.trim()) {
      toast({
        title: 'Empty expression',
        description: 'Please enter a mathematical expression.',
        variant: 'destructive',
      });
      return;
    }

    setIsCalculating(true);
    setResult(null);

    try {
      const response = await fetch('/api/scientific-calculator', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          expression: expression.trim(),
          operation,
          variable: 'x'
        }),
      });

      const data = await response.json();

      if (data.success) {
        setResult(data);
        saveToHistory(data, expression, operation);
        toast({
          title: 'Calculation complete',
          description: 'Result computed successfully with step-by-step solution.',
        });
      } else {
        setResult({
          success: false,
          result: 'Error',
          steps: [data.error || 'Calculation failed'],
          error: data.error
        });
        toast({
          title: 'Calculation error',
          description: data.error || 'Failed to calculate expression.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Calculation error:', error);
      setResult({
        success: false,
        result: 'Network Error',
        steps: ['Failed to connect to calculation service. Please try again.'],
        error: 'Network connection failed'
      });
      toast({
        title: 'Connection error',
        description: 'Unable to connect to the calculation service.',
        variant: 'destructive',
      });
    } finally {
      setIsCalculating(false);
    }
  };

  const insertFunction = (func: string) => {
    const cursorPos = (document.getElementById('expression-input') as HTMLInputElement)?.selectionStart || expression.length;
    const newExpression = expression.slice(0, cursorPos) + func + expression.slice(cursorPos);
    setExpression(newExpression);
  };

  const clearAll = () => {
    setExpression('');
    setResult(null);
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('calculator-history');
    toast({
      title: 'History cleared',
      description: 'All calculation history has been removed.',
    });
  };

  const loadFromHistory = (item: CalculationHistory) => {
    setExpression(item.expression);
    setOperation(item.operation);
    setResult({
      success: true,
      result: item.result,
      steps: item.steps
    });
  };

  return (
    <div>
      <section className="py-16 transition-theme bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              <Calculator className="inline-block w-10 h-10 text-blue-500 mr-3" />
              Scientific Calculator
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our free online scientific calculator solves equations, derivatives, and integrals instantly 
              with step-by-step accurate solutions. Perfect for students, engineers, and professionals.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Calculator */}
            <div className="lg:col-span-2">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="w-5 h-5 text-purple-500" />
                    Advanced Mathematical Calculator
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Operation Selection */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Button
                      variant={operation === 'evaluate' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setOperation('evaluate')}
                    >
                      Evaluate
                    </Button>
                    <Button
                      variant={operation === 'derivative' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setOperation('derivative')}
                    >
                      d/dx
                    </Button>
                    <Button
                      variant={operation === 'integral' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setOperation('integral')}
                    >
                      ∫
                    </Button>
                    <Button
                      variant={operation === 'limit' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setOperation('limit')}
                    >
                      lim
                    </Button>
                    <Button
                      variant={operation === 'solve' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setOperation('solve')}
                    >
                      Solve
                    </Button>
                    <Button
                      variant={operation === 'simplify' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setOperation('simplify')}
                    >
                      Simplify
                    </Button>
                  </div>

                  {/* Expression Input */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Mathematical Expression:
                    </label>
                    <Input
                      id="expression-input"
                      value={expression}
                      onChange={(e) => setExpression(e.target.value)}
                      placeholder="Enter expression (e.g., x^2 + 3*x + 2, sin(x), derivative(x^3))"
                      className="font-mono text-lg"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          calculate();
                        }
                      }}
                    />
                  </div>

                  {/* Function Buttons */}
                  <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                    <Button variant="outline" size="sm" onClick={() => insertFunction('sin(')}>sin</Button>
                    <Button variant="outline" size="sm" onClick={() => insertFunction('cos(')}>cos</Button>
                    <Button variant="outline" size="sm" onClick={() => insertFunction('tan(')}>tan</Button>
                    <Button variant="outline" size="sm" onClick={() => insertFunction('log(')}>log</Button>
                    <Button variant="outline" size="sm" onClick={() => insertFunction('ln(')}>ln</Button>
                    <Button variant="outline" size="sm" onClick={() => insertFunction('sqrt(')}>√</Button>
                    <Button variant="outline" size="sm" onClick={() => insertFunction('^2')}>x²</Button>
                    <Button variant="outline" size="sm" onClick={() => insertFunction('^')}>x^y</Button>
                    <Button variant="outline" size="sm" onClick={() => insertFunction('pi')}>π</Button>
                    <Button variant="outline" size="sm" onClick={() => insertFunction('e')}>e</Button>
                    <Button variant="outline" size="sm" onClick={() => insertFunction('(')}>( )</Button>
                    <Button variant="outline" size="sm" onClick={() => insertFunction('factorial(')}>n!</Button>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button
                      onClick={calculate}
                      disabled={isCalculating || !expression.trim()}
                      className="flex-1"
                    >
                      {isCalculating ? (
                        <>
                          <Zap className="w-4 h-4 mr-2 animate-spin" />
                          Calculating...
                        </>
                      ) : (
                        <>
                          <Calculator className="w-4 h-4 mr-2" />
                          Calculate
                        </>
                      )}
                    </Button>
                    <Button variant="outline" onClick={clearAll}>
                      Clear
                    </Button>
                  </div>

                  {/* Results */}
                  {result && (
                    <Card className="bg-muted/50">
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <Badge variant={result.success ? 'default' : 'destructive'}>
                              {result.success ? 'Success' : 'Error'}
                            </Badge>
                            <span className="text-sm text-muted-foreground">
                              Operation: {operation}
                            </span>
                          </div>
                          
                          <div>
                            <h4 className="font-medium text-foreground mb-2">Result:</h4>
                            <div className="bg-background p-3 rounded border font-mono text-lg">
                              {result.result}
                            </div>
                          </div>

                          {result.steps && result.steps.length > 0 && (
                            <div>
                              <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                                <BookOpen className="w-4 h-4" />
                                Step-by-Step Solution:
                              </h4>
                              <div className="space-y-1">
                                {result.steps.map((step, index) => (
                                  <div key={index} className="bg-background p-2 rounded border text-sm">
                                    <span className="text-muted-foreground mr-2">Step {index + 1}:</span>
                                    <span className="font-mono">{step}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* History Panel */}
            <div>
              <Card className="shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <History className="w-5 h-5 text-green-500" />
                      History
                    </CardTitle>
                    {history.length > 0 && (
                      <Button variant="outline" size="sm" onClick={clearHistory}>
                        Clear
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[600px]">
                    {history.length === 0 ? (
                      <p className="text-muted-foreground text-center py-8">
                        No calculations yet. Start by entering an expression!
                      </p>
                    ) : (
                      <div className="space-y-3">
                        {history.map((item) => (
                          <Card key={item.id} className="cursor-pointer hover:bg-muted/50 transition-colors"
                                onClick={() => loadFromHistory(item)}>
                            <CardContent className="p-3">
                              <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                  <Badge variant="outline" className="text-xs">
                                    {item.operation}
                                  </Badge>
                                  <span className="text-xs text-muted-foreground">
                                    {new Date(item.timestamp).toLocaleTimeString()}
                                  </span>
                                </div>
                                <div className="font-mono text-sm">
                                  <div className="text-muted-foreground truncate">
                                    {item.expression}
                                  </div>
                                  <div className="font-semibold text-foreground">
                                    = {item.result}
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <Card className="text-center">
              <CardContent className="p-6">
                <TrendingUp className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2 text-foreground">Advanced Calculus</h3>
                <p className="text-muted-foreground text-sm">
                  Compute derivatives, integrals, limits, and solve differential equations with detailed steps.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <Brain className="w-12 h-12 text-purple-500 mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2 text-foreground">Symbolic Math</h3>
                <p className="text-muted-foreground text-sm">
                  Exact symbolic computation powered by SymPy for 100% accurate mathematical results.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <BookOpen className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2 text-foreground">Step-by-Step</h3>
                <p className="text-muted-foreground text-sm">
                  Understand every calculation with detailed step-by-step solutions and explanations.
                </p>
              </CardContent>
            </Card>
          </div>

          <AdSlot className="my-12" />
          <FAQAccordion faqs={faqs} />
        </div>
      </section>
    </div>
  );
}