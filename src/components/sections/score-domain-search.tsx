'use client';

import type { FormEvent } from 'react';
import { useId, useState } from 'react';
import { Loader2, Search } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const api = 'https://app.brantial.ai/api/report/get';

type ApiResponse = {
  project: {
    id: number;
    name: string;
    domain: string;
    country: string | null;
    analyzed_at: string;
    metrics: Record<string, number | null>;
  };
  scores?: {
    ai_authority_score: number | null;
    visibility: number | null;
    sentiment: number | null;
  };
  competitors: Array<{
    id: number;
    name: string;
    domain: string;
    self: boolean;
    logo_url: string;
    visibility_percent: number;
    answer_count: number;
    avg_position: number | null;
    avg_sentiment: number | null;
  }>;
  prompts: Array<{
    id: number;
    prompt: string;
    country: string | null;
    answers_total: number;
    answers_analyzed: number;
    answers: Array<unknown>;
    source: string;
  }>;
  status: 'started' | 'pending' | 'done';
};

function getSentimentTone(value: number): string {
  if (value >= 66) return 'text-emerald-600 dark:text-emerald-400';
  if (value >= 40) return 'text-foreground';
  return 'text-rose-500 dark:text-rose-400';
}

function toPercent(value: number | null | undefined): string {
  if (typeof value !== 'number' || Number.isNaN(value)) return '—';
  return `${value.toFixed(0)}%`;
}

function formatAnalysisTimestamp(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Not available';
  return date.toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
}

function getStatusTone(status: ApiResponse['status']): string {
  switch (status) {
    case 'done':
      return 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20';
    case 'pending':
      return 'bg-amber-500/10 text-amber-600 border border-amber-500/20';
    case 'started':
    default:
      return 'bg-sky-500/10 text-sky-600 border border-sky-500/20';
  }
}

export function ScoreDomainSearch() {
  const formId = useId();
  const [domain, setDomain] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [report, setReport] = useState<ApiResponse | null>(null);
  const [hasPending, setHasPending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const value = domain.trim();
    if (!value) return;

    setErrorMessage(null);
    setReport(null);
    setHasPending(false);
    setAnalyzing(true);
    try {
      await pollForReport(value);
    } catch (error) {
      console.error('AI Authority Score request failed', error);
      setErrorMessage('We could not analyze the domain. Please try again.');
      setReport(null);
    } finally {
      setAnalyzing(false);
    }
  }

  async function pollForReport(domainValue: string) {
    setHasPending(false);

    const fetchReport = async () => {
      console.log('Fetching AI Authority Score for', domainValue);
      const response = await fetch(
        `${api}?domain=${encodeURIComponent(domainValue)}`,
      );
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      const data = (await response.json()) as ApiResponse;
      console.log('AI Authority Score response', data);

      if (!data.scores) {
        data.scores = {
          ai_authority_score: data.project.metrics.ai_authority_score ?? null,
          visibility: data.project.metrics.visibility ?? null,
          sentiment: data.project.metrics.sentiment ?? null,
        };
      }
      setReport(data);

      if (data.status === 'done') {
        setReport(data);
        setHasPending(false);
        return true;
      }

      setHasPending(true);
      return false;
    };

    if (await fetchReport()) {
      return;
    }

    return new Promise<void>((resolve, reject) => {
      const interval = setInterval(async () => {
        try {
          const done = await fetchReport();
          if (done) {
            clearInterval(interval);
            resolve();
          }
        } catch (error) {
          clearInterval(interval);
          reject(error);
        }
      }, 5000);
    });
  }

  return (
    <section className="container">
      <div className="bordered-div-padding bg-card/40 border-x border-t">
        <form
          id={formId}
          className="border-border/60 dark:bg-background/70 flex flex-col gap-4 rounded-lg border bg-slate-100 p-4 backdrop-blur-md sm:gap-6 sm:p-6 md:flex-row md:items-center md:gap-8 md:p-8"
          onSubmit={handleSubmit}
        >
          <div className="w-full flex-1 space-y-3">
            <div className="relative flex items-center">
              <Input
                id={`${formId}-domain`}
                type="text"
                placeholder="example.com"
                required
                value={domain}
                onChange={(event) => setDomain(event.target.value)}
                className="focus-visible:border-primary focus-visible:ring-primary/30 bg-card text-foreground focus-visible:bg-card/80 border-border/60 dark:border-border/60 h-14 rounded-full border px-6 py-3 text-base font-semibold dark:bg-[#191919] dark:text-white dark:focus-visible:bg-[#1f1f1f]"
              />
              {analyzing && (
                <div className="text-muted-foreground/70 pointer-events-none absolute right-4 flex items-center gap-2 text-xs">
                  <Loader2 className="size-4 animate-spin text-emerald-500" />
                  <span>Analyzing…</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex w-full justify-center md:w-auto md:flex-none md:justify-end">
            <Button
              type="submit"
              className="flex h-14 w-full items-center justify-center gap-3 rounded-full bg-[#5b5df8] px-8 text-base font-semibold text-white hover:bg-[#6e70ff] disabled:opacity-70 md:w-52"
              disabled={analyzing}
            >
              <Search className="size-5" />
              Analyze Domain
            </Button>
          </div>
        </form>
        {errorMessage && (
          <p className="text-destructive mt-4 text-sm font-medium">
            {errorMessage}
          </p>
        )}
        {hasPending && !report && (
          <p className="text-muted-foreground mt-6 text-sm">
            We&apos;re still analyzing your domain. This might take a minute.
          </p>
        )}
        {report?.status === 'done' && (
          <ReportPanels data={report} className="mt-10" />
        )}
      </div>
    </section>
  );
}

function ReportPanels({
  data,
  className,
}: {
  data: ApiResponse;
  className?: string;
}) {
  const { project, competitors, prompts } = data;

  return (
    <div className={className}>
      <div className="border-border/60 bg-background/60 grid gap-6 rounded-xl border p-6">
        <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <h2 className="font-weight-display text-lg tracking-tight sm:text-xl">
              Project Overview
            </h2>
            <p className="text-muted-foreground text-sm">
              Latest visibility snapshot for {project.domain}
            </p>
          </div>
        </header>

        <div className="grid gap-3 sm:grid-cols-3 sm:gap-4">
          <div className="bg-card/60 border-border/60 flex flex-col justify-between rounded-lg border px-4 py-3 sm:py-4">
            <span className="text-muted-foreground text-xs tracking-[0.2em] uppercase">
              AI Authority Score
            </span>
            <span className="font-weight-display text-3xl">
              {toPercent(project.metrics.ai_authority_score ?? null)}
            </span>
          </div>
          <div className="bg-card/60 border-border/60 flex flex-col justify-between rounded-lg border px-4 py-3 sm:py-4">
            <span className="text-muted-foreground text-xs tracking-[0.2em] uppercase">
              Visibility
            </span>
            <span className="font-weight-display text-3xl">
              {toPercent(project.metrics.visibility ?? null)}
            </span>
          </div>
          <div className="bg-card/60 border-border/60 flex flex-col justify-between rounded-lg border px-4 py-3 sm:py-4">
            <span className="text-muted-foreground text-xs tracking-[0.2em] uppercase">
              Sentiment
            </span>
            <span className={cn('font-weight-display text-3xl')}>
              {toPercent(project.metrics.sentiment ?? null)}
            </span>
          </div>
        </div>
      </div>

      <section className="mt-8 space-y-4">
        <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="font-weight-display text-lg">Competitive Landscape</h3>
          <span className="text-muted-foreground text-sm">
            Top {competitors.length} tracked competitors
          </span>
        </header>
        <div className="border-border/60 overflow-hidden rounded-xl border">
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse text-sm">
              <thead className="border-border/60 bg-card/40 text-muted-foreground border-b">
                <tr>
                  <th className="px-3 py-3 text-left sm:px-4">Competitor</th>
                  <th className="px-3 py-3 text-left sm:px-4">Visibility %</th>
                  <th className="px-3 py-3 text-left sm:px-4">Answers</th>
                  <th className="px-3 py-3 text-left sm:px-4">Avg. Position</th>
                  <th className="px-3 py-3 text-left sm:px-4">Sentiment</th>
                </tr>
              </thead>
              <tbody className="bg-card/20 [&>tr]:border-border/60 [&>tr+tr]:border-t">
                {competitors.map((competitor) => (
                  <tr
                    key={competitor.id}
                    className="bg-background dark:bg-background/80 transition-colors"
                  >
                    <td className="px-3 py-3 sm:px-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-muted size-9 overflow-hidden rounded-md">
                          <img
                            src={competitor.logo_url}
                            alt={`${competitor.name} logo`}
                            className="size-full object-cover"
                            loading="lazy"
                          />
                        </div>
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2 text-sm font-medium">
                            <span className="truncate">{competitor.name}</span>
                            {competitor.self && (
                              <span className="text-primary/80 border-primary/30 inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium">
                                It's you
                              </span>
                            )}
                          </div>
                          <div className="text-muted-foreground truncate text-xs">
                            {competitor.domain}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-3 sm:px-4">
                      <span
                        className={cn(
                          'font-medium',
                          competitor.visibility_percent === 0
                            ? 'text-muted-foreground'
                            : 'text-foreground',
                        )}
                      >
                        {competitor.visibility_percent.toFixed(2)}%
                      </span>
                    </td>
                    <td className="px-3 py-3 sm:px-4">
                      <span
                        className={cn(
                          competitor.answer_count === 0
                            ? 'text-muted-foreground'
                            : 'text-foreground',
                        )}
                      >
                        {competitor.answer_count}
                      </span>
                    </td>
                    <td className="px-3 py-3 sm:px-4">
                      {competitor.avg_position ?? '—'}
                    </td>
                    <td className="px-3 py-3 sm:px-4">
                      {typeof competitor.avg_sentiment === 'number' ? (
                        <span
                          className={cn(
                            'font-medium',
                            getSentimentTone(competitor.avg_sentiment),
                          )}
                        >
                          {competitor.avg_sentiment.toFixed(0)}%
                        </span>
                      ) : (
                        '—'
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="mt-8 space-y-4">
        <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="font-weight-display text-lg">Prompts Monitored</h3>
          <span className="text-muted-foreground text-sm">
            {prompts.length} prompts tracked
          </span>
        </header>
        <div className="border-border/60 rounded-xl border">
          <ul className="divide-border/70 divide-y">
            {prompts.map((prompt) => (
              <li
                key={prompt.id}
                className="bg-background/40 px-4 py-4 sm:px-5"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div className="space-y-1">
                    <p className="font-medium">{prompt.prompt}</p>
                    <span className="text-muted-foreground text-xs tracking-[0.2em] uppercase">
                      Source: {prompt.source}
                    </span>
                  </div>
                  <div className="text-muted-foreground text-sm">
                    {prompt.answers_total} answers · {prompt.answers_analyzed}{' '}
                    analyzed
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
