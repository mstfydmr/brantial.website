'use client';
import { useEffect, useState, type ReactNode } from 'react';

import {
  Building2,
  CalendarDays,
  Diamond,
  Globe,
  LineChart,
  Tag,
  Terminal,
  Users,
} from 'lucide-react';
import { FaLinkedin, FaXTwitter } from 'react-icons/fa6';

import { Diamonds } from '@/components/icons/diamonds';
import Logo from '@/components/layout/logo';
import { Button } from '@/components/ui/button';
import { EXTERNAL_LINKS } from '@/constants/external-links';
import { SITE_SIGNUP_URL } from '@/consts';
import { cn } from '@/lib/utils';

type PlanName = 'Starter' | 'Pro' | 'Growth';

type BillingPeriod = 'monthly' | 'annually';

const PRICES: Record<BillingPeriod, Record<PlanName, number>> = {
  monthly: {
    Starter: 59,
    Growth: 149,
    Pro: 299,
  },
  annually: {
    Starter: Math.round((59 * 10) / 12),
    Growth: Math.round((149 * 10) / 12),
    Pro: Math.round((299 * 10) / 12),
  },
};

const BASE_PLANS: Array<{
  name: PlanName;
  features: { name: string; icon: ReactNode }[];
  button: { text: string; href: string; className?: string };
}> = [
  // Starter (left)
  {
    name: 'Starter',
    features: [
      { name: '1 project', icon: <Diamond className="size-5" /> },
      { name: '20 prompts', icon: <Terminal className="size-5" /> },
      { name: '10 competitors', icon: <LineChart className="size-5" /> },
      { name: '10 tags', icon: <Tag className="size-5" /> },
      { name: '0 team members', icon: <Users className="size-5" /> },
      {
        name: 'Improve Low Visibility Agent',
        icon: <LineChart className="size-5" />,
      },
      {
        name: 'AI Models: OpenAI, Claude, Google, Google AI Overview',
        icon: <Globe className="size-5" />,
      },
    ],
    button: {
      text: 'Start 7-Day Trial',
      href: SITE_SIGNUP_URL,
      //   className: 'bg-border hover:bg-border/80 text-foreground',
    },
  },
  // Growth (middle - recommended)
  {
    name: 'Growth',
    features: [
      { name: '3 projects', icon: <Diamond className="size-5" /> },
      { name: '50 prompts', icon: <Terminal className="size-5" /> },
      { name: '50 competitors', icon: <LineChart className="size-5" /> },
      { name: '50 tags', icon: <Tag className="size-5" /> },
      { name: '10 team members', icon: <Users className="size-5" /> },
      {
        name: 'Improve Low Visibility Agent',
        icon: <LineChart className="size-5" />,
      },
      {
        name: 'AI Models: OpenAI, Claude, Google, Perplexity, Grok, Mistral',
        icon: <Globe className="size-5" />,
      },
    ],
    button: {
      text: 'Start 7-Day Trial',
      href: SITE_SIGNUP_URL,
    },
  },
  // Pro (right)
  {
    name: 'Pro',
    features: [
      { name: '10 projects', icon: <Diamond className="size-5" /> },
      { name: '200 prompts', icon: <Terminal className="size-5" /> },
      { name: '100 competitors', icon: <LineChart className="size-5" /> },
      { name: '200 tags', icon: <Tag className="size-5" /> },
      { name: '50 team members', icon: <Users className="size-5" /> },
      {
        name: 'Improve Low Visibility Agent',
        icon: <LineChart className="size-5" />,
      },
      {
        name: 'AI Models: OpenAI, Claude, Google, Perplexity, Grok, Mistral',
        icon: <Globe className="size-5" />,
      },
    ],
    button: {
      text: 'Get Started',
      href: SITE_SIGNUP_URL,
    },
  },
];

const ENTERPRISE_FEATURES: Array<{
  title: string;
  subtitle?: string;
  icon: ReactNode;
}> = [
  {
    title: 'Projects',
    subtitle: 'Unlimited',
    icon: <Diamond className="size-5" />,
  },
  {
    title: 'Prompts',
    subtitle: 'Unlimited',
    icon: <Terminal className="size-5" />,
  },
  {
    title: 'Competitors',
    subtitle: 'Unlimited',
    icon: <LineChart className="size-5" />,
  },
  { title: 'Tags', subtitle: 'Unlimited', icon: <Tag className="size-5" /> },
  {
    title: 'Team members',
    subtitle: 'Unlimited',
    icon: <Users className="size-5" />,
  },
  { title: 'AI Models', subtitle: 'All', icon: <Globe className="size-5" /> },
];

const Footer = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);
  const [period, setPeriod] = useState<BillingPeriod>('annually');

  useEffect(() => {
    setMounted(true);

    // Get initial theme from localStorage, default to 'light' if none exists
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    setTheme(savedTheme || 'light');

    // Listen for theme changes
    const handleStorageChange = () => {
      const newTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
      if (newTheme) {
        setTheme(newTheme);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Listen for direct DOM class changes (for immediate updates)
    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains('dark');
      setTheme(isDark ? 'dark' : 'light');
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      observer.disconnect();
    };
  }, []);

  // Apply footer theme normally: dark => dark, light => light
  const themeClass = mounted
    ? theme === 'dark'
      ? 'dark bg-background text-foreground'
      : 'light bg-background text-foreground'
    : '';

  // Logo inversion matches background: invert on dark background, normal on light
  const logoWordmarkClass = cn(
    'w-[min(100%,400px)] translate-y-1/4 md:translate-y-1/3 md:h-32 md:w-full lg:h-73 opacity-10',
    mounted ? (theme === 'dark' ? 'invert' : 'invert-0') : 'invert-0',
  );

  // Build plans with dynamic prices based on selected period
  const FEATURES = BASE_PLANS.map((plan) => ({
    title: plan.name,
    description:
      period === 'annually' ? (
        <>
          ${PRICES[period][plan.name]}/mo •{' '}
          <span className="text-muted-foreground text-xs">Billed Annually</span>
        </>
      ) : (
        `$${PRICES[period][plan.name]}/mo`
      ),
    features: plan.features,
    button: plan.button,
  }));

  return (
    <footer id="pricing" className={cn('overflow-hidden', themeClass)}>
      {/* Pricing Section */}
      <div className="container">
        <div className="bordered-div-padding flex flex-col items-center justify-between border-x md:flex-row">
          <h2 className="lg:text-4xxl font-weight-display mt-6 text-xl md:mt-14 md:text-3xl lg:mt-40">
            Start free. Scale confidently.
          </h2>
          <div className="mt-10 md:mt-46">
            <div className="flex items-center gap-1 rounded-md border p-1">
              <button
                type="button"
                aria-pressed={period === 'monthly'}
                onClick={() => setPeriod('monthly')}
                className={cn(
                  'rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
                  period === 'monthly'
                    ? 'bg-secondary text-secondary-foreground'
                    : 'hover:bg-muted/20',
                )}
              >
                Monthly
              </button>
              <button
                type="button"
                aria-pressed={period === 'annually'}
                onClick={() => setPeriod('annually')}
                className={cn(
                  'rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
                  period === 'annually'
                    ? 'bg-secondary text-secondary-foreground'
                    : 'hover:bg-muted/20',
                )}
              >
                Annually
              </button>
            </div>
          </div>
        </div>

        <div className="grid divide-y border md:grid-cols-3 md:divide-x md:divide-y-0">
          {FEATURES.map((plan, index) => (
            <div
              key={index}
              className={cn(
                'bordered-div-padding relative flex flex-col gap-6 md:gap-10',
              )}
            >
              {index === 1 && (
                <Diamonds className="absolute top-0 left-full -mt-0.25 hidden !h-[calc(100%+2px)] border-y md:block" />
              )}

              {index === 1 && (
                <div className="bg-secondary text-secondary-foreground absolute top-0 right-0 px-3 py-2.5 text-sm leading-none font-medium">
                  Most popular
                </div>
              )}
              <div>
                <h3 className="font-weight-display text-lg md:text-2xl lg:text-3xl">
                  {plan.title}
                </h3>
                <p className="font-weight-display mt-6 text-base md:text-xl">
                  {plan.description}
                </p>
              </div>

              <ul className="space-y-6">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-2">
                    <span className="flex-shrink-0">{feature.icon}</span>
                    <span className="text-muted-foreground font-medium">
                      {feature.name}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                asChild
                className={cn('mt-auto mb-0 w-fit', plan.button.className)}
              >
                <a
                  href={plan.button.href}
                  target={
                    plan.button.href.startsWith('http') ? '_blank' : undefined
                  }
                  rel={
                    plan.button.href.startsWith('http')
                      ? 'noopener noreferrer'
                      : undefined
                  }
                >
                  {plan.button.text}
                </a>
              </Button>
            </div>
          ))}
        </div>

        {/* Enterprise Row */}
        <div className="border-x border-b">
          <div className="bordered-div-padding grid gap-10 md:grid-cols-12">
            <div className="flex flex-col justify-between gap-6 md:col-span-4 lg:col-span-3">
              <div className="flex items-center gap-4">
                <div className="bg-muted/30 flex h-12 w-12 items-center justify-center rounded-xl">
                  <Building2 className="size-5" />
                </div>
                <div>
                  <h3 className="font-weight-display text-2xl md:text-3xl">
                    Enterprise
                  </h3>
                  <p className="mt-2 text-sm opacity-80 md:text-base">
                    Best for enterprise businesses
                  </p>
                </div>
              </div>
              <Button asChild variant="secondary" className="w-fit">
                <a href="/contact">
                  <span className="inline-flex items-center gap-2">
                    <CalendarDays className="size-4" />
                    Let's Talk
                  </span>
                </a>
              </Button>
            </div>

            <div className="flex justify-end md:col-span-8 lg:col-span-9">
              <div className="grid grid-cols-3 gap-x-6 gap-y-4 md:max-w-[760px] md:gap-x-8 md:gap-y-5 lg:max-w-[920px] lg:gap-x-10 lg:gap-y-6">
                {ENTERPRISE_FEATURES.map((feature, index) => (
                  <div key={index} className="relative space-y-0.5 p-2 md:p-3">
                    <div className="flex items-center gap-2 text-sm leading-snug font-medium">
                      <span className="flex-shrink-0">{feature.icon}</span>
                      {feature.title}
                    </div>
                    {feature.subtitle && (
                      <div className="font-weight-display text-base opacity-40">
                        {feature.subtitle}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Social and Status Section */}
        <div className="flex flex-col justify-between border-x border-b md:flex-row">
          <div className="bordered-div-padding flex items-center space-x-3">
            <a
              href={EXTERNAL_LINKS.TWITTER}
              className="px-3 py-2.5 transition-opacity hover:opacity-80"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <FaXTwitter className="size-5" />
            </a>
            <a
              href={EXTERNAL_LINKS.LINKEDIN}
              className="px-3 py-2.5 transition-opacity hover:opacity-80"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="size-5" />
            </a>
          </div>
          <div className="bordered-div-padding flex items-center border-t text-[#00A656] md:border-t-0">
            <span
              className={cn(
                'me-3 h-2 w-2 animate-pulse rounded-full bg-[#00A656]',
              )}
            ></span>
            <span className="font-medium">All systems operational</span>
          </div>
        </div>

        {/* Legal Links Section */}
        <div className="bordered-div-padding text-muted-foreground flex items-center justify-center space-x-6 border-x border-b text-sm">
          <a
            href="/privacy-policy"
            className="hover:text-foreground transition-opacity hover:opacity-80"
          >
            Privacy Policy
          </a>
          <span className="text-border">•</span>
          <a
            href="/terms-of-service"
            className="hover:text-foreground transition-opacity hover:opacity-80"
          >
            Terms of Service
          </a>
        </div>

        {/* Large Logo */}
        <Logo
          className="justify-center border-x"
          iconClassName="hidden"
          wordmarkClassName={logoWordmarkClass}
        />
      </div>
    </footer>
  );
};

export default Footer;
