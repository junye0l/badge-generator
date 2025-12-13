"use client";

import { PokemonConfig } from "./PokemonOptions";

interface PokemonPreviewProps {
  config: PokemonConfig;
}

export default function PokemonPreview({ config }: PokemonPreviewProps) {
  const { username, chainId, generation } = config;

  const gen = generation || "gen1";
  const cardUrl =
    username && chainId
      ? `${window.location.origin}/api/pokemon?user=${encodeURIComponent(username)}&gen=${encodeURIComponent(gen)}&starter=${encodeURIComponent(chainId)}`
      : "";

  return (
    <div className="preview-container">
      <h2>미리보기</h2>

      {!username || !chainId ? (
        <div className="placeholder">
          <p>GitHub 사용자명과 진화 라인을 선택해주세요</p>
        </div>
      ) : (
        <div className="preview-content">
          <img
            src={cardUrl}
            alt="Pokemon Card"
            className="pokemon-card"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = "none";
              const errorMsg = target.nextElementSibling as HTMLElement;
              if (errorMsg) errorMsg.style.display = "block";
            }}
          />
          <div className="error-message" style={{ display: "none" }}>
            ⚠️ 사용자를 찾을 수 없거나 오류가 발생했습니다
          </div>
        </div>
      )}

      <style jsx>{`
        .preview-container {
          margin: 2rem 0;
          padding: 2rem;
          background: #f9fafb;
          border-radius: 12px;
        }

        h2 {
          margin-bottom: 1.5rem;
          color: #333;
        }

        .placeholder {
          padding: 3rem;
          text-align: center;
          color: #999;
          border: 2px dashed #ddd;
          border-radius: 8px;
        }

        .preview-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .pokemon-card {
          max-width: 100%;
          border-radius: 10px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }

        .error-message {
          padding: 1rem;
          background: #fee;
          color: #c33;
          border-radius: 8px;
          border: 1px solid #fcc;
        }

        .preview-info {
          text-align: center;
          color: #666;
          font-size: 0.9rem;
        }

        .preview-info p {
          margin: 0.25rem 0;
        }
      `}</style>
    </div>
  );
}
