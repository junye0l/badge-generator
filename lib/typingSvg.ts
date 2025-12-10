export interface TypingSvgFont {
  name: string;
  value: string;
  category: "english" | "korean" | "monospace";
}

export const typingSvgFonts: TypingSvgFont[] = [
  { name: "Roboto", value: "Roboto", category: "english" },
  { name: "Open Sans", value: "Open+Sans", category: "english" },
  { name: "Lato", value: "Lato", category: "english" },
  { name: "Montserrat", value: "Montserrat", category: "english" },
  { name: "Poppins", value: "Poppins", category: "english" },
  { name: "Raleway", value: "Raleway", category: "english" },

  { name: "Fira Code", value: "Fira+Code", category: "monospace" },
  { name: "JetBrains Mono", value: "JetBrains+Mono", category: "monospace" },
  { name: "Source Code Pro", value: "Source+Code+Pro", category: "monospace" },
  { name: "Courier New", value: "Courier+New", category: "monospace" },
  { name: "Roboto Mono", value: "Roboto+Mono", category: "monospace" },
  { name: "IBM Plex Mono", value: "IBM+Plex+Mono", category: "monospace" },

  { name: "Noto Sans KR", value: "Noto+Sans+KR", category: "korean" },
  { name: "Nanum Gothic", value: "Nanum+Gothic", category: "korean" },
  { name: "Nanum Myeongjo", value: "Nanum+Myeongjo", category: "korean" },
  { name: "Black Han Sans", value: "Black+Han+Sans", category: "korean" },
  { name: "Do Hyeon", value: "Do+Hyeon", category: "korean" },
  { name: "Jua", value: "Jua", category: "korean" },
  { name: "Gamja Flower", value: "Gamja+Flower", category: "korean" },
  { name: "Sunflower", value: "Sunflower", category: "korean" },
  { name: "Stylish", value: "Stylish", category: "korean" },
  { name: "Gothic A1", value: "Gothic+A1", category: "korean" },
];

export const typingSvgColors = [
  { name: "빨강", value: "F75C7E" },
  { name: "주황", value: "F79C42" },
  { name: "노랑", value: "F7DF1E" },
  { name: "초록", value: "4EC9B0" },
  { name: "파랑", value: "3B82F6" },
  { name: "남색", value: "6366F1" },
  { name: "보라", value: "A855F7" },
  { name: "핑크", value: "EC4899" },
  { name: "하양", value: "FFFFFF" },
  { name: "회색", value: "6B7280" },
  { name: "검정", value: "000000" },
];

export const typingSvgAnimations = [
  { name: "한 번만 반복 (마지막 줄에서 멈춤)", value: "false" },
  { name: "무한 반복 (처음으로 돌아가기)", value: "true" },
];

export interface TypingSvgConfig {
  lines: string[];
  font: string;
  size: number;
  color: string;
  backgroundColor: string;
  center: boolean;
  vCenter: boolean;
  width: number;
  height: number;
  duration: number;
  pause: number;
  repeat: string;
  multiline: boolean;
}

export const defaultTypingSvgConfig: TypingSvgConfig = {
  lines: ["안녕하세요 👋", "Welcome to my profile"],
  font: "Fira+Code",
  size: 22,
  color: "F75C7E",
  backgroundColor: "00000000",
  center: true,
  vCenter: true,
  width: 435,
  height: 70,
  duration: 5000,
  pause: 1000,
  repeat: "true",
  multiline: false,
};

export function generateTypingSvgUrl(config: TypingSvgConfig): string {
  const params = new URLSearchParams({
    font: config.font,
    size: config.size.toString(),
    color: config.color,
    background: config.backgroundColor,
    center: config.center.toString(),
    vCenter: config.vCenter.toString(),
    width: config.width.toString(),
    height: config.height.toString(),
    duration: config.duration.toString(),
    pause: config.pause.toString(),
    lines: config.lines.join(";"),
    repeat: config.repeat,
    multiline: config.multiline.toString(),
  });

  return `https://readme-typing-svg.demolab.com?${params.toString()}`;
}

export function generateTypingSvgMarkdown(config: TypingSvgConfig): string {
  const url = generateTypingSvgUrl(config);
  return `<div align="center">\n  <img src="${url}" alt="Typing SVG" />\n</div>`;
}
