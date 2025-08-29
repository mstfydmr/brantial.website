'use client';

import { useState } from 'react';

import { ChevronDown } from 'lucide-react';

import { Meteors } from '@/components/magicui/meteors';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

type Category =
  | 'General'
  | 'Security & Privacy'
  | 'Pricing & Plans'
  | 'Support'
  | 'Accounts & Access';

const categories: Category[] = [
  'General',
  'Security & Privacy',
  'Pricing & Plans',
  'Support',
  'Accounts & Access',
];

type FAQ = {
  question: string;
  answer: React.ReactNode;
};

const faqs: Record<Category, FAQ[]> = {
  General: [
    {
      question: 'What is Brantial?',
      answer:
        'Brantial is an AI-powered platform designed to help businesses and individuals automate tasks, analyze data, and optimize workflows.',
    },
    {
      question: 'Who should use Brantial?',
      answer:
        'It’s suitable for entrepreneurs, startups, agencies, and enterprises looking to boost efficiency with AI.',
    },
    {
      question: 'Do I need technical knowledge to use Brantial?',
      answer:
        'No. Brantial is built for both technical and non-technical users.',
    },
    {
      question: 'How is Brantial different from other AI tools?',
      answer:
        'Brantial focuses on simplicity, scalability, and customizable workflows, making it more flexible for businesses of any size.',
    },
    {
      question: 'Is Brantial cloud-based?',
      answer:
        'Yes. You can access Brantial from anywhere without installing software.',
    },
    {
      question: 'Is Brantial continuously updated?',
      answer:
        'Yes. We regularly add new features, improvements, and AI models.',
    },
    {
      question: 'Can Brantial grow with my business?',
      answer:
        'Yes. Brantial is scalable and supports small projects up to enterprise-level needs.',
    },
    {
      question: 'Where is Brantial based?',
      answer: 'Brantial is an international platform with users worldwide.',
    },
  ],
  'Security & Privacy': [
    {
      question: 'How does Brantial keep my data safe?',
      answer:
        'We use encryption, secure servers, and follow strict compliance standards.',
    },
    {
      question: 'Do you share my data with third parties?',
      answer: 'No. Your data stays private and is never sold or shared.',
    },
    {
      question: 'Can I delete my data anytime?',
      answer:
        'Yes. You have full control and can request deletion whenever needed.',
    },
  ],
  'Pricing & Plans': [
    {
      question: 'Does Brantial have a free trial?',
      answer: 'Yes. You can try Brantial for free before choosing a paid plan.',
    },
    {
      question: 'What payment methods are supported?',
      answer:
        'We accept major credit cards, PayPal, and other secure payment options.',
    },
    {
      question: 'Can I switch between plans later?',
      answer: 'Yes. You can upgrade or downgrade your plan at any time.',
    },
    {
      question: 'Do you offer enterprise pricing?',
      answer: 'Yes. Custom pricing is available for larger organizations.',
    },
  ],
  Support: [
    {
      question: 'How can I contact Brantial support?',
      answer: 'You can reach us via live chat or email support.',
    },
    {
      question: 'What are your support hours?',
      answer: 'Our support team is available 24/7 to assist you.',
    },
    {
      question: 'Do you provide onboarding or training?',
      answer:
        'Yes. We provide documentation, tutorials, and training sessions for teams.',
    },
  ],
  'Accounts & Access': [
    {
      question: 'Can I use Brantial on multiple devices?',
      answer: 'Yes. You can log in from any device with internet access.',
    },
    {
      question: 'Do you support team accounts?',
      answer:
        'Yes. You can add team members, assign roles, and manage permissions.',
    },
    {
      question: 'What happens if I forget my password?',
      answer: 'You can reset it instantly using the password recovery option.',
    },
  ],
};

export function FAQSection() {
  const [activeTab, setActiveTab] = useState<Category>(categories[0]);

  return (
    <section className="overflow-hidden">
      {/* FAQPage JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: Object.keys(faqs).flatMap((category) =>
              faqs[category as Category].map((faq) => ({
                '@type': 'Question',
                name: faq.question,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text:
                    typeof faq.answer === 'string'
                      ? faq.answer
                      : // If answer is React node, render a best-effort text fallback
                        String(faq.answer),
                },
              })),
            ),
          }),
        }}
      />
      <div className="container divide-y">
        <div className="hidden border-x border-b-0 p-7.5 md:block" />

        <div className="bordered-div-padding border-x">
          <h1 className="font-weight-display text-2xl leading-snug tracking-tighter md:text-3xl lg:text-5xl">
            FAQs
          </h1>
          <div className="mt-6 block md:hidden">
            <Select
              value={activeTab}
              onValueChange={(value) => setActiveTab(value as Category)}
            >
              <SelectTrigger className="w-full">
                <SelectValue>{activeTab}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="bordered-div-padding relative hidden border-x md:block">
          <div className="absolute left-full h-[150%] w-[50vw] -translate-y-[90%] overflow-hidden border-y">
            <Meteors
              number={1000}
              angle={65}
              maxDuration={20}
              minDuration={5}
              className="opacity-10 [&>div]:opacity-10"
            />
          </div>
          <Tabs
            value={activeTab}
            onValueChange={(value) => setActiveTab(value as Category)}
            className=""
          >
            <TabsList className="flex gap-3">
              {categories.map((category) => (
                <TabsTrigger key={category} value={category}>
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        <div className="border-x">
          <Accordion type="single" collapsible>
            {faqs[activeTab].map((faq, index) => (
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
