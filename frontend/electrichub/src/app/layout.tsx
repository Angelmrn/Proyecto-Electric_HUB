import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import './styles.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Electric-HUB",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div>{children}</div>
        </body>
    </html>
  );
}
