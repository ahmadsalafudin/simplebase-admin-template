import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { TableWidthProvider } from "@/components/TableWidthProvider";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Simplebase — Admin Dashboard",
  description: "Simple admin dashboard template styled after Supabase's design system.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={outfit.variable}>
      <head>
        {/* Apply the saved theme + layout width before paint to avoid a flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try {
              var t = localStorage.getItem('theme');
              if (t === 'light') document.documentElement.classList.add('light');
              var w = localStorage.getItem('tableWidth');
              if (w === 'wide') document.documentElement.classList.add('wide-layout');
            } catch (e) {}`,
          }}
        />
      </head>
      <body className={`${outfit.className} antialiased bg-obsidian text-snow`}>
        <ThemeProvider>
          <TableWidthProvider>{children}</TableWidthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
