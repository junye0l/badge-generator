"use client";

import { techStack, socialMedia } from "@/lib/techStack";
import {
  generateShieldsBadgeUrl,
  generateSocialBadgeUrl,
  getAllIcons,
  generateSkillIconsUrl,
  chunkArray,
  ShieldsStyle,
  SkillTheme,
} from "@/lib/badgeGenerator";

interface BadgePreviewProps {
  provider: "shields" | "skill-icons";
  shieldsStyle: ShieldsStyle;
  skillTheme: SkillTheme;
  perLine: number;
}

export default function BadgePreview({
  provider,
  shieldsStyle,
  skillTheme,
  perLine,
}: BadgePreviewProps) {
  return (
    <>
      <h2 className="section-title">미리보기</h2>
      <div className="preview">
        <div
          className={
            provider === "skill-icons" ? "badge-grid-column" : "badge-grid"
          }
        >
          {provider === "shields" && shieldsStyle === "social"
            ? socialMedia.map((social, index) => (
                <img
                  key={index}
                  src={generateSocialBadgeUrl(social)}
                  alt={social.name}
                />
              ))
            : provider === "shields"
              ? Object.values(techStack).map((techs, categoryIndex) =>
                  techs.map((tech, techIndex) => (
                    <img
                      key={`${categoryIndex}-${techIndex}`}
                      src={generateShieldsBadgeUrl(tech, shieldsStyle)}
                      alt={tech.name}
                    />
                  )),
                )
              : chunkArray(getAllIcons(), perLine).map((chunk, index) => (
                  <img
                    key={index}
                    src={generateSkillIconsUrl(chunk, skillTheme, perLine)}
                    alt={`Tech Stack Line ${index + 1}`}
                    style={{ maxWidth: "100%", height: "auto" }}
                  />
                ))}
        </div>
      </div>
    </>
  );
}
