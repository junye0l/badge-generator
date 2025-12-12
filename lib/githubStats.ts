export interface GitHubStatsConfig {
  username: string;
  theme: string;
  showIcons: boolean;
  hideBorder: boolean;
  includePrivate: boolean;
  hideStats: {
    stars: boolean;
    commits: boolean;
    prs: boolean;
    issues: boolean;
    contribs: boolean;
  };
}

export const defaultGitHubStatsConfig: GitHubStatsConfig = {
  username: "",
  theme: "default",
  showIcons: true,
  hideBorder: false,
  includePrivate: false,
  hideStats: {
    stars: false,
    commits: false,
    prs: false,
    issues: false,
    contribs: false,
  },
};

export const themes = [
  "default",
  "transparent",
  "dark",
  "radical",
  "merko",
  "gruvbox",
  "tokyonight",
  "onedark",
  "cobalt",
  "synthwave",
  "highcontrast",
  "dracula",
];

export function generateGitHubStatsUrl(config: GitHubStatsConfig): string {
  if (!config.username) {
    return "";
  }

  const params = new URLSearchParams();
  params.append("username", config.username);

  if (config.theme !== "default") {
    params.append("theme", config.theme);
  }

  if (config.showIcons) {
    params.append("show_icons", "true");
  }

  if (config.hideBorder) {
    params.append("hide_border", "true");
  }

  if (config.includePrivate) {
    params.append("count_private", "true");
  }

  const hideStatsArray: string[] = [];
  Object.entries(config.hideStats).forEach(([stat, hidden]) => {
    if (hidden) {
      hideStatsArray.push(stat);
    }
  });

  if (hideStatsArray.length > 0) {
    params.append("hide", hideStatsArray.join(","));
  }

  return `https://github-readme-stats-sigma-five.vercel.app/api?${params.toString()}`;
}

export function generateGitHubStatsMarkdown(config: GitHubStatsConfig): string {
  if (!config.username) {
    return "";
  }

  const url = generateGitHubStatsUrl(config);
  let markdown = "# GitHub Stats\n\n";
  markdown += '<div align="center">\n\n';
  markdown += `<img src="${url}" alt="GitHub Stats" />\n`;
  markdown += "\n</div>\n";

  return markdown;
}
