import "../styles.css";
import { IBM_Plex_Mono, Space_Grotesk } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
  weight: ["400", "500", "700"]
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-ibm-plex-mono",
  weight: ["400", "500"]
});

const defaultSiteUrl = "https://reactilities.dev";
const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? defaultSiteUrl;
const siteUrl = configuredSiteUrl.endsWith("/")
  ? configuredSiteUrl.slice(0, -1)
  : configuredSiteUrl;

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: "Reactilities - 52+ React Hooks and Utilities",
  description:
    "Reactilities is a TypeScript-first utility library with 52+ React hooks, lifecycle helpers, and utilities.",
  keywords: [
    "react hooks",
    "react utility library",
    "typescript hooks",
    "useDebounce",
    "useLocalStorage",
    "useToggle",
    "frontend utilities",
    "reactilities"
  ],
  authors: [{ name: "Petar Basic" }],
  alternates: {
    canonical: "/"
  },
  openGraph: {
    type: "website",
    url: "/",
    title: "Reactilities - 52+ React Hooks and Utilities",
    description:
      "Comprehensive React hook library with SSR-safe utilities, TypeScript support, and interactive examples.",
    images: [
      {
        url: `${siteUrl}/og-image.svg`,
        width: 1200,
        height: 630,
        alt: "Reactilities"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Reactilities - 52+ React Hooks and Utilities",
    description:
      "TypeScript-first React hooks and helpers with zero dependencies and strong test coverage.",
    images: [`${siteUrl}/og-image.svg`]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1
    }
  }
};

export const viewport = {
  themeColor: "#0b1220"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} ${ibmPlexMono.variable}`}>
        <div className="bg-noise" aria-hidden="true"></div>
        <div className="bg-glow" aria-hidden="true"></div>
        {children}
      </body>
    </html>
  );
}
