"use client";

import { useState } from "react";
import ProviderSelector from "@/components/ProviderSelector";
import InfoBox from "@/components/InfoBox";
import StyleOptions from "@/components/StyleOptions";
import BadgePreview from "@/components/BadgePreview";
import MarkdownCode from "@/components/MarkdownCode";
import Footer from "@/components/Footer";
import { ShieldsStyle, SkillTheme } from "@/lib/badgeGenerator";

export default function Home() {
  const [provider, setProvider] = useState<"shields" | "skill-icons">(
    "shields",
  );
  const [shieldsStyle, setShieldsStyle] = useState<ShieldsStyle>("plastic");
  const [skillTheme, setSkillTheme] = useState<SkillTheme>("dark");
  const [perLine, setPerLine] = useState(8);

  return (
    <div className="container">
      <h1>GitHub Badge Generator</h1>
      <p className="subtitle">
        Shields.io & Skill Icons를 활용한 기술 스택 배지 생성기
      </p>

      <ProviderSelector
        currentProvider={provider}
        onProviderChange={setProvider}
      />

      <InfoBox provider={provider} />

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

      <MarkdownCode
        provider={provider}
        shieldsStyle={shieldsStyle}
        skillTheme={skillTheme}
        perLine={perLine}
      />

      <Footer />
    </div>
  );
}
