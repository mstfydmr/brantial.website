import { useEffect, useRef } from 'react';
import mediumZoom, { type Zoom } from 'medium-zoom';

import { cn } from '@/lib/utils';

const features = [
  {
    title: 'AI Visibility Analysis',
    paragraphs: [
      <>
        Brantial allows you to measure how your brand performs across AI-powered
        platforms with precision. Through{' '}
        <strong>daily visibility trends</strong>, you can track brand mentions
        over time and detect performance shifts instantly. Flexible{' '}
        <strong>date filters</strong> — Last 7, 14, 30, 60, or 90 days — make it
        easy to zoom in on recent activity or review long-term patterns.
      </>,
      <>
        With built-in <strong>competitive benchmarking</strong>, you see exactly
        how your visibility stacks up against rivals, supported by sentiment and
        positioning metrics. Plus, <strong>recent mentions</strong> show the
        real contexts where your brand appears in AI responses, while the{' '}
        <strong>source breakdown</strong> reveals which platforms contribute
        most to visibility.
      </>,
    ],
    images: [
      {
        src: '/images/landing/ai-visibility-analysis.webp',
        alt: 'AI visibility analysis dashboard',
        width: 1983,
        height: 816,
      },
    ],
  },
  {
    title: 'AI Search Visibility',
    paragraphs: [
      <>
        Brantial helps you uncover how brands and topics are searched and
        discussed across AI-powered platforms. With{' '}
        <strong>prompt volume</strong> data, you can see how often users engage
        with specific keywords in generative search, while the{' '}
        <strong>Brand Potential Score (BPS)</strong> highlights where your brand
        has the highest opportunity to stand out.
      </>,
      <>
        Each keyword is enriched with insights on{' '}
        <strong>competition levels</strong>, <strong>user intent</strong>, and{' '}
        <strong>country targeting</strong>, giving you a clear roadmap to
        prioritize efforts.
      </>,
    ],
    images: [
      {
        src: '/images/landing/ai-keyword-volume.webp',
        alt: 'AI keyword volume insights dashboard',
        width: 1441,
        height: 816,
      },
    ],
  },
  {
    title: 'Workflow Agent: Automated Content Improvement',
    paragraphs: [
      'Brantial streamlines the entire content optimization process. Simply provide a page URL, and the platform runs a full pipeline — from fetching the latest content to delivering a ready-to-use improvement file.',
      'The workflow includes:',
      <ul className="space-y-3">
        <li>
          <strong>Content Retrieval &amp; Language Detection</strong> – Always
          works with the most up-to-date version in the right language.
        </li>
        <li>
          <strong>Structural &amp; Intent Analysis</strong> – Identifies gaps in
          headings, readability, and alignment with user intent.
        </li>
        <li>
          <strong>Quality &amp; AI Review</strong> – Surfaces issues in clarity,
          technical setup, and generative search compatibility.
        </li>
        <li>
          <strong>Planned Improvements &amp; Rewrite</strong> – Suggests
          targeted fixes and applies them while preserving brand tone.
        </li>
        <li>
          <strong>Compiled Report Output</strong> – Exports all updates in a
          single downloadable file.
        </li>
      </ul>,
      'With Brantial, what used to take hours of manual work is now delivered in minutes, giving you AI-ready, GEO-optimized content instantly.',
    ],
    images: [
      {
        src: '/images/landing/workflowagent1.webp',
        alt: 'Workflow agent content intake screen',
        width: 1680,
        height: 816,
      },
      {
        src: '/images/landing/workflowagent2.webp',
        alt: 'Workflow agent improvement output screen',
        width: 1680,
        height: 816,
      },
    ],
  },
  {
    title: 'Analytics & Tracking',
    paragraphs: [
      'Brantial connects seamlessly with Google Search Console, combining traditional SEO data with AI visibility metrics. This integration makes it possible to:',
      <ul className="space-y-3">
        <li>
          <strong>Compare classic search performance</strong> with{' '}
          <strong>AEO and GEO insights</strong>.
        </li>
        <li>
          Track how your brand ranks in organic results versus AI-driven
          responses.
        </li>
        <li>
          Identify gaps where AI mentions appear without corresponding search
          visibility.
        </li>
      </ul>,
      'By bringing these data points together, Brantial turns GSC into a more powerful tool — giving you a complete picture of visibility across both search engines and generative platforms.',
    ],
    images: [
      {
        src: '/images/landing/google-search-console.webp',
        alt: 'Google Search Console integration dashboard',
        width: 1944,
        height: 816,
      },
    ],
  },
  {
    title: 'Action Center: Your GEO To-Do List',
    paragraphs: [
      <>
        Brantial’s <strong>Action Center</strong> transforms insights into
        clear, actionable tasks. Instead of only highlighting issues, it
        organizes them into a prioritized task list, making it simple to turn
        analysis into measurable progress.
      </>,
      <>
        With <strong>progress tracking</strong>, you can monitor how many items
        remain unresolved and how much has been completed. The{' '}
        <strong>Quick Wins</strong> section highlights high-impact improvements
        with clear indicators of effort versus benefit, helping teams focus on
        what matters most.
      </>,
    ],
    images: [
      {
        src: '/images/landing/action-center.webp',
        alt: 'Action center prioritized task list interface',
        width: 1680,
        height: 816,
      },
    ],
    layout: 'split',
  },
];

export function Features2() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const zoomRef = useRef<Zoom | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const images =
      section.querySelectorAll<HTMLImageElement>('img[data-zoomable]');
    if (!images.length) return;

    zoomRef.current = mediumZoom(images, {
      background: 'rgba(15, 23, 42, 0.92)',
      margin: 24,
    });

    return () => {
      if (zoomRef.current) {
        zoomRef.current.detach();
        zoomRef.current = null;
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="container overflow-x-clip">
      <div className="grid grid-cols-1 border border-t-0 md:grid-cols-2">
        {features.map((feature, index) => {
          const isSplit = feature.layout === 'split';

          return (
            <div
              key={index}
              className={cn(
                'bordered-div-padding relative space-y-6',
                index === 0 && 'border-b md:border-e',
                index === 1 && 'border-b md:border-b-0',
                index === 3 && 'border-t md:border-s',
                index === 4 && 'border-t',
                index === 5 && 'border-t md:border-s',
                isSplit &&
                  'md:col-span-2 md:flex md:items-center md:gap-12 md:space-y-0',
              )}
            >
              <div
                className={cn('space-y-4 md:space-y-6', isSplit && 'md:w-1/2')}
              >
                <h3 className="text-foreground font-weight-display leading-snug md:text-xl">
                  {feature.title}
                </h3>
                <div className="text-muted-foreground space-y-4 text-sm leading-relaxed md:text-base">
                  {feature.paragraphs.map((paragraph, paragraphIndex) => (
                    <p key={paragraphIndex} className="whitespace-pre-line">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {feature.images && (
                <div
                  className={cn(
                    'flex flex-col gap-4 overflow-hidden mask-b-from-30% mask-b-to-95% md:max-h-[320px]',
                    isSplit && 'md:max-h-none md:w-1/2 md:items-end md:pl-10',
                  )}
                >
                  {feature.images.map(
                    ({ alt, height, src, width }, imageIndex) => (
                      <img
                        key={`${src}-${imageIndex}`}
                        src={src}
                        alt={alt}
                        width={width}
                        height={height}
                        loading="lazy"
                        data-zoomable
                        className={cn(
                          'border-border w-full rounded-xl border object-cover',
                          isSplit && 'md:w-auto md:max-w-[420px]',
                        )}
                      />
                    ),
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
