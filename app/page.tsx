"use client";

import { useState } from "react";
import ProviderSelector from "@/components/ProviderSelector";
import InfoBox from "@/components/InfoBox";
import StyleOptions from "@/components/StyleOptions";
import BadgePreview from "@/components/BadgePreview";
import MarkdownCode from "@/components/MarkdownCode";
import Footer from "@/components/Footer";
import { ShieldsStyle, SkillTheme } from "@/lib/badgeGenerator";
import TypingOptions from "@/components/TypingOptions";
import TypingPreview from "@/components/TypingPreview";
import { TypingSvgConfig, defaultTypingSvgConfig } from "@/lib/typingSvg";

export default function Home() {
  const [provider, setProvider] = useState<"shields" | "skill-icons" | "typing-svg">(
    "shields",
  );
  const [shieldsStyle, setShieldsStyle] = useState<ShieldsStyle>("plastic");
  const [skillTheme, setSkillTheme] = useState<SkillTheme>("dark");
  const [perLine, setPerLine] = useState(8);
  const [typingConfig, setTypingConfig] = useState<TypingSvgConfig>(defaultTypingSvgConfig);

  return (
    <div className="container">
      <h1>GitHub Badge Generator</h1>
      <p className="subtitle">
        깃허브 프로필 꾸미기 편의기능 모음
      </p>

      <ProviderSelector
        currentProvider={provider}
        onProviderChange={setProvider}
      />

      <InfoBox provider={provider} />

      {provider === "typing-svg" ? (
        <>
          <TypingOptions config={typingConfig} onConfigChange={setTypingConfig} />
          <TypingPreview config={typingConfig} />
        </>
      ) : (
        <>
          <StyleOptions
            provider={provider}
            shieldsStyle={shieldsStyle}
            skillTheme={skillTheme}
            perLine={perLine}
            onShieldsStyleChange={setShieldsStyle}
            onSkillThemeChange={setSkillTheme}
            onPerLineChange={setPerLine}
          />

          <BadgePreview
            provider={provider}
            shieldsStyle={shieldsStyle}
            skillTheme={skillTheme}
            perLine={perLine}
          />
        </>
      )}

      <MarkdownCode
        provider={provider}
        shieldsStyle={shieldsStyle}
        skillTheme={skillTheme}
        perLine={perLine}
        typingConfig={typingConfig}
      />

      <Footer />
    </div>
  );
}
