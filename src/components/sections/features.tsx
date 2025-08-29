import { Images, Layers, ToggleLeft, Users2 } from 'lucide-react';

import { PlusSigns } from '@/components/icons/plus-signs';
import { cn } from '@/lib/utils';
const features = [
  {
    icon: Layers,
    title: 'AI Search Visibility',
    description: 'Stay Visible in Generative AI Answers',
    subDescription:
      'Ensure your brand appears in AI-driven search results and LLM answers. We optimize your content so customers discover you, not your competitors.',
    // className: '!pb-0',
    // images: [
    //   {
    //     src: '/images/landing/feature-1.webp',
    //     alt: 'Schema Builder',
    //     width: 700,
    //     height: 320,
    //   },
    // ],
  },
  {
    icon: Users2,
    title: 'Data-Driven Insights',
    description: 'Understand Real User Prompts at Scale',
    subDescription:
      'Go beyond keywords. Analyze millions of real conversations to uncover intent, trends, and opportunities — powering smarter visibility strategies.',
    // className: '!pb-0',
    // images: [
    //   {
    //     src: '/images/landing/feature-2-1.webp',
    //     alt: 'Real Time Collaboration',
    //     width: 620,
    //     height: 108,
    //   },
    //   {
    //     src: '/images/landing/feature-2-2.webp',
    //     alt: 'Real Time Collaboration',
    //     width: 620,
    //     height: 108,
    //   },
    //   {
    //     src: '/images/landing/feature-2-3.webp',
    //     alt: 'Real Time Collaboration',
    //     width: 620,
    //     height: 108,
    //   },
    // ],
  },
  {
    icon: Images,
    title: 'LLM Optimization',
    description: 'Make Your Content AI-Readable and Citable',
    subDescription:
      'From schema markup to contextual optimization, we structure your content so Large Language Models recognize and cite your brand in answers.',
  },
  {
    icon: ToggleLeft,
    title: 'Future-Proof Strategy',
    description: 'Thrive Beyond Traditional SEO',
    subDescription:
      'As organic search traffic declines, we help you adapt with GEO (Generative Engine Optimization) and LLMO, securing sustainable visibility in the AI era.',
  },
  {
    icon: ToggleLeft,
    title: 'Analytics & Tracking',
    description: 'Measure AI Search Visibility, Prove Impact',
    subDescription:
      'Track how often your brand appears in AI-driven answers, which pages get cited, and what converts. We turn prompts and citations into clear KPIs—impressions, inclusion rate, referral clicks, and assisted conversions—so you can double down on what works.',
  },
  {
    icon: ToggleLeft,
    title: 'Speed & Adaptability',
    description: 'Ship Fast, Stay Ahead of AI Changes',
    subDescription:
      'The AI search ecosystem shifts weekly. We iterate content, schema, and entity signals rapidly, test across models, and roll out updates without touching your core stack—keeping your brand visible as algorithms evolve.',
  },
];

export function Features() {
  return (
    <section className="container overflow-x-clip">
      <div className="grid grid-cols-1 border border-t-0 md:grid-cols-2">
        {features.map((feature, index) => (
          <div
            key={index}
            className={cn(
              'bordered-div-padding relative space-y-8',
              index == 0 && 'border-b md:border-e',
              index == 1 && 'border-b md:border-b-0',
              index == 3 && 'border-t md:border-s',
              index == 4 && 'border-t',
              index == 5 && 'border-t md:border-s',
              feature.className,
            )}
          >
            {index === 0 && (
              // Height is 100% + 2px to account for parent border not being included in the calculation
              <PlusSigns className="absolute inset-0 -mt-0.25 hidden !h-[calc(100%+2px)] -translate-x-full border-y md:block" />
            )}
            <div className="space-y-4 md:space-y-6">
              <div className="space-y-4">
                <h2 className="text-muted-foreground flex items-center gap-2 text-sm leading-snug font-medium md:text-base">
                  <feature.icon className="size-5" />
                  {feature.title}
                </h2>
                <h3 className="text-foreground font-weight-display leading-snug md:text-xl">
                  {feature.description}
                </h3>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed md:text-base">
                {feature.subDescription}
              </p>
            </div>

            {feature.images && (
              <div className="flex flex-col gap-4 mask-b-from-30% mask-b-to-95%">
                {feature.images.map((image, index) => (
                  <img
                    key={index}
                    src={image.src}
                    alt={''}
                    width={image.width}
                    height={image.height}
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
