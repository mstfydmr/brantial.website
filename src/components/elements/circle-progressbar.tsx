'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';

type CircleProgressbarProps = {
  value: number; // 0-100
  size?: number; // px
  strokeWidth?: number; // px
  className?: string;
  trackColor?: string; // CSS color
  progressColor?: string; // CSS color
};

export function CircleProgressbar({
  value,
  size = 16,
  strokeWidth = 2,
  className,
  trackColor,
  progressColor,
}: CircleProgressbarProps) {
  const sanitized = Math.max(0, Math.min(100, isFinite(value) ? value : 0));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashoffset = circumference * (1 - sanitized / 100);

  // Default colors adapt to theme via currentColor and opacity
  const track = trackColor || 'currentColor';
  const progress = progressColor || 'currentColor';

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={cn('text-foreground/70', className)}
      aria-hidden
    >
      <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={track}
          strokeOpacity={0.25}
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={progress}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashoffset}
          style={{ transition: 'stroke-dashoffset 300ms ease' }}
        />
      </g>
    </svg>
  );
}

export default CircleProgressbar;
