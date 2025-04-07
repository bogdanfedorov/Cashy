import type { Metadata } from "next";
import "./main.sass";

export const metadata: Metadata = {
  title: "Cache",
  description: "Cache",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
