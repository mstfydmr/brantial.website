'use client';

import { Check, X } from 'lucide-react';

type ComparisonCell = boolean | string | React.ReactNode;

type ComparisonRow = {
  label: string;
  withValue: ComparisonCell;
  withoutValue: ComparisonCell;
};

type ComparisonProps = {
  title?: string;
  withTitle?: string;
  withSubtitle?: string;
  withoutTitle?: string;
  withoutSubtitle?: string;
  rows?: ComparisonRow[];
};

const defaultRows: ComparisonRow[] = [
  {
    label: 'AI-Powered Visibility',
    withValue:
      'Your content gets highlighted in AI-driven searches (ChatGPT, SGE, etc.)',
    withoutValue: 'Limited to traditional SEO, invisible in AI search results',
  },
  {
    label: 'Real-Time Data Analysis',
    withValue: 'User behavior and search trends are tracked instantly',
    withoutValue: 'Delayed insights, mostly based on outdated data',
  },
  {
    label: 'Generative Engine Optimization (GEO)',
    withValue: 'Your content is cited as a source by AI engines',
    withoutValue: 'Stuck competing in classic blue-link SEO only',
  },
  {
    label: 'Conversational Query Optimization',
    withValue: 'Content optimized for long-form, natural language queries',
    withoutValue: 'Only short, keyword-based SEO',
  },
  {
    label: 'AI Citations & Answer Positioning',
    withValue:
      'Brand appears as a source (citation) in LLM answers; optimized for top 1–3 positions',
    withoutValue: 'Invisible in AI responses, losing citation share',
  },
  {
    label: 'Authority & Trustworthiness',
    withValue:
      'Strengthened with structured data (Schema), citations, and statistics',
    withoutValue: 'Basic content creation, not referenced by AI',
  },
  {
    label: 'Future-Proof Strategy',
    withValue: 'Adapts to the AI-driven search ecosystem beyond 2025',
    withoutValue: 'Risk of losing up to 50% of organic traffic',
  },
];

function renderCell(value: ComparisonCell) {
  if (value === true) {
    return (
      <div className="flex items-center justify-center">
        <Check className="size-5" />
      </div>
    );
  }
  if (value === false) {
    return (
      <div className="flex items-center justify-center">
        <X className="size-5" />
      </div>
    );
  }
  return <div className="leading-relaxed tracking-tight">{value}</div>;
}

export function Comparison({
  title = 'Feature Overview',
  withTitle = 'With Brantial',
  withSubtitle = 'Automated AI Search Monitoring',
  withoutTitle = 'Without Brantial',
  withoutSubtitle = 'Manual work and missing insights',
  rows = defaultRows,
}: ComparisonProps) {
  return (
    <section className="container overflow-x-auto">
      <div className="border border-t-0">
        <table className="w-full table-fixed border-separate border-spacing-0">
          <thead>
            <tr>
              <th className="text-muted-foreground border-b text-left align-bottom text-sm leading-snug font-medium">
                <div className="bordered-div-padding">{title}</div>
              </th>
              <th className="border-s border-b text-center align-bottom">
                <div className="bordered-div-padding bg-muted/30">
                  <div className="flex items-center justify-center gap-2 text-base leading-snug font-medium">
                    <Check className="size-4 text-green-600" />
                    {withTitle}
                  </div>
                  <div className="text-muted-foreground mt-1 text-xs leading-snug">
                    {withSubtitle}
                  </div>
                </div>
              </th>
              <th className="border-s border-b text-center align-bottom">
                <div className="bordered-div-padding">
                  <div className="flex items-center justify-center gap-2 text-base leading-snug font-medium">
                    <X className="size-4 text-red-600" />
                    {withoutTitle}
                  </div>
                  <div className="text-muted-foreground mt-1 text-xs leading-snug">
                    {withoutSubtitle}
                  </div>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr key={idx} className="border-b">
                <td className="border-b align-middle">
                  <div className="bordered-div-padding text-sm md:text-base">
                    {row.label}
                  </div>
                </td>
                <td className="border-s border-b align-middle">
                  <div className="bordered-div-padding bg-muted/30 text-center">
                    {renderCell(row.withValue)}
                  </div>
                </td>
                <td className="border-s border-b align-middle">
                  <div className="bordered-div-padding text-center">
                    {renderCell(row.withoutValue)}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
