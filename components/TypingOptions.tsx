"use client";

import { TypingSvgConfig, typingSvgFonts, typingSvgColors, typingSvgAnimations } from "@/lib/typingSvg";

interface TypingOptionsProps {
  config: TypingSvgConfig;
  onConfigChange: (config: TypingSvgConfig) => void;
}

export default function TypingOptions({
  config,
  onConfigChange,
}: TypingOptionsProps) {
  const handleLineChange = (index: number, value: string) => {
    const newLines = [...config.lines];
    newLines[index] = value;
    onConfigChange({ ...config, lines: newLines });
  };

  const handleAddLine = () => {
    onConfigChange({ ...config, lines: [...config.lines, ""] });
  };

  const handleRemoveLine = (index: number) => {
    if (config.lines.length > 1) {
      const newLines = config.lines.filter((_, i) => i !== index);
      onConfigChange({ ...config, lines: newLines });
    }
  };

  return (
    <>
      <h2 className="section-title">타이핑 애니메이션 설정</h2>
      <div className="options-section">
        <div className="option-group" style={{ marginBottom: "24px" }}>
          <label style={{ display: "block", marginBottom: "8px" }}>타이핑할 텍스트</label>
          {config.lines.map((line, index) => (
            <div key={index} style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
              <input
                type="text"
                value={line}
                onChange={(e) => handleLineChange(index, e.target.value)}
                placeholder={`${index + 1}번째 줄`}
                style={{
                  flex: 1,
                  padding: "8px",
                  borderRadius: "4px",
                  border: "1px solid #ddd",
                  fontSize: "14px",
                }}
              />
              <button
                onClick={() => handleRemoveLine(index)}
                disabled={config.lines.length === 1}
                style={{
                  padding: "8px 12px",
                  borderRadius: "4px",
                  border: "1px solid #ddd",
                  background: config.lines.length === 1 ? "#f5f5f5" : "#fff",
                  cursor: config.lines.length === 1 ? "not-allowed" : "pointer",
                  fontSize: "14px",
                }}
              >
                삭제
              </button>
            </div>
          ))}
          <button
            onClick={handleAddLine}
            style={{
              padding: "8px 16px",
              borderRadius: "4px",
              border: "1px solid #ddd",
              background: "#fff",
              cursor: "pointer",
              fontSize: "14px",
              marginTop: "4px",
            }}
          >
            + 텍스트 줄 추가
          </button>
        </div>

        <div className="option-group" style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "8px" }}>폰트</label>
          <select
            value={config.font}
            onChange={(e) =>
              onConfigChange({ ...config, font: e.target.value })
            }
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ddd",
            }}
          >
            <optgroup label="영문 폰트">
              {typingSvgFonts
                .filter((f) => f.category === "english")
                .map((font) => (
                  <option key={font.value} value={font.value}>
                    {font.name}
                  </option>
                ))}
            </optgroup>
            <optgroup label="코딩 폰트">
              {typingSvgFonts
                .filter((f) => f.category === "monospace")
                .map((font) => (
                  <option key={font.value} value={font.value}>
                    {font.name}
                  </option>
                ))}
            </optgroup>
            <optgroup label="한글 폰트">
              {typingSvgFonts
                .filter((f) => f.category === "korean")
                .map((font) => (
                  <option key={font.value} value={font.value}>
                    {font.name}
                  </option>
                ))}
            </optgroup>
          </select>
        </div>

        <div style={{ display: "flex", gap: "16px" }}>
          <div className="option-group" style={{ flex: 1 }}>
            <label style={{ display: "block", marginBottom: "8px" }}>폰트 크기: {config.size}px</label>
            <input
              type="range"
              min="12"
              max="40"
              value={config.size}
              onChange={(e) =>
                onConfigChange({ ...config, size: parseInt(e.target.value) })
              }
              style={{ width: "100%" }}
            />
          </div>

          <div className="option-group" style={{ flex: 1 }}>
            <label style={{ display: "block", marginBottom: "8px" }}>폰트 색상</label>
            <select
              value={config.color}
              onChange={(e) =>
                onConfigChange({ ...config, color: e.target.value })
              }
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ddd",
              }}
            >
              {typingSvgColors.map((color) => (
                <option key={color.value} value={color.value}>
                  {color.name} (#{color.value})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="option-group" style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "8px" }}>애니메이션 타입</label>
          <select
            value={config.repeat}
            onChange={(e) =>
              onConfigChange({ ...config, repeat: e.target.value })
            }
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ddd",
            }}
          >
            {typingSvgAnimations.map((animation) => (
              <option key={animation.value} value={animation.value}>
                {animation.name}
              </option>
            ))}
          </select>
        </div>

        <div style={{ display: "flex", gap: "16px", marginBottom: "20px" }}>
          <div className="option-group" style={{ flex: 1 }}>
            <label style={{ display: "block", marginBottom: "8px" }}>타이핑 속도: {config.duration}ms</label>
            <input
              type="range"
              min="2000"
              max="10000"
              step="500"
              value={config.duration}
              onChange={(e) =>
                onConfigChange({
                  ...config,
                  duration: parseInt(e.target.value),
                })
              }
              style={{ width: "100%" }}
            />
            <small style={{ color: "#666", fontSize: "12px" }}>
              낮을수록 빠름
            </small>
          </div>

          <div className="option-group" style={{ flex: 1 }}>
            <label style={{ display: "block", marginBottom: "8px" }}>줄 바꿈 대기 시간: {config.pause}ms</label>
            <input
              type="range"
              min="500"
              max="5000"
              step="500"
              value={config.pause}
              onChange={(e) =>
                onConfigChange({ ...config, pause: parseInt(e.target.value) })
              }
              style={{ width: "100%" }}
            />
          </div>
        </div>

        <div style={{ display: "flex", gap: "16px", marginBottom: "20px" }}>
          <div className="option-group" style={{ flex: 1 }}>
            <label style={{ display: "block", marginBottom: "8px" }}>너비: {config.width}px</label>
            <input
              type="range"
              min="200"
              max="800"
              step="10"
              value={config.width}
              onChange={(e) =>
                onConfigChange({ ...config, width: parseInt(e.target.value) })
              }
              style={{ width: "100%" }}
            />
          </div>

          <div className="option-group" style={{ flex: 1 }}>
            <label style={{ display: "block", marginBottom: "8px" }}>높이: {config.height}px</label>
            <input
              type="range"
              min="30"
              max="200"
              step="10"
              value={config.height}
              onChange={(e) =>
                onConfigChange({ ...config, height: parseInt(e.target.value) })
              }
              style={{ width: "100%" }}
            />
          </div>
        </div>

        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          <div className="option-group">
            <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <input
                type="checkbox"
                checked={config.center}
                onChange={(e) =>
                  onConfigChange({ ...config, center: e.target.checked })
                }
              />
              가로 가운데 정렬
            </label>
          </div>

          <div className="option-group">
            <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <input
                type="checkbox"
                checked={config.vCenter}
                onChange={(e) =>
                  onConfigChange({ ...config, vCenter: e.target.checked })
                }
              />
              세로 가운데 정렬
            </label>
          </div>

          <div className="option-group">
            <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <input
                type="checkbox"
                checked={config.multiline}
                onChange={(e) =>
                  onConfigChange({ ...config, multiline: e.target.checked })
                }
              />
              줄바꿈으로 여러 문장 표시 (삭제 없이)
            </label>
          </div>
        </div>
      </div>
    </>
  );
}
