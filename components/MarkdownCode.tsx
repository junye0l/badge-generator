"use client";

import { useState } from "react";
import {
  generateMarkdown,
  ShieldsStyle,
  SkillTheme,
} from "@/lib/badgeGenerator";
import { TypingSvgConfig, generateTypingSvgMarkdown } from "@/lib/typingSvg";
import { GitHubStatsConfig, generateGitHubStatsMarkdown } from "@/lib/githubStats";

interface MarkdownCodeProps {
  provider: "shields" | "skill-icons" | "typing-svg" | "github-stats";
  shieldsStyle: ShieldsStyle;
  skillTheme: SkillTheme;
  perLine: number;
  typingConfig?: TypingSvgConfig;
  githubStatsConfig?: GitHubStatsConfig;
}

export default function MarkdownCode({
  provider,
  shieldsStyle,
  skillTheme,
  perLine,
  typingConfig,
  githubStatsConfig,
}: MarkdownCodeProps) {
  const [copied, setCopied] = useState(false);

  const markdown = provider === "typing-svg" && typingConfig
    ? generateTypingSvgMarkdown(typingConfig)
    : provider === "github-stats" && githubStatsConfig
    ? generateGitHubStatsMarkdown(githubStatsConfig)
    : generateMarkdown(
        provider as "shields" | "skill-icons",
        shieldsStyle,
        skillTheme,
        perLine,
      );

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="markdown-section">
      <h2>GitHub README 마크다운 코드</h2>
      <button className="copy-btn" onClick={handleCopy}>
        {copied ? "복사 완료!" : "마크다운 복사"}
      </button>
      <div className="code-section">{markdown}</div>
    </div>
  );
}
