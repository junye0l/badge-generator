"use client";

import { ShieldsStyle, SkillTheme } from "@/lib/badgeGenerator";

interface StyleOptionsProps {
  provider: "shields" | "skill-icons";
  shieldsStyle: ShieldsStyle;
  skillTheme: SkillTheme;
  perLine: number;
  onShieldsStyleChange: (style: ShieldsStyle) => void;
  onSkillThemeChange: (theme: SkillTheme) => void;
  onPerLineChange: (perLine: number) => void;
}

export default function StyleOptions({
  provider,
  shieldsStyle,
  skillTheme,
  perLine,
  onShieldsStyleChange,
  onSkillThemeChange,
  onPerLineChange,
}: StyleOptionsProps) {
  const shieldsStyles: { value: ShieldsStyle; label: string }[] = [
    { value: "flat", label: "Flat" },
    { value: "flat-square", label: "Flat Square" },
    { value: "for-the-badge", label: "For the Badge" },
    { value: "plastic", label: "Plastic (3D)" },
  ];

  const perLineOptions = [6, 8, 10, 15];

  return (
    <>
      <h2 className="section-title">스타일</h2>
      <div className="options-section">
        {provider === "shields" ? (
          <div className="btn-group">
            {shieldsStyles.map((style) => (
              <button
                key={style.value}
                className={`option-btn ${shieldsStyle === style.value ? "active" : ""}`}
                onClick={() => onShieldsStyleChange(style.value)}
              >
                {style.label}
              </button>
            ))}
          </div>
        ) : (
          <>
            <div className="option-group">
              <span className="option-label">테마</span>
              <div className="btn-group">
                <button
                  className={`option-btn ${skillTheme === "dark" ? "active" : ""}`}
                  onClick={() => onSkillThemeChange("dark")}
                >
                  Dark
                </button>
                <button
                  className={`option-btn ${skillTheme === "light" ? "active" : ""}`}
                  onClick={() => onSkillThemeChange("light")}
                >
                  Light
                </button>
              </div>
            </div>
            <div className="option-group">
              <span className="option-label">한 줄 표시 개수</span>
              <div className="input-group">
                <div className="btn-group">
                  {perLineOptions.map((num) => (
                    <button
                      key={num}
                      className={`option-btn ${perLine === num ? "active" : ""}`}
                      onClick={() => onPerLineChange(num)}
                    >
                      {num}개
                    </button>
                  ))}
                </div>
                <span style={{ color: "#999" }}>또는</span>
                <input
                  type="number"
                  className="number-input"
                  min="1"
                  max="50"
                  value={perLine}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    if (!isNaN(val) && val >= 1 && val <= 50) {
                      onPerLineChange(val);
                    }
                  }}
                  placeholder="1-50"
                />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
