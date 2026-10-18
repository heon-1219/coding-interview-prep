import "./globals.css";
import { Inter } from "next/font/google";
import Providers from "@/components/Providers";
import OpenInBrowser from "@/components/OpenInBrowser";

// Apple devices render SF Pro (system font); Inter stands in everywhere else.
// Not preloaded, so Apple devices never download it.
const inter = Inter({ subsets: ["latin"], display: "swap", preload: false, variable: "--font-inter" });

export const metadata = {
  title: "Coding Test Tracker",
  description: "Intense DSA fundamentals + NeetCode 250 tracker with spaced review and per-company prep for FAANG-level coding tests",
};

export const viewport = { width: "device-width", initialScale: 1, viewportFit: "cover", themeColor: "#05061A" };

// Galaxy (dark) is the theme; daylight only if the user picked it. Runs before
// first paint so there's no flash.
const THEME_INIT = `try{if(localStorage.getItem('ctt-sky')==='light'){document.documentElement.setAttribute('data-theme','light');var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute('content','#EEF0FA');}}catch(e){}`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark" className={inter.variable} suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />
        {/* fixed night sky behind everything: nebulae, the galactic band, two star layers */}
        <div className="sky" aria-hidden="true"><i className="sky__band" /><i className="sky__stars" /><i className="sky__stars far" /></div>
        <OpenInBrowser />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
