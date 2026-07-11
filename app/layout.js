import "./globals.css";
import Providers from "@/components/Providers";

export const metadata = {
  title: "Coding Test Tracker",
  description: "53-day DSA fundamentals + NeetCode 150 tracker for FAANG-level coding tests",
};

export const viewport = { width: "device-width", initialScale: 1 };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
