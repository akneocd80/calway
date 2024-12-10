import { evaluate } from 'mathjs';

export const solveEquation = (equation) => {
  try {
    const result = evaluate(equation);
    return result;
  } catch (error) {
    console.error('Error solving equation:', error);
    return null;
  }
};
