'use client';

import { ArrowRight } from 'lucide-react';
import { FaDiscord } from 'react-icons/fa6';

import { Button } from '@/components/ui/button';
import { MovingBorder } from '@/components/ui/moving-border';
import { cn } from '@/lib/utils';

export function Hero() {
  return (
    <section className="">
      <div className="container">
        <div className="bordered-div-padding relative flex flex-col items-center gap-8 border-x text-center md:gap-10 lg:gap-16 lg:!py-25">
          {/* Main Heading */}
          <div className="max-w-4xl space-y-6 md:space-y-8 lg:space-y-12">
            {/* Beta Banner */}
            <a
              href="#"
              className="relative inline-flex items-center overflow-hidden rounded-sm p-[1px]"
            >
              <MovingBorder duration={4000}>
                <div
                  className={cn(
                    'h-18 w-25 bg-[radial-gradient(#00A656_40%,transparent_60%)] opacity-[0.8]',
                  )}
                />
              </MovingBorder>
              <Button
                variant="outline"
                size="sm"
                className="relative border-none"
              >
                Public beta is starting next week
                <ArrowRight className="ml-1" />
              </Button>
            </a>
            <h1 className="font-weight-display text-2xl leading-snug tracking-tighter md:text-3xl lg:text-5xl">
              Fast, flexible, and{' '}
              <span className="block">developer-first CMS.</span>
            </h1>
            <p className="text-muted-foreground mx-auto max-w-[700px] text-sm leading-relaxed md:text-lg lg:text-xl">
              Scalar CMS gives you full control over content with a streamlined,
              API-first experience—perfect for teams who want speed without
              sacrificing flexibility.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            <Button asChild>
              <a href="#">Start Free Trial</a>
            </Button>
            <Button asChild variant="outline">
              <a href="#">
                <FaDiscord className="size-5" />
                Community
              </a>
            </Button>
          </div>
          <div
            className={cn(
              'pointer-events-none absolute top-0 left-full hidden h-[calc(100%+1px)] w-screen overflow-hidden border-b text-start select-none lg:block',
            )}
            aria-hidden="true"
            role="presentation"
          >
            <p className="p-4 whitespace-pre opacity-20">{`query MyQuery($slug: String = "") {
  post(where: { slug: $slug }) {
    slug
    title
    createdAt
    excerpt
    content {
      html
    }
    coverImage {
      altText
      url
      width
      height
    }
  }
}`}</p>
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
            className="rounded-lg mask-b-from-50% mask-b-to-90%"
          />
        </div>
      </div>
    </section>
  );
}
