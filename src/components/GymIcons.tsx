/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

/**
 * Modern Gym Dumbbell Graphic (Navy + Electric Blue + White)
 */
export function DumbbellGraphic({
  className = 'w-6 h-6',
  accentColor = '#2563EB',
  baseColor = '#0B1F3A',
}: {
  className?: string;
  accentColor?: string;
  baseColor?: string;
}) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Left Outer Plate */}
      <rect x="5" y="14" width="4" height="20" rx="1.5" fill={baseColor} />
      {/* Left Inner Plate */}
      <rect x="11" y="10" width="5" height="28" rx="2" fill={accentColor} />
      {/* Left Collar */}
      <rect x="16" y="18" width="2" height="12" rx="0.5" fill={baseColor} opacity="0.9" />
      {/* Center Bar with Knurling */}
      <rect x="18" y="21.5" width="12" height="5" rx="1" fill={baseColor} />
      <line x1="21" y1="21.5" x2="21" y2="26.5" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="1 1" opacity="0.6" />
      <line x1="24" y1="21.5" x2="24" y2="26.5" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="1 1" opacity="0.6" />
      <line x1="27" y1="21.5" x2="27" y2="26.5" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="1 1" opacity="0.6" />
      {/* Right Collar */}
      <rect x="30" y="18" width="2" height="12" rx="0.5" fill={baseColor} opacity="0.9" />
      {/* Right Inner Plate */}
      <rect x="32" y="10" width="5" height="28" rx="2" fill={accentColor} />
      {/* Right Outer Plate */}
      <rect x="39" y="14" width="4" height="20" rx="1.5" fill={baseColor} />
    </svg>
  );
}

/**
 * Olympic Weight Plate Graphic (Navy + Electric Blue + White)
 */
export function WeightPlateGraphic({
  className = 'w-8 h-8',
  accentColor = '#2563EB',
  baseColor = '#0B1F3A',
}: {
  className?: string;
  accentColor?: string;
  baseColor?: string;
}) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Outer Rim */}
      <circle cx="32" cy="32" r="30" stroke={accentColor} strokeWidth="3" />
      {/* Outer Lip */}
      <circle cx="32" cy="32" r="26" stroke={baseColor} strokeWidth="2.5" />
      {/* Inner Recess */}
      <circle cx="32" cy="32" r="21" fill="#EAF1F8" stroke={baseColor} strokeWidth="1.5" />
      {/* Grip Cutouts (3 ergonomic handles) */}
      <path
        d="M 23 15 A 19 19 0 0 1 41 15"
        stroke={accentColor}
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        d="M 45 38 A 19 19 0 0 1 36 49"
        stroke={accentColor}
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        d="M 19 38 A 19 19 0 0 0 28 49"
        stroke={accentColor}
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      {/* Center Steel Hub */}
      <circle cx="32" cy="32" r="7" fill={baseColor} stroke="#FFFFFF" strokeWidth="1.5" />
      {/* Hole for Barbell Sleeve */}
      <circle cx="32" cy="32" r="3.5" fill="#EAF1F8" />
    </svg>
  );
}

/**
 * Modern Kettlebell Graphic (Navy + Electric Blue)
 */
export function KettlebellGraphic({
  className = 'w-6 h-6',
  accentColor = '#2563EB',
  baseColor = '#0B1F3A',
}: {
  className?: string;
  accentColor?: string;
  baseColor?: string;
}) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Handle */}
      <path
        d="M17 19V11C17 7.5 20 5 24 5C28 5 31 7.5 31 11V19"
        stroke={accentColor}
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Body Bell */}
      <circle cx="24" cy="28" r="14" fill={baseColor} stroke={accentColor} strokeWidth="1.5" />
      {/* Flat Base */}
      <rect x="18" y="40" width="12" height="2" rx="1" fill={accentColor} />
      {/* Front Spec Ring */}
      <circle cx="24" cy="28" r="6" stroke="#FFFFFF" strokeWidth="1.5" strokeDasharray="3 2" opacity="0.8" />
    </svg>
  );
}

/**
 * Barbell Knurling Divider
 * Modern Olympic barbell shaft in Navy and Electric Blue.
 */
export function BarbellDivider({ className = 'w-full my-6' }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`} aria-hidden="true">
      <div className="w-full h-1 bg-[#CADBEB] rounded-full relative flex items-center justify-between overflow-hidden">
        {/* Left Sleeve */}
        <div className="w-12 h-2.5 bg-[#0B1F3A] border-r-2 border-[#2563EB]" />
        {/* Center Knurling Area */}
        <div className="flex-1 mx-4 h-1 border-t border-b border-[#B8D1E8] flex justify-around opacity-60">
          <div className="w-16 h-full bg-[#2563EB]/40" />
          <div className="w-16 h-full bg-[#2563EB]/40" />
        </div>
        {/* Right Sleeve */}
        <div className="w-12 h-2.5 bg-[#0B1F3A] border-l-2 border-[#2563EB]" />
      </div>
    </div>
  );
}

/**
 * Background Gym Ambiance (Oversized subtle Olympic plates and barbell silhouettes)
 */
export function GymBackgroundAtmosphere() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {/* Top Left Giant Weight Plate Silhouette */}
      <svg
        className="absolute -top-32 -left-32 w-96 h-96 text-[#0B1F3A] opacity-[0.035] transform -rotate-12 select-none"
        viewBox="0 0 200 200"
        fill="none"
      >
        <circle cx="100" cy="100" r="95" stroke="currentColor" strokeWidth="8" />
        <circle cx="100" cy="100" r="75" stroke="currentColor" strokeWidth="4" />
        <circle cx="100" cy="100" r="24" stroke="currentColor" strokeWidth="6" />
        <path d="M 60 40 A 65 65 0 0 1 140 40" stroke="currentColor" strokeWidth="12" strokeLinecap="round" />
        <path d="M 155 125 A 65 65 0 0 1 125 165" stroke="currentColor" strokeWidth="12" strokeLinecap="round" />
        <path d="M 45 125 A 65 65 0 0 0 75 165" stroke="currentColor" strokeWidth="12" strokeLinecap="round" />
      </svg>

      {/* Bottom Right Giant Dumbbell Silhouette */}
      <svg
        className="absolute -bottom-24 -right-24 w-80 h-80 text-[#2563EB] opacity-[0.035] transform rotate-45 select-none"
        viewBox="0 0 100 100"
        fill="currentColor"
      >
        <rect x="10" y="30" width="8" height="40" rx="3" />
        <rect x="22" y="20" width="10" height="60" rx="4" />
        <rect x="36" y="44" width="28" height="12" rx="2" />
        <rect x="68" y="20" width="10" height="60" rx="4" />
        <rect x="82" y="30" width="8" height="40" rx="3" />
      </svg>
    </div>
  );
}
