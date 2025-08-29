// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = 'Brantial';
export const SITE_DESCRIPTION =
  'Brantial is an AI-powered platform that helps businesses and individuals automate tasks, analyze data, and optimize workflows with ease. Boost productivity, streamline operations, and scale smarter with Brantial.';

export const SITE_METADATA = {
  title: {
    default: SITE_TITLE,
    template: '%s | Brantial',
  },
  description: SITE_DESCRIPTION,
  keywords: ['Brantial'],
  authors: [{ name: 'Brantial Team' }],
  creator: 'Brantial Team',
  publisher: 'Brantial',
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: '/favicon/favicon.ico', sizes: '48x48' },
      { url: '/favicon/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon/favicon.ico' },
    ],
    apple: [{ url: '/favicon/apple-touch-icon.png', sizes: '180x180' }],
    shortcut: [{ url: '/favicon/favicon.ico' }],
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    siteName: 'Scalar',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Brantial',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ['/og-image.jpg'],
    creator: '@scalar',
  },
};

// Site-level URLs (login/signup) so components can import them from a single place
export const SITE_LOGIN_URL = 'https://dev.brantial.com/login';
export const SITE_SIGNUP_URL = 'https://app.brantial.com/register';
