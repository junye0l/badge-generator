"use client";

import { evolutionChains } from "@/lib/pokemon";

export interface PokemonConfig {
  username: string;
  chainId: string;
}

interface PokemonOptionsProps {
  config: PokemonConfig;
  onConfigChange: (config: PokemonConfig) => void;
}

export default function PokemonOptions({
  config,
  onConfigChange,
}: PokemonOptionsProps) {
  return (
    <div className="options-container">
      <h2>포켓몬 설정</h2>

      {/* GitHub 사용자명 입력 */}
      <div className="option-group">
        <label htmlFor="github-username">GitHub 사용자명</label>
        <input
          id="github-username"
          type="text"
          placeholder="junye0l"
          value={config.username}
          onChange={(e) =>
            onConfigChange({ ...config, username: e.target.value })
          }
          className="input-field"
        />
        <p className="help-text">
          GitHub 총 커밋 수를 기준으로 포켓몬이 진화합니다
        </p>
      </div>

      {/* 진화 라인 선택 */}
      <div className="option-group">
        <label htmlFor="evolution-chain">진화 라인 선택</label>
        <div className="pokemon-grid">
          {evolutionChains.map((chain) => (
            <div
              key={chain.id}
              className={`pokemon-card ${config.chainId === chain.id ? "selected" : ""}`}
              onClick={() => onConfigChange({ ...config, chainId: chain.id })}
            >
              <div className="pokemon-stages">
                {chain.stages.map((pokemon, index) => (
                  <span key={pokemon.id} className="pokemon-name">
                    {pokemon.koreanName}
                    {index < chain.stages.length - 1 && " → "}
                  </span>
                ))}
              </div>
              <div className="chain-name">{chain.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 진화 단계 안내 */}
      <div className="option-group">
        <label>진화 단계</label>
        <div className="evolution-info">
          <div className="stage-info">
            <span className="stage-badge">1단계</span>
            <span>0 ~ 2,999 커밋</span>
          </div>
          <div className="stage-info">
            <span className="stage-badge">2단계</span>
            <span>3,000 ~ 5,999 커밋</span>
          </div>
          <div className="stage-info">
            <span className="stage-badge">3단계</span>
            <span>6,000 ~ 9,999 커밋</span>
          </div>
          <div className="stage-info">
            <span className="stage-badge shiny">✨ Shiny</span>
            <span>10,000+ 커밋 (숨겨진 진화)</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .options-container {
          margin: 2rem 0;
        }

        h2 {
          margin-bottom: 1.5rem;
          color: #333;
        }

        .option-group {
          margin-bottom: 2rem;
        }

        label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 600;
          color: #555;
        }

        .input-field {
          width: 100%;
          max-width: 400px;
          padding: 0.75rem;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          font-size: 1rem;
          transition: border-color 0.3s;
        }

        .input-field:focus {
          outline: none;
          border-color: #6366f1;
        }

        .help-text {
          margin-top: 0.5rem;
          font-size: 0.875rem;
          color: #666;
        }

        .pokemon-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 1rem;
          margin-top: 1rem;
        }

        .pokemon-card {
          padding: 1rem;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s;
          background: white;
        }

        .pokemon-card:hover {
          border-color: #a78bfa;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .pokemon-card.selected {
          border-color: #6366f1;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        .pokemon-stages {
          font-size: 0.95rem;
          margin-bottom: 0.5rem;
          font-weight: 500;
        }

        .pokemon-card.selected .pokemon-stages {
          color: white;
        }

        .pokemon-name {
          white-space: nowrap;
        }

        .chain-name {
          font-size: 0.75rem;
          color: #888;
          margin-top: 0.25rem;
        }

        .pokemon-card.selected .chain-name {
          color: rgba(255, 255, 255, 0.8);
        }

        .evolution-info {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          padding: 1rem;
          background: #f9fafb;
          border-radius: 8px;
        }

        .stage-info {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .stage-badge {
          padding: 0.25rem 0.75rem;
          border-radius: 4px;
          background: #6366f1;
          color: white;
          font-size: 0.875rem;
          font-weight: 600;
          min-width: 60px;
          text-align: center;
        }

        .stage-badge.shiny {
          background: linear-gradient(135deg, #ffd700, #ffed4e);
          color: #000;
        }
      `}</style>
    </div>
  );
}
