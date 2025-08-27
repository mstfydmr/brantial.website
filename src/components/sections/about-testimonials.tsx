'use client';

import { useState } from 'react';

import { ArrowUpRight, MessageSquare } from 'lucide-react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useMediaQuery } from '@/hooks/use-media-query';

const testimonials = [
  {
    company: 'Snap',
    quote: 'Scalar makes content modeling effortless for developers.',
    author: {
      name: 'Robert Austin',
      role: 'Founder & Software Engineer',
    },
  },
  {
    company: 'CodeLab',
    quote: 'The developer experience is incredible. We ship faster.',
    author: {
      name: 'Sarah Chen',
      role: 'Lead Developer',
    },
  },
  {
    company: 'AirBox',
    quote: "A CMS that doesn't get in the way of development.",
    author: {
      name: 'Mike Johnson',
      role: 'CTO',
    },
  },
  {
    company: 'Craft',
    quote: 'Scalar transformed how we manage content platform-wide.',
    author: {
      name: 'Emily Davis',
      role: 'Product Manager',
    },
  },
  {
    company: 'MindSpark',
    quote: 'The API-first approach fits our headless architecture.',
    author: {
      name: 'Alex Rodriguez',
      role: 'Senior Engineer',
    },
  },
  {
    company: 'Drawit',
    quote: 'Content management has never been this intuitive.',
    author: {
      name: 'Lisa Wang',
      role: 'Engineering Lead',
    },
  },
  {
    company: 'BankTech',
    quote: "Scalar's flexibility lets us build what users need.",
    author: {
      name: 'David Kim',
      role: 'Technical Director',
    },
  },
  {
    company: 'Visionary',
    quote: 'The code-first approach makes modeling a breeze.',
    author: {
      name: 'Rachel Green',
      role: 'Full Stack Developer',
    },
  },
  {
    company: 'BuildUp',
    quote: 'We iterate on content structures as fast as code.',
    author: {
      name: 'Tom Wilson',
      role: 'Lead Developer',
    },
  },
  {
    company: 'TechMeet',
    quote: 'Scalar bridges the gap between content and code.',
    author: {
      name: 'Anna Martinez',
      role: 'Software Architect',
    },
  },
];

export function AboutTestimonials() {
  const [activeTab, setActiveTab] = useState(testimonials[0].company);
  const { isAtLeast } = useMediaQuery();
  const isMobile = !isAtLeast('md');

  const activeTestimonial =
    testimonials.find((t) => t.company === activeTab) || testimonials[0];

  return (
    <section className="container">
      <div className="bordered-div-padding border-x !pb-0">
        {/* Trusted by text */}
        <h2 className="text-muted-foreground flex items-center gap-2 text-sm leading-snug font-medium md:text-base">
          <MessageSquare className="size-5" />
          Testimonials
        </h2>

        {/* Company tabs */}
        <div className="mt-6 md:mt-8 lg:mt-10">
          {isMobile ? (
            <Select value={activeTab} onValueChange={setActiveTab}>
              <SelectTrigger className="w-full">
                <SelectValue>{activeTab}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                {testimonials.map((testimonial) => (
                  <SelectItem
                    key={testimonial.company}
                    value={testimonial.company}
                  >
                    {testimonial.company}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="flex flex-wrap gap-3">
                {testimonials.map((testimonial) => (
                  <TabsTrigger
                    key={testimonial.company}
                    value={testimonial.company}
                  >
                    {testimonial.company}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          )}
        </div>
      </div>

      {/* Active Testimonial */}
      <blockquote className="bordered-div-padding flex flex-col justify-between gap-6 border border-t-0 md:flex-row">
        <p className="lg:text-4xxl font-weight-display flex-1 text-2xl leading-snug tracking-tighter md:text-3xl">
          {activeTestimonial.quote}
        </p>

        <footer className="flex-1 md:self-end">
          <a
            href="#"
            className="group hover:text-secondary relative flex items-center transition-colors md:justify-end md:gap-2"
          >
            <ArrowUpRight className="size-6 transition-transform group-hover:rotate-45 md:size-8" />
            <cite className="font-weight-display not-italic md:text-lg lg:text-2xl">
              {activeTestimonial.company}
            </cite>
          </a>
        </footer>
      </blockquote>
    </section>
  );
}
