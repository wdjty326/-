export const RemoveMethodGuideContent = "=ㅈㄱ(or 제거) [삭제할 목록 숫자] [추가 삭제 개수]";

// 메인 가이드
export const MainGuideContent = `
# 도움말입니다.

=ㅍ(or 핑)
- 봇과 서버간의 ping을 알려줍니다.
=ㅇㅈ(or 입장)
- 호출한 유저가 있는 방으로 택유를 호출합니다.
=ㅌㅈ(or 퇴장)
- 택유가 방을 탈출합니다.
=ㄱ(or 고) [유튜브링크 or 노래제목]
- 유튜브링크를 재생합니다. 연속 저장시 리스트 형식으로 저장합니다.
=ㅁㄹ(or 목록)
- 유튜브목록을 가져옵니다.
=ㅉ(or 정지)
- 현재 재생중인 플레이를 정지합니다.
=ㄷㅅ(or 다시)
- 현재 재생중인 플레이를 재실행합니다.
=ㅅㅋ(or 스킵) [스킵 노래 개수]
- 현재 재생중인 플레이를 다음 내역으로 넘깁니다. 파라미터를 추가시 해당 넘버만큼 추가 스킵을 시전합니다.
=ㅋㄹ(or 클린)
- 저장중인 스택및 재생중인 노래를 모두 종료합니다.
=ㄹㅍ(or 루프)
- 현재 저장된 노래스택을 기준으로 루프를 돌립니다.
${RemoveMethodGuideContent}
- 목록에 저장된 내용을 제거합니다.

git링크 : https://github.com/wdjty326/discordbot-me
`;

export const DevGuideContent = `
# development guide
* This command is available after entering the voice room.

=dev song [1-9]
- List of songs sung directly by developers

=dev comment [1-9] (prepare)
- Developer Comments List.
	only a certain person can do it.
`;

export const NaturalNumberException = "0 이상의 자연수로 입력하세요.";
