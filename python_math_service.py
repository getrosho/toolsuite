#!/usr/bin/env python3
import sympy as sp
from sympy import *
from sympy.parsing.sympy_parser import parse_expr
from flask import Flask, request, jsonify
from flask_cors import CORS
import sys
import json

app = Flask(__name__)
CORS(app)

# Define common symbols
x, y, z, t, n = symbols('x y z t n')

def format_expression(expr):
    """Format expression for better readability"""
    return str(expr)

def get_calculation_steps(operation, expression, variable=None):
    """Get detailed steps for mathematical operations"""
    steps = []
    
    try:
        if operation == 'derivative':
            original = expression
            derivative = diff(expression, variable or x)
            steps = [
                f"Given function: {original}",
                f"Taking derivative with respect to {variable or x}:",
                f"d/d{variable or x}({original}) = {derivative}"
            ]
            return derivative, steps
            
        elif operation == 'integral':
            original = expression
            integral = integrate(expression, variable or x)
            steps = [
                f"Given function: {original}",
                f"Integrating with respect to {variable or x}:",
                f"∫{original} d{variable or x} = {integral} + C"
            ]
            return integral, steps
            
        elif operation == 'limit':
            # Parse limit expression like "limit(sin(x)/x, x, 0)"
            original = expression
            limit_result = limit(expression, variable or x, 0)
            steps = [
                f"Given expression: {original}",
                f"Finding limit as {variable or x} approaches 0:",
                f"lim({variable or x}→0) {original} = {limit_result}"
            ]
            return limit_result, steps
            
        elif operation == 'solve':
            original = expression
            solution = solve(expression, variable or x)
            steps = [
                f"Given equation: {original} = 0",
                f"Solving for {variable or x}:",
                f"Solution: {variable or x} = {solution}"
            ]
            return solution, steps
            
        elif operation == 'simplify':
            original = expression
            simplified = simplify(expression)
            steps = [
                f"Given expression: {original}",
                f"Simplifying:",
                f"Simplified form: {simplified}"
            ]
            return simplified, steps
            
        elif operation == 'expand':
            original = expression
            expanded = expand(expression)
            steps = [
                f"Given expression: {original}",
                f"Expanding:",
                f"Expanded form: {expanded}"
            ]
            return expanded, steps
            
        elif operation == 'factor':
            original = expression
            factored = factor(expression)
            steps = [
                f"Given expression: {original}",
                f"Factoring:",
                f"Factored form: {factored}"
            ]
            return factored, steps
            
        else:
            # Basic evaluation
            result = expression.evalf() if hasattr(expression, 'evalf') else expression
            steps = [
                f"Given expression: {expression}",
                f"Result: {result}"
            ]
            return result, steps
            
    except Exception as e:
        steps = [f"Error in calculation: {str(e)}"]
        return None, steps

@app.route('/calculate', methods=['POST'])
def calculate():
    try:
        data = request.get_json()
        expression_str = data.get('expression', '')
        operation = data.get('operation', 'evaluate')
        variable_str = data.get('variable', 'x')
        
        # Clean and prepare expression
        expression_str = expression_str.strip()
        
        # Handle common function names
        expression_str = expression_str.replace('log10', 'log')
        expression_str = expression_str.replace('ln', 'log')
        expression_str = expression_str.replace('^', '**')
        
        # Parse the expression
        try:
            expr = parse_expr(expression_str)
        except:
            # Try alternative parsing for specific operations
            if operation == 'derivative' and 'd/dx' in expression_str:
                # Extract expression after d/dx
                expr_part = expression_str.split('d/dx')[1].strip()
                expr = parse_expr(expr_part)
            elif operation == 'integral' and '∫' in expression_str:
                # Extract expression between ∫ and dx
                parts = expression_str.replace('∫', '').replace('dx', '').strip()
                expr = parse_expr(parts)
            else:
                expr = parse_expr(expression_str)
        
        # Get variable symbol
        var = symbols(variable_str)
        
        # Perform calculation with steps
        result, steps = get_calculation_steps(operation, expr, var)
        
        return jsonify({
            'success': True,
            'result': str(result) if result is not None else 'Error',
            'steps': steps,
            'latex': latex(result) if result is not None else '',
            'original_expression': expression_str
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e),
            'result': 'Error',
            'steps': [f"Calculation error: {str(e)}"]
        }), 400

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'healthy', 'service': 'math_calculator'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000, debug=False)