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
  stages: PokemonEvolution[]; // 1~N단계 진화
  isLegendary?: boolean;
}

export interface GenerationData {
  name: string;
  chains: EvolutionChain[];
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
  fighting: { primary: '#C03028', secondary: '#A02820', border: '#802018' },
  flying: { primary: '#A890F0', secondary: '#8A70D8', border: '#7058C0' },
  poison: { primary: '#A040A0', secondary: '#803080', border: '#602060' },
  ground: { primary: '#E0C068', secondary: '#C8A850', border: '#A88838' },
  rock: { primary: '#B8A038', secondary: '#A08828', border: '#887020' },
  bug: { primary: '#A8B820', secondary: '#88A010', border: '#708808' },
  steel: { primary: '#B8B8D0', secondary: '#A0A0B8', border: '#8888A0' },
  ice: { primary: '#98D8D8', secondary: '#78C0C0', border: '#58A8A8' },
  dark: { primary: '#705848', secondary: '#584838', border: '#403028' },
  fairy: { primary: '#EE99AC', secondary: '#D67894', border: '#BE587C' },
};

// 진화 임계값 (커밋 수)
export const EVOLUTION_THRESHOLDS = {
  STAGE_1: 0,      // 1단계: 0 ~ 2,999
  STAGE_2: 3000,   // 2단계: 3,000 ~ 5,999
  STAGE_3: 6000,   // 3단계: 6,000 ~ 9,999
  SHINY: 10000,    // 4단계: 10,000+ (Shiny - 숨김)
};

// 1세대 (Kanto) 진화 라인
const gen1Chains: EvolutionChain[] = [
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
    id: 'caterpie',
    name: 'Caterpie Line',
    type: 'bug',
    stages: [
      { id: 10, name: 'Caterpie', koreanName: '캐터피', type: 'bug' },
      { id: 11, name: 'Metapod', koreanName: '단데기', type: 'bug' },
      { id: 12, name: 'Butterfree', koreanName: '버터플', type: 'bug' },
    ],
  },
  {
    id: 'weedle',
    name: 'Weedle Line',
    type: 'bug',
    stages: [
      { id: 13, name: 'Weedle', koreanName: '뿔충이', type: 'bug' },
      { id: 14, name: 'Kakuna', koreanName: '딱충이', type: 'bug' },
      { id: 15, name: 'Beedrill', koreanName: '독침붕', type: 'bug' },
    ],
  },
  {
    id: 'pidgey',
    name: 'Pidgey Line',
    type: 'flying',
    stages: [
      { id: 16, name: 'Pidgey', koreanName: '구구', type: 'flying' },
      { id: 17, name: 'Pidgeotto', koreanName: '피죤', type: 'flying' },
      { id: 18, name: 'Pidgeot', koreanName: '피죤투', type: 'flying' },
    ],
  },
  {
    id: 'zubat',
    name: 'Zubat Line',
    type: 'poison',
    stages: [
      { id: 41, name: 'Zubat', koreanName: '주뱃', type: 'poison' },
      { id: 42, name: 'Golbat', koreanName: '골뱃', type: 'poison' },
      { id: 169, name: 'Crobat', koreanName: '크로뱃', type: 'poison' },
    ],
  },
  {
    id: 'bellsprout',
    name: 'Bellsprout Line',
    type: 'grass',
    stages: [
      { id: 69, name: 'Bellsprout', koreanName: '모다피', type: 'grass' },
      { id: 70, name: 'Weepinbell', koreanName: '우츠동', type: 'grass' },
      { id: 71, name: 'Victreebel', koreanName: '우츠보트', type: 'grass' },
    ],
  },
  {
    id: 'slowpoke',
    name: 'Slowpoke Line',
    type: 'water',
    stages: [
      { id: 79, name: 'Slowpoke', koreanName: '야돈', type: 'water' },
      { id: 80, name: 'Slowbro', koreanName: '야도란', type: 'water' },
      { id: 199, name: 'Slowking', koreanName: '야도킹', type: 'water' },
    ],
  },
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
    id: 'voltorb',
    name: 'Voltorb Line',
    type: 'electric',
    stages: [
      { id: 100, name: 'Voltorb', koreanName: '찌리리공', type: 'electric' },
      { id: 101, name: 'Electrode', koreanName: '붐볼', type: 'electric' },
      { id: 82, name: 'Magneton', koreanName: '레어코일', type: 'electric' },
    ],
  },
  {
    id: 'nidoran-f',
    name: 'Nidoran♀ Line',
    type: 'poison',
    stages: [
      { id: 29, name: 'Nidoran♀', koreanName: '니드런♀', type: 'poison' },
      { id: 30, name: 'Nidorina', koreanName: '니드리나', type: 'poison' },
      { id: 31, name: 'Nidoqueen', koreanName: '니드퀸', type: 'poison' },
    ],
  },
  {
    id: 'nidoran-m',
    name: 'Nidoran♂ Line',
    type: 'poison',
    stages: [
      { id: 32, name: 'Nidoran♂', koreanName: '니드런♂', type: 'poison' },
      { id: 33, name: 'Nidorino', koreanName: '니드리노', type: 'poison' },
      { id: 34, name: 'Nidoking', koreanName: '니드킹', type: 'poison' },
    ],
  },
  {
    id: 'oddish',
    name: 'Oddish Line',
    type: 'grass',
    stages: [
      { id: 43, name: 'Oddish', koreanName: '뚜벅쵸', type: 'grass' },
      { id: 44, name: 'Gloom', koreanName: '냄새꼬', type: 'grass' },
      { id: 45, name: 'Vileplume', koreanName: '라플레시아', type: 'grass' },
    ],
  },
  {
    id: 'poliwag',
    name: 'Poliwag Line',
    type: 'water',
    stages: [
      { id: 60, name: 'Poliwag', koreanName: '발챙이', type: 'water' },
      { id: 61, name: 'Poliwhirl', koreanName: '슈륙챙이', type: 'water' },
      { id: 62, name: 'Poliwrath', koreanName: '강챙이', type: 'water' },
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
  {
    id: 'machop',
    name: 'Machop Line',
    type: 'fighting',
    stages: [
      { id: 66, name: 'Machop', koreanName: '알통몬', type: 'fighting' },
      { id: 67, name: 'Machoke', koreanName: '근육몬', type: 'fighting' },
      { id: 68, name: 'Machamp', koreanName: '괴력몬', type: 'fighting' },
    ],
  },
  {
    id: 'geodude',
    name: 'Geodude Line',
    type: 'rock',
    stages: [
      { id: 74, name: 'Geodude', koreanName: '꼬마돌', type: 'rock' },
      { id: 75, name: 'Graveler', koreanName: '데구리', type: 'rock' },
      { id: 76, name: 'Golem', koreanName: '딱구리', type: 'rock' },
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
    id: 'eevee-vaporeon',
    name: 'Eevee Line (Vaporeon)',
    type: 'water',
    stages: [
      { id: 133, name: 'Eevee', koreanName: '이브이', type: 'normal' },
      { id: 134, name: 'Vaporeon', koreanName: '샤미드', type: 'water' },
    ],
  },
  {
    id: 'eevee-jolteon',
    name: 'Eevee Line (Jolteon)',
    type: 'electric',
    stages: [
      { id: 133, name: 'Eevee', koreanName: '이브이', type: 'normal' },
      { id: 135, name: 'Jolteon', koreanName: '쥬피썬더', type: 'electric' },
    ],
  },
  {
    id: 'eevee-flareon',
    name: 'Eevee Line (Flareon)',
    type: 'fire',
    stages: [
      { id: 133, name: 'Eevee', koreanName: '이브이', type: 'normal' },
      { id: 136, name: 'Flareon', koreanName: '부스터', type: 'fire' },
    ],
  },
];

// 2세대 (Johto) 진화 라인
const gen2Chains: EvolutionChain[] = [
  {
    id: 'chikorita',
    name: 'Chikorita Line',
    type: 'grass',
    stages: [
      { id: 152, name: 'Chikorita', koreanName: '치코리타', type: 'grass' },
      { id: 153, name: 'Bayleef', koreanName: '베이리프', type: 'grass' },
      { id: 154, name: 'Meganium', koreanName: '메가니움', type: 'grass' },
    ],
  },
  {
    id: 'cyndaquil',
    name: 'Cyndaquil Line',
    type: 'fire',
    stages: [
      { id: 155, name: 'Cyndaquil', koreanName: '브케인', type: 'fire' },
      { id: 156, name: 'Quilava', koreanName: '마그케인', type: 'fire' },
      { id: 157, name: 'Typhlosion', koreanName: '블레이범', type: 'fire' },
    ],
  },
  {
    id: 'totodile',
    name: 'Totodile Line',
    type: 'water',
    stages: [
      { id: 158, name: 'Totodile', koreanName: '리아코', type: 'water' },
      { id: 159, name: 'Croconaw', koreanName: '엘리게이', type: 'water' },
      { id: 160, name: 'Feraligatr', koreanName: '장크로다일', type: 'water' },
    ],
  },
  {
    id: 'chinchou',
    name: 'Chinchou Line',
    type: 'electric',
    stages: [
      { id: 170, name: 'Chinchou', koreanName: '초라기', type: 'electric' },
      { id: 171, name: 'Lanturn', koreanName: '랜턴', type: 'electric' },
      { id: 125, name: 'Electabuzz', koreanName: '에레브', type: 'electric' },
    ],
  },
  {
    id: 'azurill-gen2',
    name: 'Azurill Line',
    type: 'normal',
    stages: [
      { id: 298, name: 'Azurill', koreanName: '루리리', type: 'normal' },
      { id: 183, name: 'Marill', koreanName: '마릴', type: 'water' },
      { id: 184, name: 'Azumarill', koreanName: '마릴리', type: 'water' },
    ],
  },
  {
    id: 'politoed',
    name: 'Poliwag Line (Politoed)',
    type: 'water',
    stages: [
      { id: 60, name: 'Poliwag', koreanName: '발챙이', type: 'water' },
      { id: 61, name: 'Poliwhirl', koreanName: '슈륙챙이', type: 'water' },
      { id: 186, name: 'Politoed', koreanName: '왕구리', type: 'water' },
    ],
  },
  {
    id: 'ledyba',
    name: 'Ledyba Line',
    type: 'bug',
    stages: [
      { id: 165, name: 'Ledyba', koreanName: '레디바', type: 'bug' },
      { id: 166, name: 'Ledian', koreanName: '레디안', type: 'bug' },
      { id: 212, name: 'Scizor', koreanName: '핫삼', type: 'bug' },
    ],
  },
  {
    id: 'mareep',
    name: 'Mareep Line',
    type: 'electric',
    stages: [
      { id: 179, name: 'Mareep', koreanName: '메리프', type: 'electric' },
      { id: 180, name: 'Flaaffy', koreanName: '보송송', type: 'electric' },
      { id: 181, name: 'Ampharos', koreanName: '전룡', type: 'electric' },
    ],
  },
  {
    id: 'hoppip',
    name: 'Hoppip Line',
    type: 'grass',
    stages: [
      { id: 187, name: 'Hoppip', koreanName: '통통코', type: 'grass' },
      { id: 188, name: 'Skiploom', koreanName: '두코', type: 'grass' },
      { id: 189, name: 'Jumpluff', koreanName: '솜솜코', type: 'grass' },
    ],
  },
  {
    id: 'slugma',
    name: 'Slugma Line',
    type: 'fire',
    stages: [
      { id: 218, name: 'Slugma', koreanName: '마그마그', type: 'fire' },
      { id: 219, name: 'Magcargo', koreanName: '마그카르고', type: 'fire' },
      { id: 126, name: 'Magmar', koreanName: '마그마', type: 'fire' },
    ],
  },
  {
    id: 'cleffa',
    name: 'Cleffa Line',
    type: 'fairy',
    stages: [
      { id: 173, name: 'Cleffa', koreanName: '삐', type: 'fairy' },
      { id: 35, name: 'Clefairy', koreanName: '삐삐', type: 'fairy' },
      { id: 36, name: 'Clefable', koreanName: '픽시', type: 'fairy' },
    ],
  },
  {
    id: 'tyrogue',
    name: 'Tyrogue Line',
    type: 'fighting',
    stages: [
      { id: 236, name: 'Tyrogue', koreanName: '배루키', type: 'fighting' },
      { id: 106, name: 'Hitmonlee', koreanName: '시라소몬', type: 'fighting' },
      { id: 237, name: 'Hitmontop', koreanName: '카포에라', type: 'fighting' },
    ],
  },
  {
    id: 'sentret',
    name: 'Sentret Line',
    type: 'normal',
    stages: [
      { id: 161, name: 'Sentret', koreanName: '꼬리선', type: 'normal' },
      { id: 162, name: 'Furret', koreanName: '다꼬리', type: 'normal' },
      { id: 233, name: 'Porygon2', koreanName: '폴리곤2', type: 'normal' },
    ],
  },
  {
    id: 'hoothoot',
    name: 'Hoothoot Line',
    type: 'flying',
    stages: [
      { id: 163, name: 'Hoothoot', koreanName: '부우부', type: 'flying' },
      { id: 164, name: 'Noctowl', koreanName: '야부엉', type: 'flying' },
      { id: 217, name: 'Ursaring', koreanName: '링곰', type: 'normal' },
    ],
  },
  {
    id: 'wooper',
    name: 'Wooper Line',
    type: 'water',
    stages: [
      { id: 194, name: 'Wooper', koreanName: '우파', type: 'water' },
      { id: 195, name: 'Quagsire', koreanName: '누오', type: 'water' },
      { id: 112, name: 'Rhydon', koreanName: '코뿌리', type: 'ground' },
    ],
  },
  {
    id: 'sneasel',
    name: 'Sneasel Line',
    type: 'dark',
    stages: [
      { id: 215, name: 'Sneasel', koreanName: '포푸니', type: 'dark' },
      { id: 220, name: 'Swinub', koreanName: '꾸꾸리', type: 'ice' },
      { id: 221, name: 'Piloswine', koreanName: '메꾸리', type: 'ice' },
    ],
  },
  {
    id: 'igglybuff',
    name: 'Igglybuff Line',
    type: 'fairy',
    stages: [
      { id: 174, name: 'Igglybuff', koreanName: '푸푸린', type: 'fairy' },
      { id: 39, name: 'Jigglypuff', koreanName: '푸린', type: 'fairy' },
      { id: 40, name: 'Wigglytuff', koreanName: '푸크린', type: 'fairy' },
    ],
  },
  {
    id: 'larvitar',
    name: 'Larvitar Line',
    type: 'rock',
    stages: [
      { id: 246, name: 'Larvitar', koreanName: '애버라스', type: 'rock' },
      { id: 247, name: 'Pupitar', koreanName: '데기라스', type: 'rock' },
      { id: 248, name: 'Tyranitar', koreanName: '밴기라스', type: 'rock' },
    ],
  },
  {
    id: 'ralts-gen2',
    name: 'Ralts Line',
    type: 'psychic',
    stages: [
      { id: 280, name: 'Ralts', koreanName: '랄토스', type: 'psychic' },
      { id: 281, name: 'Kirlia', koreanName: '킬리아', type: 'psychic' },
      { id: 282, name: 'Gardevoir', koreanName: '가디안', type: 'psychic' },
    ],
  },
  {
    id: 'eevee-espeon',
    name: 'Eevee Line (Espeon)',
    type: 'psychic',
    stages: [
      { id: 133, name: 'Eevee', koreanName: '이브이', type: 'normal' },
      { id: 196, name: 'Espeon', koreanName: '에스피온', type: 'psychic' },
    ],
  },
  {
    id: 'eevee-umbreon',
    name: 'Eevee Line (Umbreon)',
    type: 'dark',
    stages: [
      { id: 133, name: 'Eevee', koreanName: '이브이', type: 'normal' },
      { id: 197, name: 'Umbreon', koreanName: '블래키', type: 'dark' },
    ],
  },
];

// 3세대 (Hoenn) 진화 라인
const gen3Chains: EvolutionChain[] = [
  {
    id: 'treecko',
    name: 'Treecko Line',
    type: 'grass',
    stages: [
      { id: 252, name: 'Treecko', koreanName: '나무지기', type: 'grass' },
      { id: 253, name: 'Grovyle', koreanName: '나무돌이', type: 'grass' },
      { id: 254, name: 'Sceptile', koreanName: '나무킹', type: 'grass' },
    ],
  },
  {
    id: 'torchic',
    name: 'Torchic Line',
    type: 'fire',
    stages: [
      { id: 255, name: 'Torchic', koreanName: '아차모', type: 'fire' },
      { id: 256, name: 'Combusken', koreanName: '영치코', type: 'fire' },
      { id: 257, name: 'Blaziken', koreanName: '번치코', type: 'fire' },
    ],
  },
  {
    id: 'mudkip',
    name: 'Mudkip Line',
    type: 'water',
    stages: [
      { id: 258, name: 'Mudkip', koreanName: '물짱이', type: 'water' },
      { id: 259, name: 'Marshtomp', koreanName: '늪짱이', type: 'water' },
      { id: 260, name: 'Swampert', koreanName: '대짱이', type: 'water' },
    ],
  },
  {
    id: 'whismur',
    name: 'Whismur Line',
    type: 'normal',
    stages: [
      { id: 293, name: 'Whismur', koreanName: '소곤룡', type: 'normal' },
      { id: 294, name: 'Loudred', koreanName: '노공룡', type: 'normal' },
      { id: 295, name: 'Exploud', koreanName: '폭음룡', type: 'normal' },
    ],
  },
  {
    id: 'poochyena',
    name: 'Poochyena Line',
    type: 'dark',
    stages: [
      { id: 261, name: 'Poochyena', koreanName: '포챠나', type: 'dark' },
      { id: 262, name: 'Mightyena', koreanName: '그라에나', type: 'dark' },
      { id: 264, name: 'Linoone', koreanName: '직구리', type: 'normal' },
    ],
  },
  {
    id: 'lotad',
    name: 'Lotad Line',
    type: 'water',
    stages: [
      { id: 270, name: 'Lotad', koreanName: '연꽃몬', type: 'water' },
      { id: 271, name: 'Lombre', koreanName: '로토스', type: 'water' },
      { id: 272, name: 'Ludicolo', koreanName: '로파파', type: 'water' },
    ],
  },
  {
    id: 'seedot',
    name: 'Seedot Line',
    type: 'grass',
    stages: [
      { id: 273, name: 'Seedot', koreanName: '도토링', type: 'grass' },
      { id: 274, name: 'Nuzleaf', koreanName: '잎새코', type: 'grass' },
      { id: 275, name: 'Shiftry', koreanName: '다탱구', type: 'grass' },
    ],
  },
  {
    id: 'nincada',
    name: 'Nincada Line',
    type: 'bug',
    stages: [
      { id: 290, name: 'Nincada', koreanName: '토중이', type: 'bug' },
      { id: 291, name: 'Ninjask', koreanName: '아이스크', type: 'bug' },
      { id: 292, name: 'Shedinja', koreanName: '깨도르', type: 'bug' },
    ],
  },
  {
    id: 'wurmple',
    name: 'Wurmple Line',
    type: 'bug',
    stages: [
      { id: 265, name: 'Wurmple', koreanName: '개무소', type: 'bug' },
      { id: 266, name: 'Silcoon', koreanName: '실쿤', type: 'bug' },
      { id: 267, name: 'Beautifly', koreanName: '뷰티플라이', type: 'bug' },
    ],
  },
  {
    id: 'spoink',
    name: 'Spoink Line',
    type: 'psychic',
    stages: [
      { id: 325, name: 'Spoink', koreanName: '피그점프', type: 'psychic' },
      { id: 326, name: 'Grumpig', koreanName: '피그킹', type: 'psychic' },
      { id: 281, name: 'Kirlia', koreanName: '킬리아', type: 'psychic' },
    ],
  },
  {
    id: 'slakoth',
    name: 'Slakoth Line',
    type: 'normal',
    stages: [
      { id: 287, name: 'Slakoth', koreanName: '게을로', type: 'normal' },
      { id: 288, name: 'Vigoroth', koreanName: '발바로', type: 'normal' },
      { id: 289, name: 'Slaking', koreanName: '게을킹', type: 'normal' },
    ],
  },
  {
    id: 'azurill-gen3',
    name: 'Azurill Line',
    type: 'water',
    stages: [
      { id: 298, name: 'Azurill', koreanName: '루리리', type: 'water' },
      { id: 183, name: 'Marill', koreanName: '마릴', type: 'water' },
      { id: 184, name: 'Azumarill', koreanName: '마릴리', type: 'water' },
    ],
  },
  {
    id: 'aron',
    name: 'Aron Line',
    type: 'steel',
    stages: [
      { id: 304, name: 'Aron', koreanName: '가보리', type: 'steel' },
      { id: 305, name: 'Lairon', koreanName: '갱도라', type: 'steel' },
      { id: 306, name: 'Aggron', koreanName: '보스로라', type: 'steel' },
    ],
  },
  {
    id: 'trapinch',
    name: 'Trapinch Line',
    type: 'ground',
    stages: [
      { id: 328, name: 'Trapinch', koreanName: '톱치', type: 'ground' },
      { id: 329, name: 'Vibrava', koreanName: '비브라바', type: 'ground' },
      { id: 330, name: 'Flygon', koreanName: '플라이곤', type: 'ground' },
    ],
  },
  {
    id: 'shroomish',
    name: 'Shroomish Line',
    type: 'grass',
    stages: [
      { id: 285, name: 'Shroomish', koreanName: '버섯꼬', type: 'grass' },
      { id: 286, name: 'Breloom', koreanName: '버섯모', type: 'grass' },
      { id: 332, name: 'Cacturne', koreanName: '밤선인', type: 'grass' },
    ],
  },
  {
    id: 'clamperl',
    name: 'Clamperl Line',
    type: 'water',
    stages: [
      { id: 366, name: 'Clamperl', koreanName: '진주몽', type: 'water' },
      { id: 367, name: 'Huntail', koreanName: '헌테일', type: 'water' },
      { id: 368, name: 'Gorebyss', koreanName: '분홍장이', type: 'water' },
    ],
  },
  {
    id: 'bagon',
    name: 'Bagon Line',
    type: 'dragon',
    stages: [
      { id: 371, name: 'Bagon', koreanName: '아공이', type: 'dragon' },
      { id: 372, name: 'Shelgon', koreanName: '쉘곤', type: 'dragon' },
      { id: 373, name: 'Salamence', koreanName: '보만다', type: 'dragon' },
    ],
  },
  {
    id: 'beldum',
    name: 'Beldum Line',
    type: 'steel',
    stages: [
      { id: 374, name: 'Beldum', koreanName: '메탕', type: 'steel' },
      { id: 375, name: 'Metang', koreanName: '메탕구', type: 'steel' },
      { id: 376, name: 'Metagross', koreanName: '메타그로스', type: 'steel' },
    ],
  },
  {
    id: 'electrike',
    name: 'Electrike Line',
    type: 'electric',
    stages: [
      { id: 309, name: 'Electrike', koreanName: '썬더라이', type: 'electric' },
      { id: 310, name: 'Manectric', koreanName: '썬더볼트', type: 'electric' },
      { id: 311, name: 'Plusle', koreanName: '플러시', type: 'electric' },
    ],
  },
  {
    id: 'swablu',
    name: 'Swablu Line',
    type: 'flying',
    stages: [
      { id: 333, name: 'Swablu', koreanName: '파비코', type: 'flying' },
      { id: 334, name: 'Altaria', koreanName: '파비코리', type: 'flying' },
      { id: 335, name: 'Zangoose', koreanName: '쟝고', type: 'normal' },
    ],
  },
];

const legendaryChains: EvolutionChain[] = [
  {
    id: 'articuno',
    name: 'Articuno (Legendary)',
    type: 'ice',
    isLegendary: true,
    stages: [{ id: 144, name: 'Articuno', koreanName: '프리져', type: 'ice' }],
  },
  {
    id: 'zapdos',
    name: 'Zapdos (Legendary)',
    type: 'electric',
    isLegendary: true,
    stages: [{ id: 145, name: 'Zapdos', koreanName: '썬더', type: 'electric' }],
  },
  {
    id: 'moltres',
    name: 'Moltres (Legendary)',
    type: 'fire',
    isLegendary: true,
    stages: [{ id: 146, name: 'Moltres', koreanName: '파이어', type: 'fire' }],
  },
  {
    id: 'mewtwo',
    name: 'Mewtwo (Legendary)',
    type: 'psychic',
    isLegendary: true,
    stages: [{ id: 150, name: 'Mewtwo', koreanName: '뮤츠', type: 'psychic' }],
  },
  {
    id: 'mew',
    name: 'Mew (Legendary)',
    type: 'psychic',
    isLegendary: true,
    stages: [{ id: 151, name: 'Mew', koreanName: '뮤', type: 'psychic' }],
  },
  {
    id: 'raikou',
    name: 'Raikou (Legendary)',
    type: 'electric',
    isLegendary: true,
    stages: [{ id: 243, name: 'Raikou', koreanName: '라이코', type: 'electric' }],
  },
  {
    id: 'entei',
    name: 'Entei (Legendary)',
    type: 'fire',
    isLegendary: true,
    stages: [{ id: 244, name: 'Entei', koreanName: '엔테이', type: 'fire' }],
  },
  {
    id: 'suicune',
    name: 'Suicune (Legendary)',
    type: 'water',
    isLegendary: true,
    stages: [{ id: 245, name: 'Suicune', koreanName: '스이쿤', type: 'water' }],
  },
  {
    id: 'lugia',
    name: 'Lugia (Legendary)',
    type: 'psychic',
    isLegendary: true,
    stages: [{ id: 249, name: 'Lugia', koreanName: '루기아', type: 'psychic' }],
  },
  {
    id: 'ho-oh',
    name: 'Ho-Oh (Legendary)',
    type: 'fire',
    isLegendary: true,
    stages: [{ id: 250, name: 'Ho-Oh', koreanName: '칠색조', type: 'fire' }],
  },
  {
    id: 'celebi',
    name: 'Celebi (Legendary)',
    type: 'grass',
    isLegendary: true,
    stages: [{ id: 251, name: 'Celebi', koreanName: '세레비', type: 'grass' }],
  },
  {
    id: 'regirock',
    name: 'Regirock (Legendary)',
    type: 'rock',
    isLegendary: true,
    stages: [{ id: 377, name: 'Regirock', koreanName: '레지락', type: 'rock' }],
  },
  {
    id: 'regice',
    name: 'Regice (Legendary)',
    type: 'ice',
    isLegendary: true,
    stages: [{ id: 378, name: 'Regice', koreanName: '레지아이스', type: 'ice' }],
  },
  {
    id: 'registeel',
    name: 'Registeel (Legendary)',
    type: 'steel',
    isLegendary: true,
    stages: [{ id: 379, name: 'Registeel', koreanName: '레지스틸', type: 'steel' }],
  },
  {
    id: 'latias',
    name: 'Latias (Legendary)',
    type: 'dragon',
    isLegendary: true,
    stages: [{ id: 380, name: 'Latias', koreanName: '라티아스', type: 'dragon' }],
  },
  {
    id: 'latios',
    name: 'Latios (Legendary)',
    type: 'dragon',
    isLegendary: true,
    stages: [{ id: 381, name: 'Latios', koreanName: '라티오스', type: 'dragon' }],
  },
  {
    id: 'kyogre',
    name: 'Kyogre (Legendary)',
    type: 'water',
    isLegendary: true,
    stages: [{ id: 382, name: 'Kyogre', koreanName: '가이오가', type: 'water' }],
  },
  {
    id: 'groudon',
    name: 'Groudon (Legendary)',
    type: 'ground',
    isLegendary: true,
    stages: [{ id: 383, name: 'Groudon', koreanName: '그란돈', type: 'ground' }],
  },
  {
    id: 'rayquaza',
    name: 'Rayquaza (Legendary)',
    type: 'dragon',
    isLegendary: true,
    stages: [{ id: 384, name: 'Rayquaza', koreanName: '레쿠쟈', type: 'dragon' }],
  },
  {
    id: 'jirachi',
    name: 'Jirachi (Legendary)',
    type: 'steel',
    isLegendary: true,
    stages: [{ id: 385, name: 'Jirachi', koreanName: '지라치', type: 'steel' }],
  },
  {
    id: 'deoxys',
    name: 'Deoxys (Legendary)',
    type: 'psychic',
    isLegendary: true,
    stages: [{ id: 386, name: 'Deoxys', koreanName: '테오키스', type: 'psychic' }],
  },
];

// 세대별 진화 라인 데이터
export const POKEMON_GENERATIONS: Record<string, GenerationData> = {
  gen1: {
    name: 'Kanto (1세대)',
    chains: gen1Chains,
  },
  gen2: {
    name: 'Johto (2세대)',
    chains: gen2Chains,
  },
  gen3: {
    name: 'Hoenn (3세대)',
    chains: gen3Chains,
  },
  legendary: {
    name: 'Legendary (전설)',
    chains: legendaryChains,
  },
};

// 하위 호환을 위한 기존 배열 (deprecated)
export const evolutionChains: EvolutionChain[] = [...gen1Chains, ...gen2Chains, ...gen3Chains, ...legendaryChains];

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
