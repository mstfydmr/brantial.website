'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';

const LOGO_DEV_TOKEN = 'pk_AVQ085F0QcOVwbX7HOMcUA';

type FaviconProps = {
  domain: string;
  size?: number; // px
  className?: string;
  alt?: string;
  rounded?: boolean;
};

export function Favicon({
  domain,
  size = 20,
  className,
  alt,
  rounded = true,
}: FaviconProps) {
  const [errored, setErrored] = React.useState(false);

  const url = `https://img.logo.dev/${encodeURIComponent(
    domain,
  )}?token=${LOGO_DEV_TOKEN}`;

  if (!domain) return null;

  if (errored) {
    const letter = domain.charAt(0).toUpperCase();
    return (
      <div
        className={cn(
          'bg-muted text-foreground/70 inline-flex items-center justify-center',
          rounded ? 'rounded' : 'rounded-[4px]',
          className,
        )}
        style={{
          width: size,
          height: size,
          fontSize: Math.max(10, size * 0.55),
        }}
        aria-label={alt || `${domain} favicon`}
        title={domain}
      >
        {letter}
      </div>
    );
  }

  return (
    <img
      src={url}
      alt={alt || `${domain} favicon`}
      width={size}
      height={size}
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      className={cn(rounded ? 'rounded' : 'rounded-[4px]', className)}
      onError={() => setErrored(true)}
    />
  );
}

export default Favicon;
