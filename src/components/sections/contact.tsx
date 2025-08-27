import { Mail } from 'lucide-react';
import { FaDiscord, FaGithub, FaXTwitter } from 'react-icons/fa6';

import { PlusSigns } from '@/components/icons/plus-signs';
import { Meteors } from '@/components/magicui/meteors';
import { EXTERNAL_LINKS } from '@/constants/external-links';

const contactOptions = [
  {
    icon: FaDiscord,
    title: 'Discord',
    description: 'Ask questions, share ideas, or just hang out.',
    href: EXTERNAL_LINKS.DISCORD,
  },
  {
    icon: FaGithub,
    title: 'GitHub',
    description: "We're always open to PRs and feature requests.",
    href: EXTERNAL_LINKS.GITHUB,
  },
  {
    icon: FaXTwitter,
    title: 'Twitter/X',
    description: 'Keep up with releases and behind-the-scenes moments.',
    href: EXTERNAL_LINKS.TWITTER,
  },
  {
    icon: Mail,
    title: 'Email us directly',
    description: 'For enterprise pricing, partnerships, or anything else:',
    href: EXTERNAL_LINKS.EMAIL,
  },
];

export function ContactSection() {
  return (
    <section className="container">
      <div className="hidden border border-t-0 p-7.5 md:block" />

      <div className="grid grid-cols-1 items-center divide-y border-x md:grid-cols-2 md:divide-x md:divide-y-0">
        {/* Left Side - Contact Options */}
        <div className="divide-y">
          <div className="bordered-div-padding relative space-y-6 md:space-y-8 lg:space-y-10">
            <PlusSigns className="absolute inset-0 -mt-0.25 hidden !h-[calc(100%+2px)] -translate-x-full border-y md:block" />
            <h1 className="font-weight-display text-2xl leading-snug tracking-tighter md:text-3xl lg:text-5xl">
              Talk to the Scalar team
            </h1>
            <p className="text-muted-foreground mx-auto max-w-[700px] text-sm leading-relaxed md:text-lg lg:text-xl">
              Whether you&apos;re a solo dev, content team, or curious
              contributor—our community is your community.
            </p>
          </div>
          {contactOptions.map((option, index) => (
            <a
              key={index}
              href={option.href}
              target="_blank"
              className="bordered-div-padding hover:bg-muted/30 dark:hover:bg-muted transition-color flex items-center gap-3"
            >
              <option.icon className="size-10 shrink-0 p-2.5" />
              <div>
                <h3 className="text-secondary font-medium">{option.title}</h3>
                <p className="text-muted-foreground mt-1 text-sm">
                  {option.description}
                </p>
              </div>
            </a>
          ))}
        </div>

        {/* Right Side - Chat Example */}
        <div className="bordered-div-padding flex flex-col gap-4 mask-b-from-60% mask-b-to-95%">
          <img
            src="/images/contact/chat-1.webp"
            alt="Chat example"
            width={620}
            height={112}
          />
          <img
            src="/images/contact/chat-2.webp"
            alt="Chat example"
            width={620}
            height={240}
          />
        </div>
      </div>
      <div className="relative hidden overflow-hidden border-x border-t p-20 md:block">
        <Meteors
          number={1000}
          angle={65}
          maxDuration={20}
          minDuration={5}
          className="opacity-10 [&>div]:opacity-10"
        />
      </div>
    </section>
  );
}
