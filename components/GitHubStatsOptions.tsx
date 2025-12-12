"use client";

import { GitHubStatsConfig, themes } from "@/lib/githubStats";

interface GitHubStatsOptionsProps {
  config: GitHubStatsConfig;
  onConfigChange: (config: GitHubStatsConfig) => void;
}

export default function GitHubStatsOptions({
  config,
  onConfigChange,
}: GitHubStatsOptionsProps) {
  const updateConfig = (updates: Partial<GitHubStatsConfig>) => {
    onConfigChange({ ...config, ...updates });
  };

  const updateHideStats = (stat: keyof GitHubStatsConfig["hideStats"], value: boolean) => {
    onConfigChange({
      ...config,
      hideStats: { ...config.hideStats, [stat]: value },
    });
  };

  return (
    <>
      <h2 className="section-title">설정</h2>
      <div className="options-section">
        <div className="option-group">
          <span className="option-label">GitHub Username (필수)</span>
          <input
            type="text"
            className="text-input"
            value={config.username}
            onChange={(e) => updateConfig({ username: e.target.value })}
            placeholder="octocat"
            style={{
              width: "100%",
              padding: "8px 12px",
              fontSize: "14px",
              border: "1px solid #ddd",
              borderRadius: "4px",
            }}
          />
        </div>

        <div className="option-group">
          <span className="option-label">테마</span>
          <select
            className="select-input"
            value={config.theme}
            onChange={(e) => updateConfig({ theme: e.target.value })}
            style={{
              width: "100%",
              padding: "8px 12px",
              fontSize: "14px",
              border: "1px solid #ddd",
              borderRadius: "4px",
            }}
          >
            {themes.map((theme) => (
              <option key={theme} value={theme}>
                {theme}
              </option>
            ))}
          </select>
        </div>

        <div className="option-group">
          <span className="option-label">표시 옵션</span>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <input
                type="checkbox"
                checked={config.showIcons}
                onChange={(e) => updateConfig({ showIcons: e.target.checked })}
              />
              <span>아이콘 표시</span>
            </label>
            <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <input
                type="checkbox"
                checked={config.hideBorder}
                onChange={(e) => updateConfig({ hideBorder: e.target.checked })}
              />
              <span>테두리 숨기기</span>
            </label>
            <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <input
                type="checkbox"
                checked={config.includePrivate}
                onChange={(e) => updateConfig({ includePrivate: e.target.checked })}
              />
              <span>비공개 저장소 포함</span>
            </label>
          </div>
        </div>

        <div className="option-group">
          <span className="option-label">통계 숨기기</span>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <input
                type="checkbox"
                checked={config.hideStats.stars}
                onChange={(e) => updateHideStats("stars", e.target.checked)}
              />
              <span>Stars</span>
            </label>
            <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <input
                type="checkbox"
                checked={config.hideStats.commits}
                onChange={(e) => updateHideStats("commits", e.target.checked)}
              />
              <span>Commits</span>
            </label>
            <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <input
                type="checkbox"
                checked={config.hideStats.prs}
                onChange={(e) => updateHideStats("prs", e.target.checked)}
              />
              <span>Pull Requests</span>
            </label>
            <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <input
                type="checkbox"
                checked={config.hideStats.issues}
                onChange={(e) => updateHideStats("issues", e.target.checked)}
              />
              <span>Issues</span>
            </label>
            <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <input
                type="checkbox"
                checked={config.hideStats.contribs}
                onChange={(e) => updateHideStats("contribs", e.target.checked)}
              />
              <span>Contributions</span>
            </label>
          </div>
        </div>
      </div>
    </>
  );
}
