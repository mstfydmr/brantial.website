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
  | 'Developers'
  | 'Content Editing & Workflow'
  | 'Cloud & Hosting'
  | 'Community & Support';

const categories: Category[] = [
  'Developers',
  'Content Editing & Workflow',
  'Cloud & Hosting',
  'Community & Support',
];

type FAQ = {
  question: string;
  answer: React.ReactNode;
};

const faqs: Record<Category, FAQ[]> = {
  Developers: [
    {
      question: 'How do I install Scalar CMS in my project?',
      answer: (
        <>
          You can install Scalar with a single CLI command. It supports popular
          frameworks like Next.js, Nuxt, SvelteKit, and more. Use our official
          SDK or connect directly to the GraphQL API. See the{' '}
          <a href="#" className="text-primary underline">
            Quickstart Guide
          </a>{' '}
          for full details.
        </>
      ),
    },
    {
      question: 'Is Scalar open source?',
      answer:
        'Yes, Scalar is fully open source under the MIT license. You can view, modify, and contribute to the codebase on GitHub. Our cloud offering provides additional enterprise features, but the core CMS is free to use.',
    },
    {
      question: 'What API types does Scalar support?',
      answer:
        'Scalar provides both GraphQL and REST APIs. The GraphQL API offers a flexible query language with strong typing, while the REST API provides simple HTTP endpoints for common operations. Both APIs are fully documented with SDKs available in multiple languages.',
    },
    {
      question: 'Can I define content models with code?',
      answer:
        'Yes, Scalar supports code-first content modeling. You can define your schemas using TypeScript, allowing for version control and type safety. This approach works well with CI/CD pipelines and makes it easy to maintain consistent content structures across environments.',
    },
  ],
  'Content Editing & Workflow': [
    {
      question: 'Can I create custom content workflows?',
      answer:
        'Yes, Scalar allows you to define custom workflows for content creation, review, and publishing. You can set up multiple stages with granular permissions for different team members.',
    },
    {
      question: 'Does Scalar support real-time collaboration?',
      answer:
        'Yes, our Cloud plan includes real-time collaboration features, allowing multiple team members to work on content simultaneously with live updates and conflict resolution.',
    },
  ],
  'Cloud & Hosting': [
    {
      question: 'What are the differences between self-hosted and cloud?',
      answer:
        'The self-hosted version gives you complete control over your infrastructure but requires you to manage hosting, backups, and scaling. The Cloud version is fully managed with additional features like real-time collaboration, role-based access controls, and built-in CDN.',
    },
    {
      question: 'Can I migrate from self-hosted to cloud later?',
      answer:
        'Yes, we provide migration tools to easily transfer your content and settings from a self-hosted Scalar instance to our cloud platform.',
    },
  ],
  'Community & Support': [
    {
      question: 'Where can I get help with Scalar?',
      answer:
        'For the open-source version, we have an active community on Discord and GitHub. Cloud customers receive email support and access to our knowledge base. Enterprise plans include dedicated support channels and SLAs.',
    },
    {
      question: 'How can I contribute to Scalar?',
      answer:
        'We welcome contributions! You can contribute code, report bugs, suggest features, or help improve our documentation. Check our GitHub repository for contribution guidelines.',
    },
  ],
};

export function FAQSection() {
  const [activeTab, setActiveTab] = useState<Category>(categories[0]);

  return (
    <section className="overflow-hidden">
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
