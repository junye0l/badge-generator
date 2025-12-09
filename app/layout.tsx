import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GitHub Badge Generator",
  description: "Shields.io & Skill Icons를 활용한 기술 스택 뱃지 생성기",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
