interface InfoBoxProps {
  provider: "shields" | "skill-icons";
}

export default function InfoBox({ provider }: InfoBoxProps) {
  return (
    <div className="info-box">
      {provider === "shields" ? (
        <>
          <strong>Shields.io:</strong> 다양한 스타일과 커스터마이징 옵션. 개별
          배지 형태로 세밀한 조정 가능.
        </>
      ) : (
        <>
          <strong>Skill Icons:</strong> 모던하고 깔끔한 디자인. 여러 아이콘을
          하나의 이미지로 표시. Dark/Light 테마 지원.
        </>
      )}
    </div>
  );
}
