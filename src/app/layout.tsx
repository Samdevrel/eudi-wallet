import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EUDI Wallet | @samdevrel",
  description: "EU Digital Identity Wallet with Verifiable Credentials. Self-sovereign identity for the digital age.",
  keywords: ["EUDI", "eIDAS", "digital identity", "verifiable credentials", "Estonia", "blockchain identity"],
  authors: [{ name: "Sam", url: "https://x.com/samdevrel" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
