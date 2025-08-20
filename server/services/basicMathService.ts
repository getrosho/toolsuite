// Basic math service implementation for when Python service is unavailable
interface BasicMathResult {
  success: boolean;
  result: string;
  steps: string[];
  error?: string;
}

export class BasicMathService {
  // Basic arithmetic evaluation
  evaluateBasic(expression: string): BasicMathResult {
    try {
      // Clean expression - only allow safe mathematical characters
      const cleanExpr = expression.replace(/[^0-9+\-*/().\s^]/g, '');
      
      if (cleanExpr !== expression) {
        return {
          success: false,
          result: 'Error',
          steps: ['Expression contains unsupported characters for basic evaluation'],
          error: 'Invalid characters'
        };
      }

      // Handle power operator
      const jsExpr = cleanExpr.replace(/\^/g, '**');
      
      // Use Function constructor for safe evaluation
      const result = Function('"use strict"; return (' + jsExpr + ')')();
      
      return {
        success: true,
        result: result.toString(),
        steps: [
          `Expression: ${expression}`,
          `Simplified: ${jsExpr}`,
          `Result: ${result}`
        ]
      };
    } catch (error) {
      return {
        success: false,
        result: 'Error',
        steps: [`Error in evaluation: ${error}`],
        error: `${error}`
      };
    }
  }

  // Basic trigonometric functions
  calculateTrig(func: string, value: number, unit: 'deg' | 'rad' = 'rad'): BasicMathResult {
    try {
      const radValue = unit === 'deg' ? (value * Math.PI) / 180 : value;
      let result: number;
      let steps: string[] = [];

      steps.push(`Function: ${func}(${value}${unit === 'deg' ? '°' : ' rad'})`);
      
      if (unit === 'deg') {
        steps.push(`Converting to radians: ${value}° = ${radValue} rad`);
      }

      switch (func.toLowerCase()) {
        case 'sin':
          result = Math.sin(radValue);
          steps.push(`sin(${radValue}) = ${result}`);
          break;
        case 'cos':
          result = Math.cos(radValue);
          steps.push(`cos(${radValue}) = ${result}`);
          break;
        case 'tan':
          result = Math.tan(radValue);
          steps.push(`tan(${radValue}) = ${result}`);
          break;
        case 'arcsin':
        case 'asin':
          result = Math.asin(value);
          steps.push(`arcsin(${value}) = ${result} rad`);
          break;
        case 'arccos':
        case 'acos':
          result = Math.acos(value);
          steps.push(`arccos(${value}) = ${result} rad`);
          break;
        case 'arctan':
        case 'atan':
          result = Math.atan(value);
          steps.push(`arctan(${value}) = ${result} rad`);
          break;
        default:
          throw new Error(`Unknown trigonometric function: ${func}`);
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
        steps: [`Error in trigonometric calculation: ${error}`],
        error: `${error}`
      };
    }
  }

  // Basic logarithmic functions
  calculateLog(value: number, base?: number): BasicMathResult {
    try {
      let result: number;
      let steps: string[] = [];

      if (value <= 0) {
        throw new Error('Logarithm is undefined for non-positive values');
      }

      if (base === undefined || base === 10) {
        result = Math.log10(value);
        steps = [
          `Calculating log₁₀(${value})`,
          `Result: ${result}`
        ];
      } else if (base === Math.E) {
        result = Math.log(value);
        steps = [
          `Calculating ln(${value})`,
          `Result: ${result}`
        ];
      } else {
        result = Math.log(value) / Math.log(base);
        steps = [
          `Calculating log₍${base}₎(${value})`,
          `Using change of base: ln(${value}) / ln(${base})`,
          `Result: ${result}`
        ];
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
        steps: [`Error in logarithmic calculation: ${error}`],
        error: `${error}`
      };
    }
  }

  // Factorial calculation
  calculateFactorial(n: number): BasicMathResult {
    try {
      if (n < 0 || !Number.isInteger(n)) {
        throw new Error('Factorial is only defined for non-negative integers');
      }

      if (n > 170) {
        throw new Error('Number too large for factorial calculation');
      }

      let result = 1;
      const steps = [`Calculating ${n}!:`];

      for (let i = 1; i <= n; i++) {
        result *= i;
        if (i <= 5 || i === n) {
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

  // Parse and evaluate mathematical expressions
  parseAndCalculate(expression: string, operation: string): BasicMathResult {
    // Remove whitespace and convert to lowercase
    const expr = expression.trim().toLowerCase();
    
    // Handle basic derivatives symbolically (limited set)
    if (operation === 'derivative') {
      return this.basicDerivative(expr);
    }
    
    // Handle basic integrals symbolically (limited set)
    if (operation === 'integral') {
      return this.basicIntegral(expr);
    }
    
    // Handle trigonometric functions
    const trigMatch = expr.match(/(sin|cos|tan|asin|acos|atan)\s*\(\s*([^)]+)\s*\)/);
    if (trigMatch) {
      const func = trigMatch[1];
      const valueStr = trigMatch[2];
      
      // Try to evaluate the value
      try {
        const value = parseFloat(valueStr);
        if (!isNaN(value)) {
          return this.calculateTrig(func, value);
        }
      } catch (e) {
        // Continue to basic evaluation
      }
    }
    
    // Handle logarithms
    const logMatch = expr.match(/log\s*\(\s*([^)]+)\s*\)/);
    if (logMatch) {
      try {
        const value = parseFloat(logMatch[1]);
        if (!isNaN(value)) {
          return this.calculateLog(value);
        }
      } catch (e) {
        // Continue to basic evaluation
      }
    }
    
    // Handle factorials
    const factMatch = expr.match(/(\d+)!/);
    if (factMatch) {
      const n = parseInt(factMatch[1]);
      if (!isNaN(n)) {
        return this.calculateFactorial(n);
      }
    }
    
    // Default to basic arithmetic evaluation
    return this.evaluateBasic(expression);
  }

  // Basic symbolic derivatives (limited set)
  private basicDerivative(expr: string): BasicMathResult {
    const steps: string[] = [`Taking derivative of: ${expr}`];
    
    // Handle simple polynomial terms
    if (expr === 'x') {
      return {
        success: true,
        result: '1',
        steps: [...steps, 'd/dx(x) = 1']
      };
    }
    
    if (expr === 'x^2' || expr === 'x**2') {
      return {
        success: true,
        result: '2*x',
        steps: [...steps, 'd/dx(x²) = 2x']
      };
    }
    
    if (expr === 'x^3' || expr === 'x**3') {
      return {
        success: true,
        result: '3*x^2',
        steps: [...steps, 'd/dx(x³) = 3x²']
      };
    }
    
    // Handle constants
    const constantMatch = expr.match(/^[0-9.]+$/);
    if (constantMatch) {
      return {
        success: true,
        result: '0',
        steps: [...steps, 'Derivative of constant = 0']
      };
    }
    
    // Handle basic trig
    if (expr === 'sin(x)') {
      return {
        success: true,
        result: 'cos(x)',
        steps: [...steps, 'd/dx(sin(x)) = cos(x)']
      };
    }
    
    if (expr === 'cos(x)') {
      return {
        success: true,
        result: '-sin(x)',
        steps: [...steps, 'd/dx(cos(x)) = -sin(x)']
      };
    }
    
    return {
      success: false,
      result: 'Not supported',
      steps: [...steps, 'Advanced derivatives require the full math service'],
      error: 'Complex derivative not supported in basic mode'
    };
  }

  // Basic symbolic integrals (limited set)
  private basicIntegral(expr: string): BasicMathResult {
    const steps: string[] = [`Taking integral of: ${expr}`];
    
    if (expr === 'x') {
      return {
        success: true,
        result: 'x^2/2 + C',
        steps: [...steps, '∫x dx = x²/2 + C']
      };
    }
    
    if (expr === 'x^2' || expr === 'x**2') {
      return {
        success: true,
        result: 'x^3/3 + C',
        steps: [...steps, '∫x² dx = x³/3 + C']
      };
    }
    
    if (expr === '1') {
      return {
        success: true,
        result: 'x + C',
        steps: [...steps, '∫1 dx = x + C']
      };
    }
    
    // Constants
    const constantMatch = expr.match(/^([0-9.]+)$/);
    if (constantMatch) {
      const value = constantMatch[1];
      return {
        success: true,
        result: `${value}*x + C`,
        steps: [...steps, `∫${value} dx = ${value}x + C`]
      };
    }
    
    return {
      success: false,
      result: 'Not supported',
      steps: [...steps, 'Advanced integrals require the full math service'],
      error: 'Complex integral not supported in basic mode'
    };
  }
}

export const basicMathService = new BasicMathService();