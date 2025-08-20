export interface ExchangeRates {
  [currency: string]: number | string;
  lastUpdated: string;
}

export interface ConversionResult {
  convertedAmount: number;
  rate: number;
  lastUpdated: string;
}

export class CurrencyService {
  private cachedRates: Map<string, { rates: ExchangeRates; timestamp: number }> = new Map();
  private cacheTimeout = 60 * 60 * 1000; // 1 hour

  async getExchangeRates(baseCurrency: string = 'USD'): Promise<ExchangeRates> {
    const cacheKey = baseCurrency.toUpperCase();
    const cached = this.cachedRates.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      return cached.rates;
    }

    try {
      // In a real implementation, use a currency API like:
      // - exchangerate-api.com
      // - fixer.io
      // - currencylayer.com
      
      const apiKey = process.env.CURRENCY_API_KEY || process.env.VITE_CURRENCY_API_KEY || "";
      
      if (!apiKey) {
        // Return mock data if no API key
        const mockRates: ExchangeRates = {
          EUR: 0.85,
          GBP: 0.73,
          JPY: 110.0,
          CAD: 1.25,
          AUD: 1.35,
          CHF: 0.92,
          CNY: 6.45,
          lastUpdated: new Date().toISOString(),
        };
        
        this.cachedRates.set(cacheKey, {
          rates: mockRates,
          timestamp: Date.now(),
        });
        
        return mockRates;
      }

      const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch exchange rates');
      }

      const data = await response.json();
      const rates: ExchangeRates = {
        ...data.rates,
        lastUpdated: new Date().toISOString(),
      };

      this.cachedRates.set(cacheKey, {
        rates,
        timestamp: Date.now(),
      });

      return rates;
    } catch (error) {
      console.error('Currency API error:', error);
      throw new Error('Failed to fetch exchange rates');
    }
  }

  async convertCurrency(from: string, to: string, amount: number): Promise<ConversionResult> {
    const rates = await this.getExchangeRates(from.toUpperCase());
    const rate = rates[to.toUpperCase()];
    
    if (!rate || typeof rate !== 'number') {
      throw new Error(`Exchange rate not found for ${to.toUpperCase()}`);
    }

    const convertedAmount = amount * rate;

    return {
      convertedAmount: parseFloat(convertedAmount.toFixed(2)),
      rate,
      lastUpdated: rates.lastUpdated,
    };
  }
}

export const currencyService = new CurrencyService();
