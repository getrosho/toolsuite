#!/usr/bin/env python3
import requests
import json

# Test the Python math service directly
def test_python_service():
    print("Testing Python Math Service...")
    
    test_cases = [
        {"expression": "x^2", "operation": "derivative", "variable": "x"},
        {"expression": "x**2", "operation": "integral", "variable": "x"},  
        {"expression": "sin(x)", "operation": "derivative", "variable": "x"},
        {"expression": "2*x + 3", "operation": "evaluate"},
    ]
    
    for test in test_cases:
        try:
            response = requests.post('http://localhost:8000/calculate', 
                                   json=test, timeout=10)
            result = response.json()
            
            print(f"\n--- Test: {test['expression']} ({test['operation']}) ---")
            print(f"Success: {result.get('success', False)}")
            print(f"Result: {result.get('result', 'No result')}")
            
            if 'steps' in result:
                print("Steps:")
                for i, step in enumerate(result['steps'][:3]):  # Show first 3 steps
                    print(f"  {i+1}. {step}")
            
            if 'error' in result:
                print(f"Error: {result['error']}")
                
        except Exception as e:
            print(f"Failed to test {test['expression']}: {e}")

if __name__ == "__main__":
    test_python_service()