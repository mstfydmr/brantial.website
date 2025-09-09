'use client';

import * as React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

import { INDUSTRIES, LEADERBOARD, PLATFORMS } from '@/leaderboard';
import { cn } from '@/lib/utils';
import { Favicon } from '@/components/elements/favicon';
import { CircleProgressbar } from '@/components/elements/circle-progressbar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
// tabs removed for stacked sections

type VisibleEntry = {
  rank: number;
  company: string;
  topPlatform: keyof typeof PLATFORMS | string;
  visibilityScore: number;
  domain?: string;
};

type RisingEntry = VisibleEntry & { change?: number };

const CATEGORY_LABEL: Record<'visible' | 'rising' | 'trending', string> = {
  visible: 'Most Visible',
  rising: 'Rising',
  trending: 'Trending',
};

function formatPercent(value: number): string {
  return `${value.toFixed(2)}%`;
}

export function LeaderboardSection({
  industry: initialIndustry = 'software-companies',
  category = 'visible',
}: {
  industry?: keyof typeof INDUSTRIES | string;
  category?: 'visible' | 'rising' | 'trending';
}) {
  const [industry, setIndustry] = React.useState<string>(initialIndustry);

  const entries = React.useMemo(() => {
    const byCategory = (LEADERBOARD as any)[category] as
      | Record<string, Array<VisibleEntry | RisingEntry>>
      | undefined;
    if (!byCategory) return [] as Array<VisibleEntry | RisingEntry>;
    return (byCategory[industry] || []) as Array<VisibleEntry | RisingEntry>;
  }, [industry, category]);

  const industryLabel =
    INDUSTRIES[industry as keyof typeof INDUSTRIES]?.displayName || 'Industry';

  const topThree = entries.slice(0, 3) as Array<VisibleEntry | RisingEntry>;
  const rest = entries.slice(0, 100) as Array<VisibleEntry | RisingEntry>;

  return (
    <section className="container">
      <div className="border-x border-t">
        <div className="mb-4 flex items-center justify-between px-4 pt-5 md:px-6">
          <div className="text-muted-foreground text-sm">
            <span>{CATEGORY_LABEL[category]}</span>
            <span className="hidden md:inline"> {industryLabel} this week</span>
          </div>
          <div className="flex items-center gap-3">
            <Select value={industry} onValueChange={setIndustry}>
              <SelectTrigger size="sm">
                <SelectValue placeholder="Select industry" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(INDUSTRIES).map((it) => (
                  <SelectItem key={it.id} value={it.id}>
                    {it.displayName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Top 3 unified strip */}
        <div className="bg-card/40 divide-border grid grid-cols-1 gap-0 divide-y border-b pr-0 pl-4 md:grid-cols-4 md:gap-4 md:divide-y-0 md:pr-0 md:pl-6">
          {topThree.map((item, idx) => (
            <div
              key={idx}
              className={cn(
                'relative flex min-h-[100px] flex-col justify-end overflow-hidden py-3 pl-4 md:min-h-[220px] md:py-8 md:pl-0 lg:min-h-[260px]',
                idx === 0 ? 'md:col-span-2' : 'md:col-span-1',
                idx > 0 ? 'md:border-l md:pl-6' : '',
              )}
            >
              <div
                className="text-foreground/3 font-number pointer-events-none absolute right-[-40px] bottom-[-40px] text-[10rem] leading-none font-black select-none md:right-[-45px] md:bottom-[-45px] md:text-[16rem]"
                style={{
                  WebkitTextFillColor: 'transparent',
                  WebkitTextStroke: '2px currentColor',
                  backgroundImage:
                    'repeating-linear-gradient(45deg, currentColor 0 8px, transparent 8px 16px), linear-gradient(currentColor, currentColor)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                }}
              >
                {idx + 1}
              </div>
              <div className="text-muted-foreground text-sm">
                {industryLabel}
              </div>
              <div className="mt-2 flex items-center gap-2">
                {'domain' in item && (item as any).domain && (
                  <Favicon
                    domain={(item as any).domain as string}
                    size={22}
                    rounded={false}
                  />
                )}
                <div className="text-2xl font-semibold md:text-3xl">
                  {(item as any).company}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Table merged below strip */}
        <div className="overflow-x-auto px-2 md:overflow-x-hidden md:px-4">
          <table className="w-full text-left text-[15px] md:text-base">
            <thead className="text-muted-foreground">
              <tr className="border-b">
                <th className="py-3 pr-3">#</th>
                <th className="py-3 pr-3">Company</th>
                <th className="hidden py-3 pr-3 md:table-cell">Top platform</th>
                <th className="py-3 pr-3" style={{ textAlign: 'right' }}>
                  Visibility Score
                </th>
              </tr>
            </thead>
            <tbody>
              {rest.map((row) => (
                <tr
                  key={`${row.rank}-${(row as any).company}`}
                  className="border-b last:border-b-0"
                >
                  <td className="w-10 py-3 pr-3">{row.rank}</td>
                  <td className="py-3 pr-3">
                    <div className="flex items-center gap-3">
                      {'domain' in row && (row as any).domain && (
                        <Favicon
                          domain={(row as any).domain as string}
                          size={16}
                          rounded={false}
                        />
                      )}
                      <div className="flex-1">
                        <div className="font-semibold">
                          {(row as any).company}
                        </div>
                        {/* mobile stacked details removed; show only logo + company on small screens */}
                      </div>
                      <div className="hidden md:block">
                        {'change' in row &&
                          typeof (row as RisingEntry).change === 'number' && (
                            <span
                              className={cn(
                                'flex items-center gap-1 text-xs',
                                (row as RisingEntry).change &&
                                  (row as RisingEntry).change! > 0
                                  ? 'text-emerald-500'
                                  : 'text-rose-500',
                              )}
                            >
                              {(row as RisingEntry).change! > 0 ? (
                                <ChevronUp className="size-3" />
                              ) : (
                                <ChevronDown className="size-3" />
                              )}
                              {(row as RisingEntry).change}
                            </span>
                          )}
                      </div>
                    </div>
                  </td>
                  <td className="hidden py-3 pr-3 md:table-cell">
                    <div className="flex items-center gap-2">
                      {PLATFORMS[row.topPlatform as keyof typeof PLATFORMS]
                        ?.domain && (
                        <Favicon
                          domain={
                            PLATFORMS[
                              row.topPlatform as keyof typeof PLATFORMS
                            ]!.domain as string
                          }
                          size={16}
                          rounded={false}
                        />
                      )}
                      <span>
                        {PLATFORMS[row.topPlatform as keyof typeof PLATFORMS]
                          ?.displayName || row.topPlatform}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 pr-3">
                    <div className="flex items-center justify-end gap-2">
                      <span>{formatPercent((row as any).visibilityScore)}</span>
                      <CircleProgressbar
                        value={(row as any).visibilityScore as number}
                        size={18}
                        strokeWidth={3}
                        className="text-foreground/70"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
