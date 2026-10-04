# Fitness Calorie & Protein Calculator

A simple web-based fitness calculator that helps users compare their daily calorie and protein intake with recommended targets based on body weight.

**Live App:** [Open the live calculator](https://fitness-calorie-protein-calculator.ai.studio)

This project was developed as a college mini-project to demonstrate user input handling, calculations, conditional logic, validation, and a modern responsive web interface.

## What the Project Does

The calculator takes three inputs:

- **Weight (kg)**
- **Calories consumed today (kcal)**
- **Protein consumed today (grams)**

It calculates recommended calorie and protein targets and compares them with the user's actual intake.

### Calculation Formulas

**Recommended Calories**

```text
Recommended Calories = Weight × 30
```

**Recommended Protein**

```text
Recommended Protein = Weight × 1.6
```

For example, for a 60 kg user:

```text
Recommended Calories = 60 × 30 = 1800 kcal
Recommended Protein = 60 × 1.6 = 96 g
```

The calculator then reports whether the user's current calorie and protein intake has reached each target.

## Features

- Weight input
- Daily calorie intake input
- Daily protein intake input
- Automatic calorie recommendation
- Automatic protein recommendation
- Calorie goal status
- Protein goal status
- Calculate button
- Reset button
- Input validation
- Responsive desktop, tablet, and mobile interface
- Navy-and-white fitness-themed UI
- Hand-drawn fitness doodle visual design

## Example

### Input

```text
Weight: 60 kg
Calories consumed: 1800 kcal
Protein consumed: 85 g
```

### Result

```text
Recommended Calories: 1800 kcal
Recommended Protein: 96 g

Calories: Goal reached!
Protein: You need more protein.
```

## Design

The interface uses a navy blue and white fitness theme.

- Navy: `#0A192F`
- White: `#FFFFFF`
- Electric blue accent: `#2563EB`

The visual design uses hand-drawn fitness line art featuring dumbbells, weight plates, kettlebells, jump ropes, gym shoes, fitness watches, barbells, stars, and motion marks.

The doodles are strongest around the hero section while the calculator and results areas remain clean and readable.

## Technology

- React
- TypeScript
- Tailwind CSS
- Lucide Icons
- Vite

## How It Works

```text
User enters weight
        ↓
User enters calories consumed
        ↓
User enters protein consumed
        ↓
Click Calculate
        ↓
Calculate recommended calories and protein
        ↓
Compare actual intake with recommendations
        ↓
Display fitness report
```

## Validation

The application validates inputs before calculations and handles cases such as:

- Empty inputs
- Invalid values
- Zero values
- Negative values
- Decimal values
- Large numeric values

The **Reset** button clears the current inputs and results.

## Project Purpose

This project demonstrates:

- User input handling
- Numeric calculations
- Variables
- Functions
- Conditional statements
- Input validation
- State management
- Component-based UI development
- Responsive web design
- Separation of application logic and presentation

## Scope

The project intentionally uses simple fixed formulas:

```text
Calories = Weight × 30
Protein = Weight × 1.6
```

These are simplified project formulas, not a complete personalized nutrition assessment. The application does not calculate BMR, TDEE, medical nutrition requirements, or individualized dietary plans.

## Future Scope

Possible future improvements include:

- More detailed nutrition calculations
- User profiles
- Progress tracking
- Historical results
- Database integration
- More personalized recommendations

These features are outside the current project scope.

## License

This project was created for educational and college-project purposes.
