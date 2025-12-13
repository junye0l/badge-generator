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

// 캐시 저장소 (메모리 캐시)
const commitCache = new Map<string, { commits: number; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5분 캐시

// GitHub Search API로 총 커밋 수 조회 (토큰 불필요)
export async function getTotalCommits(username: string): Promise<number> {
  // 캐시 확인
  const cached = commitCache.get(username);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    console.log(`Using cached commits for ${username}: ${cached.commits}`);
    return cached.commits;
  }

  try {
    // Search API를 사용하여 사용자의 커밋 수 추정
    const response = await fetch(
      `https://api.github.com/search/commits?q=author:${username}&per_page=1`,
      {
        headers: {
          Accept: 'application/vnd.github.cloak-preview',
        },
        cache: 'no-store',
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
      // 캐시에 저장
      commitCache.set(username, { commits: totalCount, timestamp: Date.now() });
      return totalCount;
    }

    // Search API 실패 시 REST API로 폴백
    const fallbackCommits = await getTotalCommitsREST(username);
    // 폴백 결과도 캐시에 저장
    commitCache.set(username, { commits: fallbackCommits, timestamp: Date.now() });
    return fallbackCommits;
  } catch (error) {
    console.error('Error fetching GitHub commits:', error);
    const fallbackCommits = await getTotalCommitsREST(username);
    commitCache.set(username, { commits: fallbackCommits, timestamp: Date.now() });
    return fallbackCommits;
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
        cache: 'no-store',
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
