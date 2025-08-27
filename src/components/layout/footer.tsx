'use client';
import { useEffect, useState } from 'react';

import {
  FileCode,
  Globe,
  LineChart,
  Lock,
  Server,
  Terminal,
  Users,
} from 'lucide-react';
import { FaDiscord, FaGithub, FaLinkedin, FaXTwitter } from 'react-icons/fa6';

import { Diamonds } from '@/components/icons/diamonds';
import Logo from '@/components/layout/logo';
import { Button } from '@/components/ui/button';
import { EXTERNAL_LINKS } from '@/constants/external-links';
import { cn } from '@/lib/utils';

const FEATURES = [
  {
    title: 'Open Source',
    description: '0$ / forever',
    features: [
      {
        name: 'Self-host on your own infrastructure',
        icon: <Server className="size-5" />,
      },
      {
        name: 'Full access to the Scalar CMS core',
        icon: <FileCode className="size-5" />,
      },
      {
        name: 'GitHub community support',
        icon: <FaGithub className="size-5" />,
      },
      {
        name: 'Ideal for developers and internal tools',
        icon: <Terminal className="size-5" />,
      },
    ],
    button: {
      text: 'View on GitHub',
      href: EXTERNAL_LINKS.GITHUB_REPO,
      className: 'bg-border hover:bg-border/80 text-foreground',
    },
  },
  {
    title: 'Cloud',
    description: 'From $29 / month',
    features: [
      {
        name: 'Fully managed infrastructure',
        icon: <Server className="size-5" />,
      },
      {
        name: 'Realtime collaboration & autosave',
        icon: <Users className="size-5" />,
      },
      {
        name: 'Role-based access & team permissions',
        icon: <Lock className="size-5" />,
      },
      {
        name: 'Built-in CDN for media delivery',
        icon: <Globe className="size-5" />,
      },
      {
        name: 'Email support & usage analytics',
        icon: <LineChart className="size-5" />,
      },
    ],
    button: {
      text: 'Start Free Trial',
      href: '/signup',
    },
  },
];

const Footer = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

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

  // Prevent hydration mismatch by using a consistent theme class until mounted
  // Footer is in light mode when dark theme is applied (inverted behavior)
  const themeClass =
    mounted && theme === 'dark'
      ? 'light bg-foreground text-background [&_*]:border-border/30'
      : 'dark bg-background text-foreground';

  // Logo should be inverted when footer has light background (dark theme)
  // and not inverted when footer has dark background (light theme)
  const logoWordmarkClass = cn(
    'w-[min(100%,400px)] translate-y-1/4 md:translate-y-1/3 md:h-32 md:w-full lg:h-73 opacity-10',
    mounted && theme === 'dark' ? 'invert-0' : 'invert',
  );

  return (
    <footer className={cn('overflow-hidden', themeClass)}>
      {/* Pricing Section */}
      <div className="container">
        <div className="bordered-div-padding border-x">
          <h2 className="lg:text-4xxl font-weight-display mt-6 text-xl md:mt-14 md:text-3xl lg:mt-40">
            Start free. Scale confidently.
          </h2>
        </div>

        <div className="grid divide-y border md:grid-cols-2 md:divide-x md:divide-y-0">
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

        {/* Social and Status Section */}
        <div className="flex flex-col justify-between border-x border-b md:flex-row">
          <div className="bordered-div-padding flex items-center space-x-3">
            <a
              href={EXTERNAL_LINKS.DISCORD}
              className="px-3 py-2.5 transition-opacity hover:opacity-80"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Discord"
            >
              <FaDiscord className="size-5" />
            </a>
            <a
              href={EXTERNAL_LINKS.GITHUB}
              className="px-3 py-2.5 transition-opacity hover:opacity-80"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <FaGithub className="size-5" />
            </a>
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
