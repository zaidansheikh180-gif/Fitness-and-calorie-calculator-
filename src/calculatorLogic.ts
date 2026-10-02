/**
 * Core calculation logic and validation for the Fitness Calorie and Protein Calculator.
 * Exactly preserves the reference Java calculations:
 * 
 * double recommendedCalories = weight * 30;
 * double recommendedProtein = weight * 1.6;
 * 
 * if (calories >= recommendedCalories) {
 *     System.out.println("Calories: Goal reached!");
 * } else {
 *     System.out.println("Calories: You need more calories.");
 * }
 * 
 * if (protein >= recommendedProtein) {
 *     System.out.println("Protein: Goal reached!");
 * } else {
 *     System.out.println("Protein: You need more protein.");
 * }
 */

export interface FitnessInputs {
  weight: string;
  calories: string;
  protein: string;
}

export interface ValidationErrors {
  weight?: string;
  calories?: string;
  protein?: string;
  general?: string;
}

export interface FitnessReport {
  weight: number;
  userCalories: number;
  userProtein: number;
  recommendedCalories: number;
  recommendedProtein: number;
  calorieStatus: string;
  proteinStatus: string;
  calorieGoalReached: boolean;
  proteinGoalReached: boolean;
}

/**
 * Validates the raw string inputs to ensure all fields are provided
 * and are positive numeric values.
 */
export function validateInputs(inputs: FitnessInputs): {
  isValid: boolean;
  errors: ValidationErrors;
  parsedValues?: { weight: number; calories: number; protein: number };
} {
  const errors: ValidationErrors = {};

  const weightTrim = inputs.weight.trim();
  const caloriesTrim = inputs.calories.trim();
  const proteinTrim = inputs.protein.trim();

  // Validate Weight
  if (!weightTrim) {
    errors.weight = 'Weight is required.';
  } else {
    const parsedWeight = Number(weightTrim);
    if (isNaN(parsedWeight) || parsedWeight <= 0) {
      errors.weight = 'Weight must be a positive number (e.g., 60 kg).';
    }
  }

  // Validate Calories
  if (!caloriesTrim) {
    errors.calories = 'Calories consumed is required.';
  } else {
    const parsedCalories = Number(caloriesTrim);
    if (isNaN(parsedCalories) || parsedCalories <= 0) {
      errors.calories = 'Calories must be a positive number (e.g., 1800 kcal).';
    }
  }

  // Validate Protein
  if (!proteinTrim) {
    errors.protein = 'Protein consumed is required.';
  } else {
    const parsedProtein = Number(proteinTrim);
    if (isNaN(parsedProtein) || parsedProtein <= 0) {
      errors.protein = 'Protein must be a positive number (e.g., 85 g).';
    }
  }

  const isValid = Object.keys(errors).length === 0;

  if (isValid) {
    return {
      isValid: true,
      errors: {},
      parsedValues: {
        weight: Number(weightTrim),
        calories: Number(caloriesTrim),
        protein: Number(proteinTrim),
      },
    };
  }

  return { isValid: false, errors };
}

/**
 * Calculates recommended calories and protein using exact project formulas.
 */
export function calculateFitnessReport(weight: number, calories: number, protein: number): FitnessReport {
  const recommendedCalories = weight * 30;
  const recommendedProtein = weight * 1.6;

  const calorieGoalReached = calories >= recommendedCalories;
  const calorieStatus = calorieGoalReached
    ? 'Calories: Goal reached!'
    : 'Calories: You need more calories.';

  const proteinGoalReached = protein >= recommendedProtein;
  const proteinStatus = proteinGoalReached
    ? 'Protein: Goal reached!'
    : 'Protein: You need more protein.';

  return {
    weight,
    userCalories: calories,
    userProtein: protein,
    recommendedCalories,
    recommendedProtein,
    calorieStatus,
    proteinStatus,
    calorieGoalReached,
    proteinGoalReached,
  };
}

/**
 * Helper to display clean number without floating point artifacts
 */
export function formatMetricNumber(val: number): string {
  // If whole number, return as integer string (e.g. 1800, 1500, 96, 80)
  if (Number.isInteger(val)) {
    return val.toString();
  }
  // Otherwise clean decimal up to 1 decimal place (e.g. 96.8)
  const rounded = Math.round(val * 10) / 10;
  return rounded.toString();
}
