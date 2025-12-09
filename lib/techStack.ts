export interface Tech {
  name: string;
  shields: string;
  skill: string;
  color: string;
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
