import { Tech, techStack } from "./techStack";

export type ShieldsStyle = "flat" | "flat-square" | "for-the-badge" | "plastic";
export type SkillTheme = "dark" | "light";

export function generateShieldsBadgeUrl(
  tech: Tech,
  style: ShieldsStyle,
): string {
  const logoColor = ["F7DF1E", "FFCA28"].includes(tech.color)
    ? "black"
    : "white";
  return `https://img.shields.io/badge/${encodeURIComponent(tech.name)}-${tech.color}?style=${style}&logo=${tech.shields}&logoColor=${logoColor}`;
}

export function getAllIcons(): string[] {
  const allIcons: string[] = [];
  Object.values(techStack).forEach((techs) => {
    techs.forEach((tech) => allIcons.push(tech.skill));
  });
  return allIcons;
}

export function generateSkillIconsUrl(
  icons: string[],
  theme: SkillTheme,
  perLine: number,
): string {
  return `https://skillicons.dev/icons?i=${icons.join(",")}&theme=${theme}&perline=${perLine}`;
}

export function chunkArray<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

export function generateMarkdown(
  provider: "shields" | "skill-icons",
  shieldsStyle: ShieldsStyle,
  skillTheme: SkillTheme,
  perLine: number,
): string {
  let markdown = "# Tech Stack\n\n";

  if (provider === "shields") {
    Object.entries(techStack).forEach(([category, techs]) => {
      markdown += `## ${category}\n\n`;
      markdown += '<div align="center">\n';
      techs.forEach((tech) => {
        const url = generateShieldsBadgeUrl(tech, shieldsStyle);
        markdown += `  <img src="${url}" />\n`;
      });
      markdown += "</div>\n\n";
    });
  } else {
    markdown += '<div align="center">\n\n';
    const allIcons = getAllIcons();
    const iconChunks = chunkArray(allIcons, perLine);

    iconChunks.forEach((chunk, index) => {
      const url = generateSkillIconsUrl(chunk, skillTheme, perLine);
      markdown += `<img src="${url}" />`;
      if (index < iconChunks.length - 1) {
        markdown += "<br/>";
      }
      markdown += "\n";
    });

    markdown += "\n</div>\n";
  }

  return markdown;
}
