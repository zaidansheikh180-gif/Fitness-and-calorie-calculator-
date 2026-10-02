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
import { Check, Info, Dumbbell, Activity, RotateCcw } from 'lucide-react';

function DoodleField({ dense = false }: { dense?: boolean }) {
  const items = dense
    ? [
        ['dumbbell', '8%', '16%', '-18deg'], ['plate', '22%', '72%', '12deg'],
        ['rope', '48%', '18%', '8deg'], ['shoe', '72%', '70%', '-14deg'],
        ['watch', '88%', '28%', '20deg'], ['kettlebell', '80%', '84%', '-8deg'],
        ['bar', '34%', '88%', '-4deg'], ['star', '58%', '78%', '0deg'],
      ]
    : [
        ['dumbbell', '7%', '18%', '-15deg'], ['plate', '91%', '17%', '12deg'],
        ['rope', '88%', '76%', '-10deg'], ['shoe', '8%', '78%', '14deg'],
        ['star', '48%', '8%', '0deg'], ['watch', '54%', '88%', '12deg'],
      ];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {items.map(([kind, left, top, rotate], index) => (
        <div
          key={index}
          className="absolute opacity-[0.13] sm:opacity-[0.17]"
          style={{ left, top, transform: `rotate(${rotate})` }}
        >
          {kind === 'dumbbell' && (
            <svg width="74" height="42" viewBox="0 0 74 42" fill="none">
              <path d="M22 21h30M8 12v18M15 8v26M59 8v26M66 12v18" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round"/>
            </svg>
          )}
          {kind === 'plate' && (
            <svg width="58" height="58" viewBox="0 0 58 58" fill="none">
              <circle cx="29" cy="29" r="23" stroke="currentColor" strokeWidth="3.5"/>
              <circle cx="29" cy="29" r="7" stroke="currentColor" strokeWidth="3"/>
            </svg>
          )}
          {kind === 'rope' && (
            <svg width="88" height="48" viewBox="0 0 88 48" fill="none">
              <path d="M5 34c18-30 36-30 54-5 9 12 15 10 24-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
            </svg>
          )}
          {kind === 'shoe' && (
            <svg width="64" height="48" viewBox="0 0 64 48" fill="none">
              <path d="M8 33c8-2 13-10 17-20l11 8 7 2c6 2 10 6 13 10v7H8c-3 0-4-5 0-7Z" stroke="currentColor" strokeWidth="3.2" strokeLinejoin="round"/>
              <path d="M27 25l8 4M37 27l7 3" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
          )}
          {kind === 'watch' && (
            <svg width="48" height="58" viewBox="0 0 48 58" fill="none">
              <path d="M17 5h14l2 12H15L17 5ZM15 41h18l-2 12H17l-2-12Z" stroke="currentColor" strokeWidth="3"/>
              <rect x="9" y="16" width="30" height="26" rx="8" stroke="currentColor" strokeWidth="3"/>
              <path d="M18 29h12M24 23v7l5 3" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
          )}
          {kind === 'kettlebell' && (
            <svg width="58" height="62" viewBox="0 0 58 62" fill="none">
              <path d="M18 23c0-10 4-16 11-16s11 6 11 16" stroke="currentColor" strokeWidth="3.5"/>
              <path d="M13 24h32l5 9c4 12-5 23-21 23S4 45 8 33l5-9Z" stroke="currentColor" strokeWidth="3.5" strokeLinejoin="round"/>
            </svg>
          )}
          {kind === 'bar' && (
            <svg width="92" height="32" viewBox="0 0 92 32" fill="none">
              <path d="M7 16h78" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round"/>
              <path d="M16 7v18M23 4v24M69 4v24M76 7v18" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round"/>
            </svg>
          )}
          {kind === 'star' && (
            <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
              <path d="m17 3 3.3 9.8H31l-8.7 6.1 3.2 10L17 22.8 8.5 28l3.2-10L3 12.8h10.7L17 3Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/>
            </svg>
          )}
        </div>
      ))}
    </div>
  );
}

function MetricCard({
  label,
  value,
  unit,
}: {
  label: string;
  value: string;
  unit: string;
}) {
  return (
    <div className="rounded-2xl border border-[#0A192F]/10 bg-white p-4 shadow-sm sm:p-5">
      <span className="block text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#0A192F]/55">
        {label}
      </span>
      <div className="mt-2 flex items-baseline gap-1.5">
        <span className="text-2xl font-black tabular-nums tracking-tight text-[#0A192F] sm:text-3xl">
          {value}
        </span>
        <span className="text-xs font-bold uppercase text-[#0A192F]/55">{unit}</span>
      </div>
    </div>
  );
}

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
      setReport(
        calculateFitnessReport(
          validation.parsedValues.weight,
          validation.parsedValues.calories,
          validation.parsedValues.protein,
        ),
      );
    }
  };

  const handleReset = () => {
    setInputs({ weight: '', calories: '', protein: '' });
    setErrors({});
    setReport(null);
  };

  const fields = [
    {
      key: 'weight' as const,
      label: 'Weight',
      placeholder: 'Enter weight',
      unit: 'kg',
      errorId: 'weight-error',
      error: errors.weight,
    },
    {
      key: 'calories' as const,
      label: 'Calories consumed',
      placeholder: 'Enter calories',
      unit: 'kcal',
      errorId: 'calories-error',
      error: errors.calories,
    },
    {
      key: 'protein' as const,
      label: 'Protein consumed',
      placeholder: 'Enter protein',
      unit: 'g',
      errorId: 'protein-error',
      error: errors.protein,
    },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#0A192F] text-white">
      <main className="relative mx-auto w-full max-w-6xl px-4 py-5 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
        <section className="relative overflow-hidden rounded-[2rem] bg-[#0A192F] px-5 py-9 sm:px-10 sm:py-12 lg:px-16 lg:py-16">
          <DoodleField />
          <div className="relative z-10 mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-white backdrop-blur-sm">
              <Activity className="h-4 w-4" aria-hidden="true" />
              Fitness notebook
            </div>

            <h1 className="text-4xl font-black leading-[0.95] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
              FITNESS CALORIE
              <span className="block text-white/90">&amp; PROTEIN CALCULATOR</span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-sm font-medium leading-6 text-white/65 sm:text-base">
              Track your daily calorie and protein intake against your recommended targets.
            </p>

            <div className="mt-7 flex items-center justify-center gap-3 text-white/60">
              <Dumbbell className="h-5 w-5" />
              <span className="h-px w-10 bg-white/20" />
              <span className="text-xs font-bold uppercase tracking-[0.18em]">Train smart</span>
              <span className="h-px w-10 bg-white/20" />
              <Dumbbell className="h-5 w-5" />
            </div>
          </div>
        </section>

        <section
          aria-labelledby="calculator-title"
          className="relative z-10 -mt-5 overflow-hidden rounded-[2rem] bg-white text-[#0A192F] shadow-2xl ring-1 ring-black/5 sm:-mt-8"
        >
          <div className="relative px-5 py-6 sm:px-8 sm:py-8 lg:px-10">
            <DoodleField dense />

            <div className="relative z-10">
              <div className="mb-7 flex items-start justify-between gap-4 border-b border-[#0A192F]/10 pb-5">
                <div>
                  <div className="flex items-center gap-2 text-[#2563EB]">
                    <Dumbbell className="h-5 w-5" />
                    <span className="text-[11px] font-black uppercase tracking-[0.18em]">
                      Daily nutrition
                    </span>
                  </div>
                  <h2 id="calculator-title" className="mt-1 text-2xl font-black tracking-tight sm:text-3xl">
                    Your inputs
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-[#0A192F]/15 px-3 py-2 text-xs font-black uppercase tracking-wider text-[#0A192F]/75 transition hover:border-[#0A192F]/30 hover:bg-[#0A192F]/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Reset
                </button>
              </div>

              <form onSubmit={handleCalculate} noValidate>
                <div className="grid gap-5 md:grid-cols-3">
                  {fields.map((field) => (
                    <div key={field.key}>
                      <label
                        htmlFor={field.key}
                        className="mb-2 block text-sm font-extrabold text-[#0A192F]"
                      >
                        {field.label}
                      </label>
                      <div className="relative">
                        <input
                          id={field.key}
                          name={field.key}
                          type="number"
                          step="any"
                          inputMode="decimal"
                          value={inputs[field.key]}
                          onChange={(e) => handleInputChange(field.key, e.target.value)}
                          placeholder={field.placeholder}
                          aria-describedby={field.error ? field.errorId : undefined}
                          aria-invalid={!!field.error}
                          className={`w-full rounded-2xl border-2 bg-white px-4 py-3.5 pr-16 text-base font-semibold text-[#0A192F] outline-none transition placeholder:text-[#0A192F]/35 focus:ring-4 ${
                            field.error
                              ? 'border-[#991B1B] focus:border-[#991B1B] focus:ring-[#991B1B]/10'
                              : 'border-[#0A192F]/15 focus:border-[#2563EB] focus:ring-[#2563EB]/10'
                          }`}
                        />
                        <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-xs font-black uppercase text-[#0A192F]/45">
                          {field.unit}
                        </span>
                      </div>
                      {field.error && (
                        <p id={field.errorId} role="alert" className="mt-2 text-xs font-bold text-[#991B1B]">
                          {field.error}
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                <button
                  type="submit"
                  className="mt-7 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#0A192F] px-6 py-4 text-sm font-black uppercase tracking-[0.16em] text-white shadow-lg transition hover:bg-[#071426] active:scale-[0.99] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#2563EB]/30"
                >
                  Calculate
                  <span aria-hidden="true">→</span>
                </button>
              </form>
            </div>
          </div>
        </section>

        {report && (
          <section
            aria-labelledby="report-title"
            className="relative mt-6 overflow-hidden rounded-[2rem] bg-white p-5 text-[#0A192F] shadow-2xl sm:p-8"
          >
            <DoodleField dense />

            <div className="relative z-10">
              <div className="flex items-end justify-between gap-4 border-b border-[#0A192F]/10 pb-5">
                <div>
                  <span className="text-[11px] font-black uppercase tracking-[0.18em] text-[#2563EB]">
                    Fitness report
                  </span>
                  <h2 id="report-title" className="mt-1 text-2xl font-black tracking-tight sm:text-3xl">
                    Your results
                  </h2>
                  <p className="mt-1 text-xs font-semibold text-[#0A192F]/55">
                    Calculated for {report.weight} kg body weight
                  </p>
                </div>
                <span className="hidden rounded-full bg-[#0A192F]/5 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-[#0A192F]/60 sm:inline-flex">
                  Results
                </span>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <MetricCard
                  label="Recommended calories"
                  value={formatMetricNumber(report.recommendedCalories)}
                  unit="kcal"
                />
                <MetricCard
                  label="Your calories"
                  value={formatMetricNumber(report.userCalories)}
                  unit="kcal"
                />
                <MetricCard
                  label="Recommended protein"
                  value={formatMetricNumber(report.recommendedProtein)}
                  unit="g"
                />
                <MetricCard
                  label="Your protein"
                  value={formatMetricNumber(report.userProtein)}
                  unit="g"
                />
              </div>

              <div className="mt-6">
                <div className="mb-3 flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.18em] text-[#0A192F]/55">
                  <Info className="h-4 w-4" />
                  Status
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {[{
                    reached: report.calorieGoalReached,
                    text: report.calorieStatus,
                  }, {
                    reached: report.proteinGoalReached,
                    text: report.proteinStatus,
                  }].map((status, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 rounded-2xl border-2 border-[#0A192F]/10 bg-[#0A192F]/[0.025] p-4"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0A192F] text-white">
                        {status.reached ? (
                          <Check className="h-5 w-5" aria-hidden="true" />
                        ) : (
                          <Info className="h-5 w-5" aria-hidden="true" />
                        )}
                      </div>
                      <span className="text-sm font-extrabold text-[#0A192F]">
                        {status.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex justify-end border-t border-[#0A192F]/10 pt-5">
                <button
                  type="button"
                  onClick={handleReset}
                  className="rounded-xl border border-[#0A192F]/15 px-4 py-2.5 text-xs font-black uppercase tracking-wider text-[#0A192F]/75 transition hover:bg-[#0A192F]/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
                >
                  Reset report
                </button>
              </div>
            </div>
          </section>
        )}

        <footer className="py-7 text-center text-xs font-semibold text-white/45">
          Fitness Calorie &amp; Protein Intake Calculator
        </footer>
      </main>
    </div>
  );
}
