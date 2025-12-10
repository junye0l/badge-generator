"use client";

import { TypingSvgConfig, generateTypingSvgUrl } from "@/lib/typingSvg";
import { useMemo } from "react";

interface TypingPreviewProps {
  config: TypingSvgConfig;
}

export default function TypingPreview({ config }: TypingPreviewProps) {
  const url = useMemo(() => {
    const baseUrl = generateTypingSvgUrl(config);
    return `${baseUrl}&_t=${Date.now()}`;
  }, [config]);

  return (
    <>
      <h2 className="section-title">타이핑 애니메이션 미리보기</h2>
      <div className="preview">
        <div style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
          <img
            key={url}
            src={url}
            alt="Typing SVG Preview"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>
      </div>
    </>
  );
}
