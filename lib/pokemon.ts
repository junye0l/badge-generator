// 포켓몬 진화 체인 데이터
export interface PokemonEvolution {
  id: number;
  name: string;
  koreanName: string;
  type: string; // 포켓몬 타입
}

export interface EvolutionChain {
  id: string;
  name: string;
  type: string; // 진화 라인의 타입
  stages: [PokemonEvolution, PokemonEvolution, PokemonEvolution]; // 3단계 진화
}

// 포켓몬 타입별 색상
export const TYPE_COLORS: Record<string, { primary: string; secondary: string; border: string }> = {
  electric: { primary: '#F7D02C', secondary: '#F0C108', border: '#D4A017' },
  fire: { primary: '#F08030', secondary: '#DD6610', border: '#C85010' },
  water: { primary: '#6890F0', secondary: '#4A7FC8', border: '#3862A8' },
  grass: { primary: '#78C850', secondary: '#5CA935', border: '#4A8A28' },
  psychic: { primary: '#F85888', secondary: '#E0457C', border: '#C83668' },
  ghost: { primary: '#705898', secondary: '#5A467C', border: '#4A3860' },
  dragon: { primary: '#7038F8', secondary: '#5A2AE0', border: '#4A1FC8' },
  normal: { primary: '#A8A878', secondary: '#8A8A60', border: '#707048' },
};

// 진화 임계값 (커밋 수)
export const EVOLUTION_THRESHOLDS = {
  STAGE_1: 0,      // 1단계: 0 ~ 2,999
  STAGE_2: 3000,   // 2단계: 3,000 ~ 5,999
  STAGE_3: 6000,   // 3단계: 6,000 ~ 9,999
  SHINY: 10000,    // 4단계: 10,000+ (Shiny - 숨김)
};

// 인기 있는 포켓몬 진화 라인
export const evolutionChains: EvolutionChain[] = [
  {
    id: 'pikachu',
    name: 'Pikachu Line',
    type: 'electric',
    stages: [
      { id: 172, name: 'Pichu', koreanName: '피츄', type: 'electric' },
      { id: 25, name: 'Pikachu', koreanName: '피카츄', type: 'electric' },
      { id: 26, name: 'Raichu', koreanName: '라이츄', type: 'electric' },
    ],
  },
  {
    id: 'charmander',
    name: 'Charmander Line',
    type: 'fire',
    stages: [
      { id: 4, name: 'Charmander', koreanName: '파이리', type: 'fire' },
      { id: 5, name: 'Charmeleon', koreanName: '리자드', type: 'fire' },
      { id: 6, name: 'Charizard', koreanName: '리자몽', type: 'fire' },
    ],
  },
  {
    id: 'squirtle',
    name: 'Squirtle Line',
    type: 'water',
    stages: [
      { id: 7, name: 'Squirtle', koreanName: '꼬부기', type: 'water' },
      { id: 8, name: 'Wartortle', koreanName: '어니부기', type: 'water' },
      { id: 9, name: 'Blastoise', koreanName: '거북왕', type: 'water' },
    ],
  },
  {
    id: 'bulbasaur',
    name: 'Bulbasaur Line',
    type: 'grass',
    stages: [
      { id: 1, name: 'Bulbasaur', koreanName: '이상해씨', type: 'grass' },
      { id: 2, name: 'Ivysaur', koreanName: '이상해풀', type: 'grass' },
      { id: 3, name: 'Venusaur', koreanName: '이상해꽃', type: 'grass' },
    ],
  },
  {
    id: 'eevee',
    name: 'Eevee Line',
    type: 'normal',
    stages: [
      { id: 133, name: 'Eevee', koreanName: '이브이', type: 'normal' },
      { id: 134, name: 'Vaporeon', koreanName: '샤미드', type: 'water' },
      { id: 135, name: 'Jolteon', koreanName: '쥬피썬더', type: 'electric' },
    ],
  },
  {
    id: 'dratini',
    name: 'Dratini Line',
    type: 'dragon',
    stages: [
      { id: 147, name: 'Dratini', koreanName: '미뇽', type: 'dragon' },
      { id: 148, name: 'Dragonair', koreanName: '신뇽', type: 'dragon' },
      { id: 149, name: 'Dragonite', koreanName: '망나뇽', type: 'dragon' },
    ],
  },
  {
    id: 'gastly',
    name: 'Gastly Line',
    type: 'ghost',
    stages: [
      { id: 92, name: 'Gastly', koreanName: '고오스', type: 'ghost' },
      { id: 93, name: 'Haunter', koreanName: '고우스트', type: 'ghost' },
      { id: 94, name: 'Gengar', koreanName: '팬텀', type: 'ghost' },
    ],
  },
  {
    id: 'abra',
    name: 'Abra Line',
    type: 'psychic',
    stages: [
      { id: 63, name: 'Abra', koreanName: '캐이시', type: 'psychic' },
      { id: 64, name: 'Kadabra', koreanName: '윤겔라', type: 'psychic' },
      { id: 65, name: 'Alakazam', koreanName: '후딘', type: 'psychic' },
    ],
  },
];

// 진화 단계 계산
export function getEvolutionStage(commits: number): 0 | 1 | 2 | 3 {
  if (commits >= EVOLUTION_THRESHOLDS.SHINY) return 3; // Shiny (최종)
  if (commits >= EVOLUTION_THRESHOLDS.STAGE_3) return 2; // 3단계
  if (commits >= EVOLUTION_THRESHOLDS.STAGE_2) return 1; // 2단계
  return 0; // 1단계
}

// 진화 체인 찾기
export function findEvolutionChain(chainId: string): EvolutionChain | undefined {
  return evolutionChains.find((chain) => chain.id === chainId);
}

// 포켓몬 GIF URL 생성
export function getPokemonGifUrl(pokemonId: number, isShiny: boolean = false): string {
  const shinyPath = isShiny ? 'shiny/' : '';
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${shinyPath}${pokemonId}.gif`;
}

// 다음 진화까지 남은 커밋 계산
export function getCommitsToNextEvolution(commits: number): number | null {
  if (commits < EVOLUTION_THRESHOLDS.STAGE_2) {
    return EVOLUTION_THRESHOLDS.STAGE_2 - commits;
  }
  if (commits < EVOLUTION_THRESHOLDS.STAGE_3) {
    return EVOLUTION_THRESHOLDS.STAGE_3 - commits;
  }
  if (commits < EVOLUTION_THRESHOLDS.SHINY) {
    return -1; // Shiny는 숨김 (??? 표시)
  }
  return null; // 최종 진화 완료
}
