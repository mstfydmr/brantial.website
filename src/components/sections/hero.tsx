'use client';

import { Button } from '@/components/ui/button';
import { SITE_SIGNUP_URL } from '@/consts';

export function Hero() {
  return (
    <section className="overflow-x-clip">
      <div className="container">
        <div className="bordered-div-padding relative flex flex-col items-center gap-8 border-x text-center md:gap-10 lg:gap-16 lg:!py-25">
          {/* Main Heading */}
          <div className="max-w-4xl space-y-6 md:space-y-8 lg:space-y-12">
            <h1 className="font-weight-display text-2xl leading-snug tracking-tighter md:text-3xl lg:text-5xl">
              Stay Visible
              <span className="block">in the Age of AI Search</span>
            </h1>
            <p className="text-muted-foreground mx-auto max-w-[700px] text-sm leading-relaxed md:text-lg lg:text-xl">
              We help brands adapt to the AI-powered search era with strategies
              that boost visibility, optimize for LLMs, and secure a stronger
              digital presence beyond traditional SEO.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            <Button asChild>
              <a
                href={SITE_SIGNUP_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Start Free Trial
              </a>
            </Button>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="bordered-div-padding flex items-center justify-center border">
          <img
            src="/images/landing/hero.webp"
            alt="Hero Image"
            width={1320}
            height={743}
            className="rounded-lg border mask-b-from-50% mask-b-to-90%"
          />
        </div>
      </div>
    </section>
  );
}
