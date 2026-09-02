import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { TableWidthProvider } from "@/components/TableWidthProvider";

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
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=JetBrains+Mono:wght@400&display=swap"
          rel="stylesheet"
        />
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
      <body className="antialiased bg-obsidian text-snow">
        <ThemeProvider>
          <TableWidthProvider>{children}</TableWidthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
