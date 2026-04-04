import type { Metadata } from 'next'
import { Sora, Inter, JetBrains_Mono } from 'next/font/google'
import { SmoothScroll } from '@/components/ui/SmoothScroll'
import './globals.css'

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Webco — Landing Pages B2B qui Convertissent',
    template: '%s | Webco',
  },
  description:
    'Agence specialisee dans la creation de landing pages B2B a haute conversion. Design strategique, copywriting oriente resultats, A/B testing.',
  metadataBase: new URL('https://client-webco.vercel.app'),
  openGraph: {
    title: 'Webco — Landing Pages B2B qui Convertissent',
    description:
      'Agence specialisee dans la creation de landing pages B2B a haute conversion. Design strategique, copywriting oriente resultats, A/B testing.',
    url: 'https://client-webco.vercel.app',
    siteName: 'Webco',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Webco — Landing Pages B2B qui Convertissent',
    description:
      'Agence specialisee dans la creation de landing pages B2B a haute conversion. Design strategique, copywriting oriente resultats, A/B testing.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="fr"
      className={`${sora.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <body className="noise-overlay min-h-screen bg-bg text-text font-body overflow-x-hidden">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-neon-violet focus:text-white focus:rounded-lg"
        >
          Aller au contenu principal
        </a>
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  )
}
