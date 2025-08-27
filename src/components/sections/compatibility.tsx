'use client';

import { useEffect, useRef, useState } from 'react';

import { Check, Code, Copy } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import * as shiki from 'shiki';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useMediaQuery } from '@/hooks/use-media-query';
import { cn } from '@/lib/utils';

const frameworks = [
  {
    name: 'Next.js / React',
    lang: 'tsx',
    code: `// app/lib/scalar.ts
    
import { createClient } from '@scalar/api-client';

export const scalar = createClient({
  projectId: process.env.NEXT_PUBLIC_SCALAR_PROJECT_ID,
  apiKey: process.env.SCALAR_API_KEY,
});`,
  },
  {
    name: 'Nuxt / Vue',
    lang: 'vue',
    code: `<!-- plugins/scalar.ts -->

<script lang="ts">
import { createClient } from '@scalar/api-client';

export default defineNuxtPlugin(() => {
  const scalar = createClient({
    projectId: process.env.NUXT_SCALAR_PROJECT_ID,
    apiKey: process.env.NUXT_SCALAR_API_KEY,
  });

  return { provide: { scalar } };
});
</script>`,
  },
  {
    name: 'SvelteKit',
    lang: 'svelte',
    code: `<!-- lib/scalar.ts -->

<script lang="ts">
import { createClient } from '@scalar/api-client';

export const scalar = createClient({
  projectId: import.meta.env.VITE_SCALAR_PROJECT_ID,
  apiKey: import.meta.env.SCALAR_API_KEY,
});
</script>`,
  },
  {
    name: 'Astro',
    lang: 'astro',
    code: `---
// lib/scalar.ts

import { createClient } from '@scalar/api-client';

export const scalar = createClient({
  projectId: import.meta.env.SCALAR_PROJECT_ID,
  apiKey: import.meta.env.SCALAR_API_KEY,
});
---`,
  },
  {
    name: 'Shopify',
    lang: 'tsx',
    code: `// web/lib/scalar.ts

import { createClient } from '@scalar/api-client';

export const scalar = createClient({
  projectId: process.env.SCALAR_PROJECT_ID,
  apiKey: process.env.SCALAR_API_KEY,
});`,
  },
  {
    name: 'Stripe',
    lang: 'tsx',
    code: `// lib/scalar.ts

import { createClient } from '@scalar/api-client';

export const scalar = createClient({
  projectId: process.env.SCALAR_PROJECT_ID,
  apiKey: process.env.SCALAR_API_KEY,
});`,
  },
];

export function Compatibility() {
  const [activeTab, setActiveTab] = useState(frameworks[0].name);
  const [highlightedCode, setHighlightedCode] = useState<{
    light: Record<string, string>;
    dark: Record<string, string>;
  }>({
    light: {},
    dark: {},
  });
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const { isAtLeast } = useMediaQuery();
  const isMobile = !isAtLeast('md');

  useEffect(() => {
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

  useEffect(() => {
    async function highlightCode() {
      try {
        const highlighter = await shiki.createHighlighter({
          themes: ['github-dark-high-contrast', 'github-light-default'],
          langs: [
            'typescript',
            'tsx',
            'vue',
            'astro',
            'svelte',
            'javascript',
            'html',
          ],
        });

        const lightHighlighted: Record<string, string> = {};
        const darkHighlighted: Record<string, string> = {};

        for (const framework of frameworks) {
          lightHighlighted[framework.name] = highlighter.codeToHtml(
            framework.code,
            {
              lang: framework.lang,
              theme: 'github-light-default',
            },
          );

          darkHighlighted[framework.name] = highlighter.codeToHtml(
            framework.code,
            {
              lang: framework.lang,
              theme: 'github-dark-high-contrast',
            },
          );
        }

        setHighlightedCode({
          light: lightHighlighted,
          dark: darkHighlighted,
        });
      } catch (error) {
        console.error('Failed to highlight code:', error);
      } finally {
        setIsLoading(false);
      }
    }

    highlightCode();
  }, []); // Remove theme dependency

  // Get the current highlighted code based on theme
  const currentHighlightedCode =
    theme === 'dark' ? highlightedCode.dark : highlightedCode.light;

  return (
    <section className="container">
      <div className="bordered-div-padding border border-t-0">
        <div className="space-y-4">
          <h3 className="text-muted-foreground flex items-center gap-2 text-sm leading-snug font-medium md:text-base">
            <Code className="size-5" />
            Compatibility
          </h3>
          <h2 className="text-foreground font-weight-display leading-snug md:text-xl">
            Works out of the box with:
          </h2>
        </div>

        <div className="mt-6 gap-6">
          {isMobile ? (
            <Select value={activeTab} onValueChange={setActiveTab}>
              <SelectTrigger className="w-full">
                <SelectValue>{activeTab}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                {frameworks.map((framework) => (
                  <SelectItem key={framework.name} value={framework.name}>
                    {framework.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="flex gap-3">
                {frameworks.map((framework) => (
                  <TabsTrigger key={framework.name} value={framework.name}>
                    {framework.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          )}

          <div className="mt-4">
            {isLoading ? (
              <Card className="relative overflow-hidden !p-0">
                <CardContent className="!p-0">
                  <div className="flex h-92 items-center justify-center">
                    <div className="text-muted-foreground">Loading...</div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              frameworks.map(
                (framework) =>
                  framework.name === activeTab && (
                    <Card
                      key={framework.name}
                      className="relative overflow-hidden !p-0"
                    >
                      <CardContent className="!p-0">
                        <div
                          dangerouslySetInnerHTML={{
                            __html:
                              currentHighlightedCode[framework.name] || '',
                          }}
                          className="h-89 overflow-x-auto overflow-y-auto text-sm [&_pre]:m-0 [&_pre]:h-89 [&_pre]:bg-transparent [&_pre]:p-4 [&_pre]:whitespace-pre-wrap"
                        />
                        <CopyButton
                          text={framework.code}
                          className="absolute top-4 right-4"
                        />
                      </CardContent>
                    </Card>
                  ),
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

interface CopyButtonProps {
  text: string;
  className?: string;
}

function CopyButton({ text, className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>(undefined);

  const handleCopy = async () => {
    if (copied) return;

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);

      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <Button
      aria-label="Copy code"
      onClick={handleCopy}
      variant="ghost"
      size="icon"
      className={cn(className)}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={copied ? 'check' : 'copy'}
          initial={{ opacity: 0, y: 2 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -2 }}
          transition={{ duration: 0.15 }}
        >
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
        </motion.div>
      </AnimatePresence>
    </Button>
  );
}
