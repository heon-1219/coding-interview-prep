import "./globals.css";
import Providers from "@/components/Providers";
import OpenInBrowser from "@/components/OpenInBrowser";

export const metadata = {
  title: "Coding Test Tracker",
  description: "Intense DSA fundamentals + NeetCode 250 tracker with spaced review and per-company prep for FAANG-level coding tests",
};

export const viewport = { width: "device-width", initialScale: 1 };

// Applies the saved (or system) theme before first paint to avoid a flash.
const THEME_INIT = `try{var t=localStorage.getItem('ctt-theme');if(t!=='dark'&&t!=='light'){t=(window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches)?'dark':'light';}document.documentElement.setAttribute('data-theme',t);}catch(e){}`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />
        <OpenInBrowser />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
