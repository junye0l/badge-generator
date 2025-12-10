interface InfoBoxProps {
  provider: "shields" | "skill-icons" | "typing-svg";
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
      ) : (
        <>
          <strong>Typing SVG:</strong> 타이핑 애니메이션 효과로 동적인 프로필 헤더 생성.
          텍스트, 폰트, 색상, 속도 등을 커스터마이징할 수 있습니다.
        </>
      )}
    </div>
  );
}
