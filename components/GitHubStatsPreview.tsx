"use client";

import { useState, useEffect } from "react";
import { GitHubStatsConfig, generateGitHubStatsUrl } from "@/lib/githubStats";

interface GitHubStatsPreviewProps {
  config: GitHubStatsConfig;
}

export default function GitHubStatsPreview({ config }: GitHubStatsPreviewProps) {
  const [imageError, setImageError] = useState(false);
  const statsUrl = generateGitHubStatsUrl(config);

  // Reset error state when URL changes
  useEffect(() => {
    setImageError(false);
  }, [statsUrl]);

  if (!config.username) {
    return (
      <>
        <h2 className="section-title">미리보기</h2>
        <div className="preview">
          <p style={{ textAlign: "center", color: "#999", padding: "40px 20px" }}>
            GitHub Username을 입력하세요
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <h2 className="section-title">미리보기</h2>
      <div className="preview">
        <div className="badge-grid-column">
          {imageError ? (
            <div style={{
              padding: "40px 20px",
              textAlign: "center",
              border: "2px dashed #ddd",
              borderRadius: "8px",
              backgroundColor: "#f9f9f9"
            }}>
              <p style={{ color: "#666", marginBottom: "10px" }}>
                ⚠️ GitHub Stats 이미지를 불러올 수 없습니다
              </p>
              <p style={{ fontSize: "14px", color: "#999" }}>
                공개 서버가 일시적으로 과부하 상태일 수 있습니다.<br />
                잠시 후 다시 시도하거나, 생성된 마크다운 코드는 정상적으로 사용할 수 있습니다.
              </p>
            </div>
          ) : (
            <img
              src={statsUrl}
              alt={`${config.username}'s GitHub Stats`}
              style={{ maxWidth: "100%", height: "auto" }}
              onError={() => setImageError(true)}
            />
          )}
        </div>
      </div>
    </>
  );
}
