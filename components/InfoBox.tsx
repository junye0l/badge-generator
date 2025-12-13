interface InfoBoxProps {
  provider: "shields" | "skill-icons" | "typing-svg" | "github-stats" | "pokemon";
}

export default function InfoBox({ provider }: InfoBoxProps) {
  return (
    <div className="info-box">
      {provider === "shields" ? (
        <>
          <strong>Shields.io:</strong> 다양한 스타일과 커스터마이징 옵션. 개별
          뱃지 형태로 세밀한 조정 가능.
        </>
      ) : provider === "skill-icons" ? (
        <>
          <strong>Skill Icons:</strong> 모던하고 깔끔한 디자인. 여러 아이콘을
          하나의 이미지로 표시. Dark/Light 테마 지원.
        </>
      ) : provider === "typing-svg" ? (
        <>
          <strong>Typing SVG:</strong> 타이핑 애니메이션 효과로 동적인 프로필 헤더 생성.
          텍스트, 폰트, 색상, 속도 등을 커스터마이징할 수 있습니다.
        </>
      ) : provider === "github-stats" ? (
        <>
          <strong>GitHub Stats:</strong> GitHub 활동 통계를 시각화한 카드 생성.
          Stars, Commits, PRs, Issues 등의 통계를 다양한 테마로 표시할 수 있습니다.
        </>
      ) : (
        <>
          <strong>Pokemon Evolution:</strong> GitHub 커밋 수에 따라 진화하는 포켓몬!
          총 커밋 수를 기준으로 포켓몬이 자동으로 진화하며, 10,000 커밋 이상 시 Shiny 포켓몬으로 변합니다.
        </>
      )}
    </div>
  );
}
