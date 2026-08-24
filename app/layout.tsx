import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '恒奈普大叔｜插画作品集',
  description: '恒奈普大叔的插画、人物与漫画作品集。',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
