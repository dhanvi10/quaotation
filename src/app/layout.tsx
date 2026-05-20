import type { Metadata, Viewport } from "next";
import { Baloo_Bhai_2, Noto_Sans_Gujarati, Poppins } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import "./globals.css";

const baloo = Baloo_Bhai_2({
  subsets: ["gujarati", "latin"],
  variable: "--font-baloo",
  weight: ["600", "700", "800"],
  display: "swap",
});

const notoGujarati = Noto_Sans_Gujarati({
  subsets: ["gujarati"],
  variable: "--font-noto-gujarati",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "સુખનાથ ઈલેક્ટ્રીકલ | Premium Quotation Builder",
  description: "Premium Gujarati electrical quotation generator",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="gu" suppressHydrationWarning>
      <body
        className={`${baloo.variable} ${notoGujarati.variable} ${poppins.variable} font-sans antialiased`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
