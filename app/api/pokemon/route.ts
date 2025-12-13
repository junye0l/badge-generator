import { NextRequest, NextResponse } from 'next/server';
import {
  findEvolutionChain,
  getEvolutionStage,
  getPokemonGifUrl,
  getCommitsToNextEvolution,
  EVOLUTION_THRESHOLDS,
  TYPE_COLORS,
  POKEMON_GENERATIONS,
} from '@/lib/pokemon';
import { getTotalCommits } from '@/lib/github';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const username = searchParams.get('user');
  const gen = searchParams.get('gen'); // 세대 선택 (gen1, gen2, gen3)
  const starter = searchParams.get('starter'); // 시작 포켓몬 ID
  const chainId = searchParams.get('chain'); // 하위 호환용

  if (!username) {
    return new NextResponse('Missing username parameter', { status: 400 });
  }

  let evolutionChain;

  // 새로운 방식: gen + starter
  if (gen && starter) {
    const generation = POKEMON_GENERATIONS[gen];
    if (!generation) {
      return new NextResponse('Invalid generation. Use gen1, gen2, or gen3', { status: 400 });
    }

    evolutionChain = generation.chains.find((chain) => chain.id === starter);
    if (!evolutionChain) {
      return new NextResponse(`Invalid starter Pokemon for ${gen}`, { status: 400 });
    }
  }
  // 하위 호환: 기존 chain 방식
  else if (chainId) {
    evolutionChain = findEvolutionChain(chainId);
    if (!evolutionChain) {
      return new NextResponse('Invalid evolution chain', { status: 400 });
    }
  }
  // 파라미터 부족
  else {
    return new NextResponse('Missing parameters. Use gen+starter or chain', { status: 400 });
  }

  try {
    const totalCommits = await getTotalCommits(username);

    const stage = getEvolutionStage(totalCommits);
    const isShiny = stage === 3;

    const actualStage = isShiny ? 2 : stage;
    const stageIndex = Math.max(0, Math.min(actualStage, evolutionChain.stages.length - 1));
    const currentPokemon = evolutionChain.stages[stageIndex];
    const isLegendaryChain = Boolean(evolutionChain.isLegendary);

    const commitsToNext = getCommitsToNextEvolution(totalCommits);

    const gifUrl = getPokemonGifUrl(currentPokemon.id, isShiny);

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

    const svg = generatePokemonCardSVG(
      gifBase64 || gifUrl,
      currentPokemon.name,
      currentPokemon.type,
      totalCommits,
      commitsToNext,
      stage,
      isShiny,
      isLegendaryChain
    );

    return new NextResponse(svg, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        Pragma: 'no-cache',
        Expires: '0',
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
  isShiny: boolean,
  isLegendary: boolean
): string {
  const colors = TYPE_COLORS[pokemonType] || TYPE_COLORS.normal;
  const borderColor = isLegendary ? '#f4c56a' : colors.border;
  const accentPrimary = isLegendary ? '#f5a623' : colors.primary;
  const accentSecondary = isLegendary ? '#fde08d' : colors.secondary;

  let totalNeeded = EVOLUTION_THRESHOLDS.STAGE_2;
  if (stage === 1) {
    totalNeeded = EVOLUTION_THRESHOLDS.STAGE_3;
  } else if (stage === 2) {
    totalNeeded = EVOLUTION_THRESHOLDS.SHINY;
  }

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
<svg width="200" height="280" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="cardGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:${accentPrimary};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${accentSecondary};stop-opacity:1" />
    </linearGradient>
    <linearGradient id="innerGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:rgb(250,250,250);stop-opacity:1" />
      <stop offset="100%" style="stop-color:rgb(235,235,235);stop-opacity:1" />
    </linearGradient>
    ${isLegendary ? `
    <linearGradient id="legendaryBorder" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#fff4d2;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#f2b566;stop-opacity:1" />
    </linearGradient>
    <filter id="legendaryGlow">
      <feGaussianBlur stdDeviation="2.8" result="glow"/>
      <feMerge>
        <feMergeNode in="glow"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    ` : ''}
    <filter id="shinyGlow">
      <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    <clipPath id="gifClip">
      <rect x="35" y="54" width="130" height="130" rx="6"/>
    </clipPath>
  </defs>

  <rect width="200" height="280" rx="10" fill="url(#cardGrad)" stroke="${isLegendary ? 'url(#legendaryBorder)' : borderColor}" stroke-width="2.5"${isLegendary ? ' filter="url(#legendaryGlow)"' : ''}/>

  <rect x="8" y="8" width="184" height="264" rx="8" fill="url(#innerGrad)" stroke="${borderColor}" stroke-width="1.5"/>

  <rect x="12" y="12" width="45" height="14" rx="7" fill="${colors.primary}" stroke="${borderColor}" stroke-width="1.5"/>
  <text x="34.5" y="22" font-family="Arial, sans-serif" font-size="7" font-weight="bold" fill="white" text-anchor="middle">
    ${typeBadge}
  </text>

  <text x="100" y="42" font-family="'Courier New', monospace" font-size="16" font-weight="bold" fill="#222" text-anchor="middle" ${isShiny ? 'filter="url(#shinyGlow)"' : ''}>
    ${englishName}${shinyBadge}
  </text>

  <rect x="35" y="54" width="130" height="130" rx="6" fill="white" stroke="${borderColor}" stroke-width="2" style="filter: drop-shadow(0 4px 8px rgba(0,0,0,0.25));"/>

  <g clip-path="url(#gifClip)">
    <ellipse cx="100" cy="170" rx="45" ry="6" fill="rgba(0,0,0,0.12)"/>

    <rect x="40" y="59" width="50" height="30" rx="4" fill="rgba(255,255,255,0.3)" opacity="0.6"/>

    <image x="45" y="64" width="110" height="110" href="${gifUrl}" style="image-rendering: pixelated;"/>
  </g>

  ${isLegendary ? `
  <g opacity="0.35">
    <circle cx="60" cy="80" r="2.2" fill="#fff"/>
    <circle cx="145" cy="95" r="1.5" fill="#fff"/>
    <circle cx="90" cy="130" r="1.8" fill="#fff"/>
  </g>
  ` : ''}

  <rect x="20" y="196" width="160" height="68" rx="6" fill="white" stroke="${borderColor}" stroke-width="2" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.15));"/>

  <text x="100" y="212" font-family="Arial, sans-serif" font-size="9" font-weight="600" fill="#666" text-anchor="middle">
    COMMITS
  </text>

  <text x="100" y="238" font-family="'Courier New', monospace" font-size="18" font-weight="bold" fill="${accentPrimary}" text-anchor="middle">
    ${commitText}
  </text>

  ${commitsToNext !== -1 ? `
  <rect x="35" y="252" width="130" height="5" rx="2.5" fill="#e0e0e0"/>
  <rect x="35" y="252" width="${commitsToNext === null ? 130 : Math.min((commits % (totalNeeded === 3000 ? 3000 : totalNeeded === 6000 ? 3000 : 4000)) / (totalNeeded === 3000 ? 3000 : totalNeeded === 6000 ? 3000 : 4000) * 130, 130)}" height="5" rx="2.5" fill="${accentPrimary}"/>
  ` : ''}
</svg>
  `.trim();
}
