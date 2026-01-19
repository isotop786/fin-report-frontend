import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "AI Financial Report Generator | Fortune 500 Company Analysis",
    template: "%s | AI Financial Report Generator",
  },
  description: "Generate comprehensive financial reports for Fortune 500 companies using AI-powered analysis. Get detailed insights on company performance, market outlook, and financial health powered by CrewAI.",
  keywords: [
    "financial report generator",
    "Fortune 500 analysis",
    "AI financial analysis",
    "company financial reports",
    "stock analysis",
    "business intelligence",
    "CrewAI",
    "automated financial reports",
    "market analysis",
    "investment research",
  ],
  authors: [{ name: "Maruf" }],
  creator: "Maruf",
  publisher: "Maruf",
  metadataBase: new URL("https://yourwebsite.com"), // Replace with your actual domain
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://fin-report-frontend.vercel.app/", // Replace with your actual domain
    title: "AI Financial Report Generator | Fortune 500 Company Analysis",
    description: "Generate comprehensive financial reports for Fortune 500 companies using AI-powered analysis. Get detailed insights on company performance, market outlook, and financial health.",
    siteName: "AI Financial Report Generator",
    images: [
      {
        url: "/og-image.jpg", // Add your Open Graph image
        width: 1200,
        height: 630,
        alt: "AI Financial Report Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Financial Report Generator | Fortune 500 Company Analysis",
    description: "Generate comprehensive financial reports for Fortune 500 companies using AI-powered analysis.",
    images: ["/twitter-image.jpg"], // Add your Twitter card image
    creator: "@marufislam77", // Replace with your Twitter handle
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code", // Add your Google Search Console verification code
    // yandex: "your-yandex-verification-code",
    // bing: "your-bing-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#0f172a" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}