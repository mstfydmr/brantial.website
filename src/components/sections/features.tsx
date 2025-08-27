import { Images, Layers, ToggleLeft, Users2 } from 'lucide-react';

import { PlusSigns } from '@/components/icons/plus-signs';
import { cn } from '@/lib/utils';
const features = [
  {
    icon: Layers,
    title: (
      <>
        Schema
        <br />
        Builder
      </>
    ),
    description: 'Design content structures your way.',
    subDescription:
      'Scalar CMS gives you full control over content with a streamlined, API-first experience — perfect for teams who want speed without sacrificing flexibility.',
    className: '!pb-0',
    images: [
      {
        src: '/images/landing/feature-1.webp',
        alt: 'Schema Builder',
        width: 700,
        height: 320,
      },
    ],
  },
  {
    icon: Users2,
    title: 'Real Time Collaboration',
    description: 'Built for content teams.',
    subDescription:
      'Draft, review, and publish content with confidence. Autosave, rich text editing, role-based permissions, and revision history come standard.',
    className: '!pb-0',
    images: [
      {
        src: '/images/landing/feature-2-1.webp',
        alt: 'Real Time Collaboration',
        width: 620,
        height: 108,
      },
      {
        src: '/images/landing/feature-2-2.webp',
        alt: 'Real Time Collaboration',
        width: 620,
        height: 108,
      },
      {
        src: '/images/landing/feature-2-3.webp',
        alt: 'Real Time Collaboration',
        width: 620,
        height: 108,
      },
    ],
  },
  {
    icon: Images,
    title: 'Asset Management',
    description: 'Organize your media like a pro.',
    subDescription:
      'Upload, crop, tag, and reuse images, videos, and docs with our sleek asset manager. Automatically optimizes files and handles CDN delivery.',
  },
  {
    icon: ToggleLeft,
    title: 'Granular Permissions',
    description: 'Control who does what.',
    subDescription:
      'Create roles for editors, developers, and guests with precision. Lock down fields, models, or even specific actions.',
  },
];

export function Features() {
  return (
    <section className="container">
      <div className="grid grid-cols-1 border border-t-0 md:grid-cols-2">
        {features.map((feature, index) => (
          <div
            key={index}
            className={cn(
              'bordered-div-padding relative space-y-8',
              index == 0 && 'border-b md:border-e',
              index == 1 && 'border-b md:border-b-0',
              index == 3 && 'border-t md:border-s',
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
