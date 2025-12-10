export interface Tech {
  name: string;
  shields: string;
  skill: string;
  color: string;
}

export interface SocialMedia {
  name: string;
  shields: string;
  color: string;
  url: string;
}

export interface TechStack {
  [category: string]: Tech[];
}

export const techStack: TechStack = {
  Frontend: [
    { name: "React", shields: "react", skill: "react", color: "61DAFB" },
    { name: "Vue.js", shields: "vuedotjs", skill: "vue", color: "4FC08D" },
    { name: "TypeScript", shields: "typescript", skill: "ts", color: "3178C6" },
    { name: "JavaScript", shields: "javascript", skill: "js", color: "F7DF1E" },
    { name: "Next.js", shields: "nextdotjs", skill: "nextjs", color: "000000" },
    {
      name: "Tailwind",
      shields: "tailwindcss",
      skill: "tailwind",
      color: "06B6D4",
    },
    { name: "HTML5", shields: "html5", skill: "html", color: "E34F26" },
    { name: "CSS3", shields: "css3", skill: "css", color: "1572B6" },
  ],
  Backend: [
    { name: "Node.js", shields: "nodedotjs", skill: "nodejs", color: "339933" },
    { name: "Express", shields: "express", skill: "express", color: "000000" },
    { name: "Python", shields: "python", skill: "py", color: "3776AB" },
    { name: "Django", shields: "django", skill: "django", color: "092E20" },
    { name: "FastAPI", shields: "fastapi", skill: "fastapi", color: "009688" },
  ],
  Database: [
    { name: "MongoDB", shields: "mongodb", skill: "mongodb", color: "47A248" },
    {
      name: "PostgreSQL",
      shields: "postgresql",
      skill: "postgres",
      color: "4169E1",
    },
    { name: "MySQL", shields: "mysql", skill: "mysql", color: "4479A1" },
    { name: "Redis", shields: "redis", skill: "redis", color: "DC382D" },
  ],
  Tools: [
    { name: "Git", shields: "git", skill: "git", color: "F05032" },
    { name: "GitHub", shields: "github", skill: "github", color: "181717" },
    { name: "Docker", shields: "docker", skill: "docker", color: "2496ED" },
    { name: "Figma", shields: "figma", skill: "figma", color: "F24E1E" },
    {
      name: "VS Code",
      shields: "visualstudiocode",
      skill: "vscode",
      color: "007ACC",
    },
  ],
};

export const socialMedia: SocialMedia[] = [
  {
    name: "GitHub",
    shields: "github",
    color: "181717",
    url: "https://github.com/USERNAME",
  },
  {
    name: "LinkedIn",
    shields: "linkedin",
    color: "0077B5",
    url: "https://linkedin.com/in/USERNAME",
  },
  {
    name: "X",
    shields: "X",
    color: "000000",
    url: "https://x.com/USERNAME",
  },
  {
    name: "Instagram",
    shields: "Instagram",
    color: "E4405F",
    url: "https://instagram.com/USERNAME",
  },
  {
    name: "Facebook",
    shields: "Facebook",
    color: "1877F2",
    url: "https://facebook.com/USERNAME",
  },
  {
    name: "YouTube",
    shields: "YouTube",
    color: "FF0000",
    url: "https://youtube.com/@USERNAME",
  },
  {
    name: "Discord",
    shields: "discord",
    color: "5865F2",
    url: "https://discord.com/users/USERID",
  },
  {
    name: "Gmail",
    shields: "gmail",
    color: "D14836",
    url: "mailto:your.email@gmail.com",
  },
  {
    name: "Telegram",
    shields: "telegram",
    color: "2CA5E0",
    url: "https://t.me/USERNAME",
  },
  {
    name: "Slack",
    shields: "slack",
    color: "4A154B",
    url: "https://slack.com",
  },
  {
    name: "Reddit",
    shields: "reddit",
    color: "FF4500",
    url: "https://reddit.com/user/USERNAME",
  },
  {
    name: "TikTok",
    shields: "TikTok",
    color: "000000",
    url: "https://tiktok.com/@USERNAME",
  },
  {
    name: "Twitch",
    shields: "Twitch",
    color: "9146FF",
    url: "https://twitch.tv/USERNAME",
  },
  {
    name: "Threads",
    shields: "Threads",
    color: "000000",
    url: "https://threads.net/@USERNAME",
  },
  {
    name: "Bluesky",
    shields: "Bluesky",
    color: "0285FF",
    url: "https://bsky.app/profile/USERNAME",
  },
  {
    name: "Mastodon",
    shields: "mastodon",
    color: "2B90D9",
    url: "https://mastodon.social/@USERNAME",
  },
  {
    name: "WhatsApp",
    shields: "whatsapp",
    color: "25D366",
    url: "https://wa.me/PHONENUMBER",
  },
  {
    name: "Messenger",
    shields: "messenger",
    color: "00B2FF",
    url: "https://m.me/USERNAME",
  },
  {
    name: "WeChat",
    shields: "wechat",
    color: "07C160",
    url: "https://wechat.com",
  },
  {
    name: "KakaoTalk",
    shields: "kakaotalk",
    color: "ffcd00",
    url: "https://open.kakao.com",
  },
  {
    name: "Line",
    shields: "line",
    color: "00C300",
    url: "https://line.me",
  },
  {
    name: "Snapchat",
    shields: "Snapchat",
    color: "FFFC00",
    url: "https://snapchat.com/add/USERNAME",
  },
  {
    name: "Pinterest",
    shields: "Pinterest",
    color: "E60023",
    url: "https://pinterest.com/USERNAME",
  },
  {
    name: "Tumblr",
    shields: "Tumblr",
    color: "36465D",
    url: "https://USERNAME.tumblr.com",
  },
  {
    name: "Velog",
    shields: "velog",
    color: "20C997",
    url: "https://velog.io/@USERNAME",
  },
  {
    name: "Tistory",
    shields: "tistory",
    color: "000000",
    url: "https://USERNAME.tistory.com",
  },
  {
    name: "Medium",
    shields: "medium",
    color: "12100E",
    url: "https://medium.com/@USERNAME",
  },
  {
    name: "Notion",
    shields: "Notion",
    color: "000000",
    url: "https://notion.so/USERNAME",
  },
];
