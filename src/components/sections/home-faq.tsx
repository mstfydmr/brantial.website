'use client';

import { ChevronDown } from 'lucide-react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

type Category = 'General';

type FAQ = {
  question: string;
  answer: React.ReactNode;
};

const faqs: FAQ[] = [
  {
    question: 'What services does Brantial provide?',
    answer:
      'Brantial helps brands increase their visibility in the age of AI through Generative Engine Optimization (GEO) and AI Search optimization. We go beyond traditional SEO by ensuring that your brand is cited, recommended, and trusted in AI-driven platforms such as ChatGPT, Gemini, and Copilot.',
  },
  {
    question: 'How is Brantial different from traditional SEO agencies?',
    answer:
      'Traditional SEO focuses on ranking blue links on Google. Brantial, however, creates content that is recognized and cited by AI systems. Our goal is not just ranking, but ensuring your brand is featured as a trusted source within AI-generated answers.',
  },
  {
    question: 'Why should I invest in AI-powered search optimization?',
    answer:
      'Studies predict that by 2028, organic search traffic will decline by up to 50%. Even today, 69% of Google searches end without a single click. To maintain visibility and traffic, brands must adapt and secure presence in AI-driven search results.',
  },
  {
    question: 'Who is Brantial best suited for?',
    answer:
      'Brantial is ideal for any brand that wants to gain digital visibility and authority. We are especially impactful for industries relying on content and search-driven traffic—such as e-commerce, SaaS, B2B, and media.',
  },
  {
    question: 'How can I get started with Brantial?',
    answer:
      'The process is simple: we begin by analyzing your current digital visibility. Then, we design a customized AI and SEO-based optimization strategy. Within the first 30 days, you can already measure how your brand is being cited in AI search results and see an increase in visibility.',
  },
];

export function HomeFAQSection() {
  return (
    <section className="overflow-hidden">
      {/* FAQPage JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text:
                  typeof faq.answer === 'string'
                    ? faq.answer
                    : String(faq.answer),
              },
            })),
          }),
        }}
      />
      <div className="container divide-y">
        <div className="hidden border-x border-b-0 p-7.5 md:block" />

        <div className="bordered-div-padding border-x">
          <h2 className="font-weight-display text-2xl leading-snug tracking-tighter md:text-3xl lg:text-5xl">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="border-x">
          <Accordion type="single" collapsible>
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="bordered-div-padding font-weight-display flex w-full items-center justify-between !pb-4 text-base hover:no-underline md:!pb-6 md:text-xl [&>svg]:hidden [&[data-state=open]_svg]:rotate-180">
                  <span>{faq.question}</span>
                  <div className="bg-card flex size-8 items-center justify-center rounded-sm border">
                    <ChevronDown className="size-5 shrink-0 tracking-tight transition-transform duration-200" />
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground bordered-div-padding max-w-2xl !pt-0 leading-relaxed tracking-tight">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        <div className="hidden border-x p-20 md:block" />
      </div>
    </section>
  );
}
