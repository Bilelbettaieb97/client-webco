import type { Metadata } from 'next'
import { Space_Grotesk, Inter } from 'next/font/google'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Webco | Agence Web Premium',
    template: '%s | Webco',
  },
  description:
    'Agence web premium specialisee dans la creation de sites performants, modernes et sur-mesure. Sites vitrines, landing pages, e-commerce et applications web.',
  metadataBase: new URL('https://client-webco.vercel.app'),
  openGraph: {
    title: 'Webco | Agence Web Premium',
    description:
      'Nous creons des sites web qui convertissent. Design haut de gamme, performance optimale, SEO integre.',
    url: 'https://client-webco.vercel.app',
    siteName: 'Webco',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Webco | Agence Web Premium',
    description:
      'Nous creons des sites web qui convertissent. Design haut de gamme, performance optimale, SEO integre.',
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
      className={`${spaceGrotesk.variable} ${inter.variable} antialiased`}
    >
      <body className="min-h-screen bg-bg text-text font-body overflow-x-hidden">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-neon-violet focus:text-white focus:rounded-lg"
        >
          Aller au contenu principal
        </a>
        {children}
      </body>
    </html>
  )
}
