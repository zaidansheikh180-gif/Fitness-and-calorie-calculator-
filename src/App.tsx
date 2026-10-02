/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  FitnessInputs,
  FitnessReport,
  ValidationErrors,
  calculateFitnessReport,
  formatMetricNumber,
  validateInputs,
} from './calculatorLogic';
import { Check, Info } from 'lucide-react';

export default function App() {
  const [inputs, setInputs] = useState<FitnessInputs>({
    weight: '',
    calories: '',
    protein: '',
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [report, setReport] = useState<FitnessReport | null>(null);

  const handleInputChange = (field: keyof FitnessInputs, value: string) => {
    setInputs((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      setErrors(validation.errors);
      setReport(null);
      return;
    }

    setErrors({});
    if (validation.parsedValues) {
      const result = calculateFitnessReport(
        validation.parsedValues.weight,
        validation.parsedValues.calories,
        validation.parsedValues.protein
      );
      setReport(result);
    }
  };

  const handleReset = () => {
    setInputs({
      weight: '',
      calories: '',
      protein: '',
    });
    setErrors({});
    setReport(null);
  };

  return (
    <div className="min-h-screen bg-[#064E3B] text-[#F8E7C9] px-4 py-8 sm:px-6 md:py-14 flex flex-col justify-between">
      <main className="w-full max-w-xl mx-auto">
        {/* 1. Header */}
        <header className="text-center mb-8 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#F8E7C9] uppercase leading-tight">
            FITNESS CALORIE
            <span className="block mt-1 text-[#F8E7C9]">&amp; PROTEIN CALCULATOR</span>
          </h1>
          <p className="mt-3 text-sm sm:text-base text-[#F8E7C9]/90 font-medium">
            Track your daily calorie and protein intake.
          </p>
        </header>

        {/* 2. Calculator Card */}
        <section
          aria-labelledby="calculator-title"
          className="bg-[#F8E7C9] text-[#064E3B] rounded-2xl p-6 sm:p-8 shadow-xl border border-[#F8E7C9]"
        >
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#064E3B]/20">
            <h2 id="calculator-title" className="text-lg sm:text-xl font-bold tracking-tight text-[#064E3B]">
              Daily Nutrition Inputs
            </h2>

            {/* 5. Reset Button */}
            <button
              type="button"
              onClick={handleReset}
              className="text-xs font-bold tracking-wider uppercase px-3 py-1.5 rounded-lg border border-[#064E3B]/40 text-[#064E3B] hover:bg-[#064E3B]/10 active:bg-[#064E3B]/20 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#064E3B] cursor-pointer"
            >
              RESET
            </button>
          </div>

          <form onSubmit={handleCalculate} noValidate className="space-y-5">
            {/* Input 1: Weight */}
            <div>
              <label htmlFor="weight" className="block text-sm font-bold text-[#064E3B] mb-2">
                Weight
              </label>
              <div className="relative">
                <input
                  id="weight"
                  name="weight"
                  type="number"
                  step="any"
                  inputMode="decimal"
                  value={inputs.weight}
                  onChange={(e) => handleInputChange('weight', e.target.value)}
                  placeholder="Enter weight"
                  aria-describedby={errors.weight ? 'weight-error' : undefined}
                  aria-invalid={!!errors.weight}
                  className={`w-full bg-[#FFFFFF] text-[#064E3B] placeholder-[#064E3B]/40 text-base font-semibold rounded-xl px-4 py-3.5 pr-14 border-2 transition-all focus:outline-none ${
                    errors.weight
                      ? 'border-[#991B1B] focus:border-[#991B1B] focus:ring-1 focus:ring-[#991B1B]'
                      : 'border-[#064E3B]/25 focus:border-[#064E3B] focus:ring-2 focus:ring-[#064E3B]/20'
                  }`}
                />
                <span className="absolute inset-y-0 right-0 pr-4 flex items-center text-sm font-bold text-[#064E3B]/70 pointer-events-none">
                  kg
                </span>
              </div>
              {errors.weight && (
                <p id="weight-error" role="alert" className="mt-2 text-xs font-bold text-[#991B1B]">
                  {errors.weight}
                </p>
              )}
            </div>

            {/* Input 2: Calories Consumed */}
            <div>
              <label htmlFor="calories" className="block text-sm font-bold text-[#064E3B] mb-2">
                Calories Consumed
              </label>
              <div className="relative">
                <input
                  id="calories"
                  name="calories"
                  type="number"
                  step="any"
                  inputMode="decimal"
                  value={inputs.calories}
                  onChange={(e) => handleInputChange('calories', e.target.value)}
                  placeholder="Enter calories"
                  aria-describedby={errors.calories ? 'calories-error' : undefined}
                  aria-invalid={!!errors.calories}
                  className={`w-full bg-[#FFFFFF] text-[#064E3B] placeholder-[#064E3B]/40 text-base font-semibold rounded-xl px-4 py-3.5 pr-16 border-2 transition-all focus:outline-none ${
                    errors.calories
                      ? 'border-[#991B1B] focus:border-[#991B1B] focus:ring-1 focus:ring-[#991B1B]'
                      : 'border-[#064E3B]/25 focus:border-[#064E3B] focus:ring-2 focus:ring-[#064E3B]/20'
                  }`}
                />
                <span className="absolute inset-y-0 right-0 pr-4 flex items-center text-sm font-bold text-[#064E3B]/70 pointer-events-none">
                  kcal
                </span>
              </div>
              {errors.calories && (
                <p id="calories-error" role="alert" className="mt-2 text-xs font-bold text-[#991B1B]">
                  {errors.calories}
                </p>
              )}
            </div>

            {/* Input 3: Protein Consumed */}
            <div>
              <label htmlFor="protein" className="block text-sm font-bold text-[#064E3B] mb-2">
                Protein Consumed
              </label>
              <div className="relative">
                <input
                  id="protein"
                  name="protein"
                  type="number"
                  step="any"
                  inputMode="decimal"
                  value={inputs.protein}
                  onChange={(e) => handleInputChange('protein', e.target.value)}
                  placeholder="Enter protein"
                  aria-describedby={errors.protein ? 'protein-error' : undefined}
                  aria-invalid={!!errors.protein}
                  className={`w-full bg-[#FFFFFF] text-[#064E3B] placeholder-[#064E3B]/40 text-base font-semibold rounded-xl px-4 py-3.5 pr-14 border-2 transition-all focus:outline-none ${
                    errors.protein
                      ? 'border-[#991B1B] focus:border-[#991B1B] focus:ring-1 focus:ring-[#991B1B]'
                      : 'border-[#064E3B]/25 focus:border-[#064E3B] focus:ring-2 focus:ring-[#064E3B]/20'
                  }`}
                />
                <span className="absolute inset-y-0 right-0 pr-4 flex items-center text-sm font-bold text-[#064E3B]/70 pointer-events-none">
                  g
                </span>
              </div>
              {errors.protein && (
                <p id="protein-error" role="alert" className="mt-2 text-xs font-bold text-[#991B1B]">
                  {errors.protein}
                </p>
              )}
            </div>

            {/* Prominent CALCULATE button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-[#064E3B] hover:bg-[#043d2e] active:scale-[0.99] text-[#F8E7C9] text-base font-extrabold uppercase tracking-wider py-4 px-6 rounded-xl transition-all shadow-md focus:outline-none focus-visible:ring-4 focus-visible:ring-[#064E3B]/30 cursor-pointer"
              >
                CALCULATE
              </button>
            </div>
          </form>
        </section>

        {/* 3. Results Section & 4. Status Section */}
        {report && (
          <section
            aria-labelledby="report-title"
            className="mt-8 bg-[#F8E7C9] text-[#064E3B] rounded-2xl p-6 sm:p-8 shadow-xl border border-[#F8E7C9]"
          >
            {/* Visually Distinct: FITNESS REPORT */}
            <div className="border-b border-[#064E3B]/20 pb-4 mb-6 flex items-center justify-between">
              <div>
                <h2
                  id="report-title"
                  className="text-xl sm:text-2xl font-extrabold uppercase tracking-tight text-[#064E3B]"
                >
                  FITNESS REPORT
                </h2>
                <p className="text-xs font-semibold text-[#064E3B]/75 mt-0.5">
                  Calculated for {report.weight} kg body weight
                </p>
              </div>

              <span className="text-xs font-bold uppercase tracking-wider text-[#064E3B] bg-[#064E3B]/10 px-2.5 py-1 rounded-md">
                Results
              </span>
            </div>

            {/* Show four values */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {/* Recommended Calories */}
              <div className="bg-[#FFFFFF] p-4 rounded-xl border border-[#064E3B]/20 shadow-xs">
                <span className="block text-xs font-bold uppercase tracking-wider text-[#064E3B]/70">
                  Recommended Calories
                </span>
                <span className="text-2xl sm:text-3xl font-extrabold text-[#064E3B] tabular-nums mt-1 block">
                  {formatMetricNumber(report.recommendedCalories)}{' '}
                  <span className="text-sm font-bold text-[#064E3B]/80">kcal</span>
                </span>
              </div>

              {/* Your Calories */}
              <div className="bg-[#FFFFFF] p-4 rounded-xl border border-[#064E3B]/20 shadow-xs">
                <span className="block text-xs font-bold uppercase tracking-wider text-[#064E3B]/70">
                  Your Calories
                </span>
                <span className="text-2xl sm:text-3xl font-extrabold text-[#064E3B] tabular-nums mt-1 block">
                  {formatMetricNumber(report.userCalories)}{' '}
                  <span className="text-sm font-bold text-[#064E3B]/80">kcal</span>
                </span>
              </div>

              {/* Recommended Protein */}
              <div className="bg-[#FFFFFF] p-4 rounded-xl border border-[#064E3B]/20 shadow-xs">
                <span className="block text-xs font-bold uppercase tracking-wider text-[#064E3B]/70">
                  Recommended Protein
                </span>
                <span className="text-2xl sm:text-3xl font-extrabold text-[#064E3B] tabular-nums mt-1 block">
                  {formatMetricNumber(report.recommendedProtein)}{' '}
                  <span className="text-sm font-bold text-[#064E3B]/80">g</span>
                </span>
              </div>

              {/* Your Protein */}
              <div className="bg-[#FFFFFF] p-4 rounded-xl border border-[#064E3B]/20 shadow-xs">
                <span className="block text-xs font-bold uppercase tracking-wider text-[#064E3B]/70">
                  Your Protein
                </span>
                <span className="text-2xl sm:text-3xl font-extrabold text-[#064E3B] tabular-nums mt-1 block">
                  {formatMetricNumber(report.userProtein)}{' '}
                  <span className="text-sm font-bold text-[#064E3B]/80">g</span>
                </span>
              </div>
            </div>

            {/* 4. Status Section - Exact original program strings */}
            <div className="space-y-3 pt-1">
              <div className="text-xs font-bold uppercase tracking-wider text-[#064E3B]/75 mb-2">
                Status
              </div>

              {/* Calorie Status */}
              <div className="bg-[#FFFFFF] p-4 rounded-xl border-2 border-[#064E3B] flex items-center gap-3.5 shadow-xs">
                <div className="w-7 h-7 rounded-full bg-[#064E3B] text-[#F8E7C9] flex items-center justify-center shrink-0">
                  {report.calorieGoalReached ? (
                    <Check className="w-4 h-4 stroke-[3]" aria-hidden="true" />
                  ) : (
                    <Info className="w-4 h-4 stroke-[2.5]" aria-hidden="true" />
                  )}
                </div>
                <span className="text-sm sm:text-base font-extrabold text-[#064E3B]">
                  {report.calorieStatus}
                </span>
              </div>

              {/* Protein Status */}
              <div className="bg-[#FFFFFF] p-4 rounded-xl border-2 border-[#064E3B] flex items-center gap-3.5 shadow-xs">
                <div className="w-7 h-7 rounded-full bg-[#064E3B] text-[#F8E7C9] flex items-center justify-center shrink-0">
                  {report.proteinGoalReached ? (
                    <Check className="w-4 h-4 stroke-[3]" aria-hidden="true" />
                  ) : (
                    <Info className="w-4 h-4 stroke-[2.5]" aria-hidden="true" />
                  )}
                </div>
                <span className="text-sm sm:text-base font-extrabold text-[#064E3B]">
                  {report.proteinStatus}
                </span>
              </div>
            </div>

            {/* Reset in report */}
            <div className="mt-6 pt-4 border-t border-[#064E3B]/20 flex justify-end">
              <button
                type="button"
                onClick={handleReset}
                className="text-xs font-bold tracking-wider uppercase px-3 py-1.5 rounded-lg border border-[#064E3B]/40 text-[#064E3B] hover:bg-[#064E3B]/10 active:bg-[#064E3B]/20 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#064E3B] cursor-pointer"
              >
                RESET
              </button>
            </div>
          </section>
        )}
      </main>

      {/* Clean, unobtrusive footer */}
      <footer className="mt-10 text-center text-xs text-[#F8E7C9]/70">
        <p>Fitness Calorie &amp; Protein Intake Calculator</p>
      </footer>
    </div>
  );
}
