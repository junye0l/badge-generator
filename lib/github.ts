// GitHub API를 사용하여 사용자의 총 커밋 수 조회

interface GitHubEvent {
  type: string;
  payload?: {
    commits?: unknown[];
  };
}

interface GitHubRepo {
  name: string;
  owner: {
    login: string;
  };
}

// GitHub Search API로 총 커밋 수 조회 (토큰 불필요)
export async function getTotalCommits(username: string): Promise<number> {
  try {
    // Search API를 사용하여 사용자의 커밋 수 추정
    const response = await fetch(
      `https://api.github.com/search/commits?q=author:${username}&per_page=1`,
      {
        headers: {
          Accept: 'application/vnd.github.cloak-preview',
        },
        next: { revalidate: 3600 }, // 1시간 캐싱
      }
    );

    if (!response.ok) {
      console.error(`GitHub Search API error: ${response.status}`);
      return getTotalCommitsREST(username);
    }

    const data = await response.json();
    const totalCount = data.total_count || 0;

    // Search API는 최대 1000까지만 정확하므로, 1000 이상이면 대략적인 값
    if (totalCount > 0) {
      return totalCount;
    }

    // Search API 실패 시 REST API로 폴백
    return getTotalCommitsREST(username);
  } catch (error) {
    console.error('Error fetching GitHub commits:', error);
    return getTotalCommitsREST(username);
  }
}

// REST API 폴백 (GraphQL 실패 시)
async function getTotalCommitsREST(username: string): Promise<number> {
  try {
    // 사용자의 최근 이벤트에서 커밋 추정
    const response = await fetch(
      `https://api.github.com/users/${username}/events/public?per_page=100`,
      {
        headers: {
          Accept: 'application/vnd.github.v3+json',
        },
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const events: GitHubEvent[] = await response.json();

    // PushEvent에서 커밋 수 카운트 (최근 이벤트만 - 정확하지 않음)
    let commits = 0;
    events.forEach((event) => {
      if (event.type === 'PushEvent' && event.payload?.commits) {
        commits += event.payload.commits.length;
      }
    });

    // 최소값 보장 (이벤트 기반은 부정확하므로)
    return Math.max(commits, 100);
  } catch (error) {
    console.error('Error fetching commits via REST API:', error);
    return 0;
  }
}

// GitHub 사용자 존재 여부 확인
export async function checkUserExists(username: string): Promise<boolean> {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Accept: 'application/vnd.github.v3+json',
      },
      next: { revalidate: 86400 }, // 24시간 캐싱
    });

    return response.ok;
  } catch {
    return false;
  }
}
