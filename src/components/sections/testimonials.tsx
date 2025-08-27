import { Verified } from 'lucide-react';

import { Marquee } from '@/components/magicui/marquee';
import { Meteors } from '@/components/magicui/meteors';

const companies = [
  {
    name: 'Jitter',
    logo: { src: '/images/testimonials/jitter.svg', width: 78, height: 26 },
    href: 'https://jitter.com',
  },
  {
    name: 'Vercel',
    logo: { src: '/images/testimonials/vercel.svg', width: 105, height: 24 },
    href: 'https://vercel.com',
  },
  {
    name: 'Revolut',
    logo: { src: '/images/testimonials/revolut.svg', width: 100, height: 22 },
    href: 'https://revolut.com',
  },
  {
    name: 'Zoom',
    logo: { src: '/images/testimonials/zoom.svg', width: 88, height: 20 },
    href: 'https://zoom.com',
  },
  {
    name: 'GitLab',
    logo: { src: '/images/testimonials/gitlab.svg', width: 105, height: 23 },
    href: 'https://gitlab.com',
  },
  {
    name: 'Airtable',
    logo: { src: '/images/testimonials/airtable.svg', width: 125, height: 27 },
    href: 'https://airtable.com',
  },
];

export function Testimonials() {
  return (
    <section className="container">
      <div className="bordered-div-padding relative border border-t-0">
        <div className="absolute top-0 left-full -mt-0.25 hidden h-[calc(100%+2px)] w-[50vw] overflow-hidden border-y md:block">
          <Meteors
            number={1000}
            angle={65}
            maxDuration={20}
            minDuration={5}
            className="opacity-10 [&>div]:opacity-10"
          />
        </div>
        {/* Trusted by text */}
        <h2 className="text-muted-foreground flex items-center gap-2 text-sm leading-snug font-medium md:text-base">
          <Verified className="size-5" />
          Trusted by Fast-Moving Teams
        </h2>

        {/* Company logos */}
        <Marquee className="mt-6 [--gap:8rem] md:mt-8 lg:mt-10 xl:[&_div]:[animation-play-state:paused]">
          {companies.map((company) => (
            <a
              key={company.name}
              href={company.href}
              className="py-2.5 transition-opacity hover:opacity-80"
              target="_blank"
            >
              <img
                src={company.logo.src}
                alt={company.name}
                width={company.logo.width}
                height={company.logo.height}
              />
            </a>
          ))}
        </Marquee>
      </div>
      {/* Testimonial */}
      <blockquote className="bordered-div-padding flex flex-col justify-between gap-8 border border-t-0 md:flex-row">
        <p className="lg:text-4xxl font-weight-display flex-7 text-2xl leading-snug tracking-tighter md:text-3xl">
          Scalar CMS changed how we ship content. It&apos;s fast, intuitive, and
          plays perfectly with our stack.
        </p>

        <footer className="flex-6 self-end">
          <div className="flex items-center gap-4">
            <img
              src="/images/testimonials/robert-austin.webp"
              alt="Robert Austin"
              width={40}
              height={40}
              className="rounded-full"
            />
            <cite className="text-sm font-medium not-italic md:text-lg lg:text-xl">
              Robert Austin, Founder & Software Engineer at Zerostatic
            </cite>
          </div>
        </footer>
      </blockquote>
    </section>
  );
}
