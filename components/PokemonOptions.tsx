"use client";

import { useEffect, useState } from "react";
import { POKEMON_GENERATIONS } from "@/lib/pokemon";

export interface PokemonConfig {
  username: string;
  chainId: string;
  generation?: string;
}

interface PokemonOptionsProps {
  config: PokemonConfig;
  onConfigChange: (config: PokemonConfig) => void;
}

export default function PokemonOptions({ config, onConfigChange }: PokemonOptionsProps) {
  const generationKeys = Object.keys(POKEMON_GENERATIONS);
  const fallbackGeneration = generationKeys[0] ?? "gen1";
  const resolvedInitialGen =
    (config.generation && POKEMON_GENERATIONS[config.generation] ? config.generation : undefined) ||
    fallbackGeneration;
  const [selectedGen, setSelectedGen] = useState<string>(resolvedInitialGen);

  useEffect(() => {
    if (config.generation && POKEMON_GENERATIONS[config.generation] && config.generation !== selectedGen) {
      setSelectedGen(config.generation);
    }
  }, [config.generation, selectedGen]);

  const handleGenerationChange = (gen: string) => {
    if (!POKEMON_GENERATIONS[gen] || POKEMON_GENERATIONS[gen].chains.length === 0) {
      return;
    }
    setSelectedGen(gen);
    const firstChain = POKEMON_GENERATIONS[gen].chains[0];
    onConfigChange({ ...config, chainId: firstChain.id, generation: gen });
  };

  const handlePokemonSelect = (chainId: string) => {
    onConfigChange({ ...config, chainId, generation: selectedGen });
  };

  const currentGeneration =
    POKEMON_GENERATIONS[selectedGen] ?? POKEMON_GENERATIONS[fallbackGeneration];

  return (
    <div className="options-container">
      <h2>포켓몬 설정</h2>

      <div className="option-group">
        <label htmlFor="github-username">GitHub 사용자명</label>
        <input
          id="github-username"
          type="text"
          placeholder="username"
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

      <div className="option-group">
        <label>세대 선택</label>
        <div className="generation-tabs">
          {Object.entries(POKEMON_GENERATIONS).map(([genKey, genData]) => (
            <button
              key={genKey}
              className={`gen-tab ${selectedGen === genKey ? "active" : ""}`}
              onClick={() => handleGenerationChange(genKey)}
            >
              {genData.name}
            </button>
          ))}
        </div>
      </div>

      <div className="option-group">
        <label htmlFor="evolution-chain">진화 라인 선택</label>
        <p className="help-text generation-help">
          {currentGeneration.name} 포켓몬 ({currentGeneration.chains.length}종)
        </p>
        <div className="pokemon-grid">
          {currentGeneration.chains.map((chain) => {
            const cardClasses = [
              "pokemon-card",
              chain.isLegendary ? "legendary" : "",
              config.chainId === chain.id ? "selected" : "",
            ]
              .filter(Boolean)
              .join(" ");

            return (
              <div key={chain.id} className={cardClasses} onClick={() => handlePokemonSelect(chain.id)}>
                {chain.isLegendary && <span className="legendary-badge">LEGENDARY</span>}
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
            );
          })}
        </div>
      </div>

      <div className="option-group">
        <label>진화 단계</label>
        <div className="evolution-info">
          <div className="stage-info">
            <span className="stage-badge">1단계</span>
            <span>0 ~ 2,999 Commit</span>
          </div>
          <div className="stage-info">
            <span className="stage-badge">2단계</span>
            <span>3,000 ~ 5,999 Commit</span>
          </div>
          <div className="stage-info">
            <span className="stage-badge">3단계</span>
            <span>6,000 ~ 9,999 Commit</span>
          </div>
          <div className="stage-info">
            <span className="stage-badge shiny">Shiny</span>
            <span>10,000+ Commit</span>
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

        .generation-help {
          margin-bottom: 0.5rem;
          font-weight: 500;
          color: #6366f1;
        }

        .generation-tabs {
          display: flex;
          gap: 0.5rem;
          margin-top: 0.75rem;
        }

        .gen-tab {
          flex: 1;
          padding: 0.75rem 1.5rem;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          background: white;
          color: #555;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
        }

        .gen-tab:hover {
          border-color: #a78bfa;
          background: #f9fafb;
        }

        .gen-tab.active {
          border-color: #6366f1;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
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
          position: relative;
          overflow: hidden;
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

        .pokemon-card.legendary {
          border-color: rgba(255, 215, 64, 0.9);
          background: radial-gradient(circle at top, #fff8d5 0%, #fff 40%, #fef3c7 100%);
          box-shadow: 0 0 18px rgba(255, 200, 64, 0.35);
        }

        .pokemon-card.legendary.selected {
          border-color: #ffe082;
          background: linear-gradient(135deg, #ffd966 0%, #ffb347 100%);
          color: #2d1b00;
        }

        .legendary-badge {
          position: absolute;
          top: 0.5rem;
          right: 0.5rem;
          padding: 0.15rem 0.55rem;
          border-radius: 999px;
          background: linear-gradient(135deg, #fff3b0, #fdd819);
          color: #3a2500;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          box-shadow: 0 4px 10px rgba(253, 216, 25, 0.4);
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

        .pokemon-card.legendary .chain-name,
        .pokemon-card.legendary .pokemon-stages {
          color: rgba(58, 37, 0, 0.85);
        }

        .pokemon-card.legendary.selected .chain-name,
        .pokemon-card.legendary.selected .pokemon-stages {
          color: #2d1b00;
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
