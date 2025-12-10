"use client";

interface ProviderSelectorProps {
  currentProvider: "shields" | "skill-icons" | "typing-svg";
  onProviderChange: (provider: "shields" | "skill-icons" | "typing-svg") => void;
}

export default function ProviderSelector({
  currentProvider,
  onProviderChange,
}: ProviderSelectorProps) {
  return (
    <div className="provider-selector">
      <button
        className={`provider-btn ${currentProvider === "shields" ? "active" : ""}`}
        onClick={() => onProviderChange("shields")}
      >
        Shields.io
      </button>
      <button
        className={`provider-btn ${currentProvider === "skill-icons" ? "active" : ""}`}
        onClick={() => onProviderChange("skill-icons")}
      >
        Skill Icons
      </button>
      <button
        className={`provider-btn ${currentProvider === "typing-svg" ? "active" : ""}`}
        onClick={() => onProviderChange("typing-svg")}
      >
        Typing SVG
      </button>
    </div>
  );
}
