import { useState, useEffect } from 'react';
import { AdSlot } from '@/components/AdSlot';
import { FAQAccordion } from '@/components/FAQAccordion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowRightLeft, RefreshCw, TrendingUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const faqs = [
  {
    question: 'How often are exchange rates updated?',
    answer: 'Exchange rates are updated every hour from reliable financial data sources to ensure accuracy for your conversions.',
  },
  {
    question: 'Which currencies are supported?',
    answer: 'We support over 150 world currencies including major ones like USD, EUR, GBP, JPY, and many more regional currencies.',
  },
  {
    question: 'Are the rates accurate for transactions?',
    answer: 'Our rates are for reference only. Actual transaction rates may vary depending on your bank or financial institution.',
  },
];

const popularCurrencies = [
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'Fr' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
];

export default function CurrencyConverter() {
  const [amount, setAmount] = useState('1');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const convertCurrency = async () => {
    const numAmount = parseFloat(amount);
    if (!numAmount || numAmount <= 0) {
      toast({
        title: 'Invalid amount',
        description: 'Please enter a valid positive number.',
        variant: 'destructive',
      });
      return;
    }

    if (fromCurrency === toCurrency) {
      setConvertedAmount(numAmount);
      setExchangeRate(1);
      setLastUpdated(new Date().toISOString());
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await fetch('/api/currency/convert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: fromCurrency,
          to: toCurrency,
          amount: numAmount,
        }),
      });

      if (!response.ok) {
        throw new Error('Conversion failed');
      }

      const data = await response.json();
      setConvertedAmount(data.convertedAmount);
      setExchangeRate(data.rate);
      setLastUpdated(data.lastUpdated);
      
    } catch (error) {
      console.error('Currency conversion error:', error);
      toast({
        title: 'Conversion failed',
        description: 'There was an error converting currency. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const swapCurrencies = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
    setConvertedAmount(null);
    setExchangeRate(null);
  };

  useEffect(() => {
    if (amount && fromCurrency && toCurrency) {
      const timer = setTimeout(() => {
        convertCurrency();
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [amount, fromCurrency, toCurrency]);

  return (
    <div>
      <section className="py-16 transition-theme bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              <i className="fas fa-exchange-alt text-yellow-500 mr-3"></i>
              Currency Converter
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Convert between world currencies with real-time exchange rates. Get accurate 
              conversions for over 150 currencies updated hourly.
            </p>
          </div>

          <Card className="shadow-lg">
            <CardContent className="p-6">
              <div className="space-y-6">
                {/* Conversion Interface */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* From Currency */}
                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-foreground">
                      From
                    </label>
                    <div className="space-y-2">
                      <Input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Enter amount"
                        className="text-lg font-semibold"
                        min="0"
                        step="0.01"
                      />
                      <Select value={fromCurrency} onValueChange={setFromCurrency}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {popularCurrencies.map((currency) => (
                            <SelectItem key={currency.code} value={currency.code}>
                              <div className="flex items-center space-x-2">
                                <span className="font-mono text-sm">{currency.code}</span>
                                <span>-</span>
                                <span>{currency.name}</span>
                                <span className="text-muted-foreground">({currency.symbol})</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* To Currency */}
                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-foreground">
                      To
                    </label>
                    <div className="space-y-2">
                      <div className="relative">
                        <Input
                          type="text"
                          value={convertedAmount !== null ? convertedAmount.toLocaleString() : ''}
                          readOnly
                          placeholder="Converted amount"
                          className="text-lg font-semibold bg-muted"
                        />
                        {isLoading && (
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <RefreshCw className="w-4 h-4 animate-spin text-muted-foreground" />
                          </div>
                        )}
                      </div>
                      <Select value={toCurrency} onValueChange={setToCurrency}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {popularCurrencies.map((currency) => (
                            <SelectItem key={currency.code} value={currency.code}>
                              <div className="flex items-center space-x-2">
                                <span className="font-mono text-sm">{currency.code}</span>
                                <span>-</span>
                                <span>{currency.name}</span>
                                <span className="text-muted-foreground">({currency.symbol})</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Swap Button */}
                <div className="flex justify-center">
                  <Button
                    onClick={swapCurrencies}
                    variant="outline"
                    size="sm"
                    className="rounded-full"
                  >
                    <ArrowRightLeft className="w-4 h-4" />
                  </Button>
                </div>

                {/* Exchange Rate Info */}
                {exchangeRate !== null && (
                  <div className="bg-muted p-4 rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Exchange Rate:</span>
                      <span className="font-semibold">
                        1 {fromCurrency} = {exchangeRate.toFixed(4)} {toCurrency}
                      </span>
                    </div>
                    {lastUpdated && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Last Updated:</span>
                        <span className="text-sm">
                          {new Date(lastUpdated).toLocaleString()}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {/* Convert Button */}
                <Button 
                  onClick={convertCurrency}
                  disabled={isLoading || !amount}
                  className="w-full bg-gradient-primary hover:bg-gradient-primary-hover"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Converting...
                    </>
                  ) : (
                    <>
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Convert Currency
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Popular Conversions */}
          <div className="mt-12">
            <h3 className="text-xl font-semibold text-foreground mb-6 text-center">Popular Currency Pairs</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                'USD → EUR',
                'GBP → USD',
                'EUR → JPY',
                'CAD → USD',
                'AUD → USD',
                'USD → CHF',
                'EUR → GBP',
                'USD → CNY'
              ].map((pair) => (
                <div key={pair} className="bg-card p-3 rounded-lg border border-border text-center">
                  <div className="text-sm font-medium text-card-foreground">{pair}</div>
                </div>
              ))}
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
