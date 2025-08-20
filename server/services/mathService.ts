interface MathCalculationRequest {
  expression: string;
  operation: 'evaluate' | 'derivative' | 'integral' | 'limit' | 'solve' | 'simplify' | 'expand' | 'factor';
  variable?: string;
}

interface MathCalculationResult {
  success: boolean;
  result: string;
  steps: string[];
  latex?: string;
  error?: string;
  original_expression?: string;
}

interface MathHistory {
  id: string;
  expression: string;
  operation: string;
  result: string;
  steps: string[];
  timestamp: string;
}

class MathService {
  private pythonServiceUrl = 'http://localhost:8000';
  private isServiceRunning = false;

  async checkService(): Promise<boolean> {
    try {
      const response = await fetch(`${this.pythonServiceUrl}/health`);
      this.isServiceRunning = response.ok;
      return this.isServiceRunning;
    } catch (error) {
      this.isServiceRunning = false;
      return false;
    }
  }

  async startPythonService(): Promise<void> {
    if (await this.checkService()) {
      return; // Already running
    }

    try {
      const { spawn } = require('child_process');
      const pythonProcess = spawn('python3', ['python_math_service.py'], {
        cwd: process.cwd(),
        stdio: ['pipe', 'pipe', 'pipe']
      });

      pythonProcess.stdout.on('data', (data: Buffer) => {
        console.log(`Python service: ${data.toString()}`);
      });

      pythonProcess.stderr.on('data', (data: Buffer) => {
        console.error(`Python service error: ${data.toString()}`);
      });

      // Wait a moment for service to start
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Verify it's running
      this.isServiceRunning = await this.checkService();
    } catch (error) {
      console.error('Failed to start Python service:', error);
      this.isServiceRunning = false;
    }
  }

  async calculate(request: MathCalculationRequest): Promise<MathCalculationResult> {
    // Ensure Python service is running
    if (!this.isServiceRunning) {
      await this.startPythonService();
    }

    if (!this.isServiceRunning) {
      return {
        success: false,
        result: 'Service unavailable',
        steps: ['Math service is not available. Please try again later.'],
        error: 'Python math service is not running'
      };
    }

    try {
      const response = await fetch(`${this.pythonServiceUrl}/calculate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return {
          success: false,
          result: 'Calculation error',
          steps: [`Error: ${errorData.error || 'Unknown error'}`],
          error: errorData.error
        };
      }

      const result = await response.json();
      return result;

    } catch (error) {
      console.error('Math calculation error:', error);
      return {
        success: false,
        result: 'Network error',
        steps: ['Failed to connect to math service. Please try again.'],
        error: `Network error: ${error}`
      };
    }
  }

  // Basic calculations that don't require Python service
  evaluateBasic(expression: string): MathCalculationResult {
    try {
      // Handle basic arithmetic operations
      const sanitized = expression.replace(/[^0-9+\-*/().\s]/g, '');
      
      if (sanitized !== expression) {
        throw new Error('Expression contains invalid characters for basic evaluation');
      }

      const result = Function('"use strict"; return (' + sanitized + ')')();
      
      return {
        success: true,
        result: result.toString(),
        steps: [
          `Expression: ${expression}`,
          `Result: ${result}`
        ]
      };
    } catch (error) {
      return {
        success: false,
        result: 'Error',
        steps: [`Error in basic evaluation: ${error}`],
        error: `${error}`
      };
    }
  }

  // Trigonometric functions (approximations for immediate feedback)
  calculateTrig(func: string, value: number, unit: 'deg' | 'rad' = 'rad'): MathCalculationResult {
    try {
      const radValue = unit === 'deg' ? (value * Math.PI) / 180 : value;
      let result: number;

      switch (func.toLowerCase()) {
        case 'sin':
          result = Math.sin(radValue);
          break;
        case 'cos':
          result = Math.cos(radValue);
          break;
        case 'tan':
          result = Math.tan(radValue);
          break;
        case 'arcsin':
        case 'asin':
          result = Math.asin(value);
          break;
        case 'arccos':
        case 'acos':
          result = Math.acos(value);
          break;
        case 'arctan':
        case 'atan':
          result = Math.atan(value);
          break;
        default:
          throw new Error(`Unknown trigonometric function: ${func}`);
      }

      return {
        success: true,
        result: result.toString(),
        steps: [
          `Function: ${func}(${value}${unit === 'deg' ? '°' : ' rad'})`,
          `Result: ${result}`
        ]
      };
    } catch (error) {
      return {
        success: false,
        result: 'Error',
        steps: [`Error in trigonometric calculation: ${error}`],
        error: `${error}`
      };
    }
  }

  // Logarithmic functions
  calculateLog(value: number, base?: number): MathCalculationResult {
    try {
      let result: number;
      let description: string;

      if (base === undefined || base === 10) {
        result = Math.log10(value);
        description = `log₁₀(${value})`;
      } else if (base === Math.E) {
        result = Math.log(value);
        description = `ln(${value})`;
      } else {
        result = Math.log(value) / Math.log(base);
        description = `log₍${base}₎(${value})`;
      }

      return {
        success: true,
        result: result.toString(),
        steps: [
          `Function: ${description}`,
          `Result: ${result}`
        ]
      };
    } catch (error) {
      return {
        success: false,
        result: 'Error',
        steps: [`Error in logarithmic calculation: ${error}`],
        error: `${error}`
      };
    }
  }

  // Factorial calculation
  calculateFactorial(n: number): MathCalculationResult {
    try {
      if (n < 0 || !Number.isInteger(n)) {
        throw new Error('Factorial is only defined for non-negative integers');
      }

      if (n > 170) {
        throw new Error('Number too large for factorial calculation');
      }

      let result = 1;
      const steps = [`Calculating ${n}!`];

      for (let i = 1; i <= n; i++) {
        result *= i;
        if (i <= 5 || i === n) { // Show first few steps and final step
          steps.push(`${i}! = ${result}`);
        } else if (i === 6) {
          steps.push('...');
        }
      }

      return {
        success: true,
        result: result.toString(),
        steps
      };
    } catch (error) {
      return {
        success: false,
        result: 'Error',
        steps: [`Error in factorial calculation: ${error}`],
        error: `${error}`
      };
    }
  }
}

export const mathService = new MathService();