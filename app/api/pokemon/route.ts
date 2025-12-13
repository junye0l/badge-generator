import { NextRequest, NextResponse } from 'next/server';
import {
  findEvolutionChain,
  getEvolutionStage,
  getPokemonGifUrl,
  getCommitsToNextEvolution,
  EVOLUTION_THRESHOLDS,
  TYPE_COLORS,
} from '@/lib/pokemon';
import { getTotalCommits } from '@/lib/github';

// Edge runtime에서 redirect가 작동하지 않으므로 제거
// export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const username = searchParams.get('user');
  const chainId = searchParams.get('chain');

  // 파라미터 검증
  if (!username) {
    return new NextResponse('Missing username parameter', { status: 400 });
  }

  if (!chainId) {
    return new NextResponse('Missing chain parameter', { status: 400 });
  }

  // 진화 체인 찾기
  const evolutionChain = findEvolutionChain(chainId);
  if (!evolutionChain) {
    return new NextResponse('Invalid evolution chain', { status: 400 });
  }

  try {
    // GitHub 커밋 수 조회
    const totalCommits = await getTotalCommits(username);

    // 진화 단계 계산
    const stage = getEvolutionStage(totalCommits);
    const isShiny = stage === 3; // 4단계 (10,000+)는 Shiny

    // 실제 진화 단계 (Shiny는 3단계 포켓몬의 색만 다름)
    const actualStage = isShiny ? 2 : stage;
    const currentPokemon = evolutionChain.stages[actualStage];

    // 다음 진화까지 남은 커밋
    const commitsToNext = getCommitsToNextEvolution(totalCommits);

    // GIF URL 가져오기
    const gifUrl = getPokemonGifUrl(currentPokemon.id, isShiny);

    // GIF를 base64로 변환하여 임베드
    let gifBase64 = '';
    try {
      const gifResponse = await fetch(gifUrl);
      if (gifResponse.ok) {
        const gifBuffer = await gifResponse.arrayBuffer();
        gifBase64 = `data:image/gif;base64,${Buffer.from(gifBuffer).toString('base64')}`;
      }
    } catch (error) {
      console.error('Error fetching GIF:', error);
    }

    // SVG 카드 생성 (GIF 포함)
    const svg = generatePokemonCardSVG(
      gifBase64 || gifUrl, // base64 실패 시 원본 URL 사용
      currentPokemon.name,
      currentPokemon.type,
      totalCommits,
      commitsToNext,
      stage,
      isShiny
    );

    return new NextResponse(svg, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=3600', // 1시간 캐싱
      },
    });
  } catch (error) {
    console.error('Error generating Pokemon badge:', error);
    return new NextResponse('Error fetching user data', { status: 500 });
  }
}

function generatePokemonCardSVG(
  gifUrl: string,
  englishName: string,
  pokemonType: string,
  commits: number,
  commitsToNext: number | null,
  stage: number,
  isShiny: boolean
): string {
  // 타입 색상 가져오기
  const colors = TYPE_COLORS[pokemonType] || TYPE_COLORS.normal;

  // 다음 진화까지 필요한 전체 커밋 수 계산
  let totalNeeded = EVOLUTION_THRESHOLDS.STAGE_2; // 1단계: 3000
  if (stage === 1) {
    totalNeeded = EVOLUTION_THRESHOLDS.STAGE_3; // 2단계: 6000
  } else if (stage === 2) {
    totalNeeded = EVOLUTION_THRESHOLDS.SHINY; // 3단계: 10000
  }

  // 커밋 표시 텍스트 (현재 / 전체)
  let commitText = '';
  if (commitsToNext === null) {
    commitText = 'MAX LEVEL';
  } else if (commitsToNext === -1) {
    commitText = `${commits.toLocaleString()} / ???`;
  } else {
    commitText = `${commits.toLocaleString()} / ${totalNeeded.toLocaleString()}`;
  }

  const shinyBadge = isShiny ? ' ✨' : '';
  const typeBadge = pokemonType.toUpperCase();

  return `
<svg width="300" height="450" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <!-- 타입 기반 그라디언트 -->
    <linearGradient id="cardGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:${colors.primary};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${colors.secondary};stop-opacity:1" />
    </linearGradient>
    <linearGradient id="innerGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:rgb(250,250,250);stop-opacity:1" />
      <stop offset="100%" style="stop-color:rgb(235,235,235);stop-opacity:1" />
    </linearGradient>
    <!-- 샤이니 효과 -->
    <filter id="shinyGlow">
      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

  <!-- 카드 외곽 테두리 (타입 색상) -->
  <rect width="300" height="450" rx="15" fill="url(#cardGrad)" stroke="${colors.border}" stroke-width="4"/>

  <!-- 내부 카드 -->
  <rect x="12" y="12" width="276" height="426" rx="12" fill="url(#innerGrad)" stroke="${colors.border}" stroke-width="2"/>

  <!-- 타입 배지 -->
  <rect x="20" y="20" width="80" height="24" rx="12" fill="${colors.primary}" stroke="${colors.border}" stroke-width="2"/>
  <text x="60" y="36" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="white" text-anchor="middle">
    ${typeBadge}
  </text>

  <!-- 포켓몬 이름 -->
  <text x="150" y="65" font-family="'Courier New', monospace" font-size="26" font-weight="bold" fill="#222" text-anchor="middle" ${isShiny ? 'filter="url(#shinyGlow)"' : ''}>
    ${englishName}${shinyBadge}
  </text>

  <!-- 포켓몬 GIF 영역 (그림자 효과) -->
  <rect x="50" y="85" width="200" height="200" rx="10" fill="white" stroke="${colors.border}" stroke-width="3" style="filter: drop-shadow(0 4px 8px rgba(0,0,0,0.2));"/>
  <image x="65" y="100" width="170" height="170" href="${gifUrl}" style="image-rendering: pixelated;"/>

  <!-- 커밋 정보 박스 -->
  <rect x="30" y="310" width="240" height="110" rx="10" fill="white" stroke="${colors.border}" stroke-width="3" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.15));"/>

  <!-- 커밋 라벨 -->
  <text x="150" y="335" font-family="Arial, sans-serif" font-size="14" font-weight="600" fill="#666" text-anchor="middle">
    COMMITS
  </text>

  <!-- 커밋 수 표시 (현재 / 전체) -->
  <text x="150" y="375" font-family="'Courier New', monospace" font-size="28" font-weight="bold" fill="${colors.primary}" text-anchor="middle">
    ${commitText}
  </text>

  <!-- 진화 프로그레스 바 -->
  ${commitsToNext !== null && commitsToNext !== -1 ? `
  <rect x="50" y="395" width="200" height="8" rx="4" fill="#e0e0e0"/>
  <rect x="50" y="395" width="${Math.min((commits % (totalNeeded === 3000 ? 3000 : totalNeeded === 6000 ? 3000 : 4000)) / (totalNeeded === 3000 ? 3000 : totalNeeded === 6000 ? 3000 : 4000) * 200, 200)}" height="8" rx="4" fill="${colors.primary}"/>
  ` : ''}
</svg>
  `.trim();
}
