const guide = `
# 도움말입니다.

=핑
- 봇과 서버간의 ping을 알려줍니다.
=입장
- 호출한 유저가 있는 방으로 택유를 호출합니다.
=퇴장
- 택유가 방을 탈출합니다.
=고 [유튜브링크 혹은 노래제목]
- 유튜브링크를 재생합니다. 연속 저장시 리스트 형식으로 저장합니다.
=목록
- 유튜브목록을 가져옵니다.
=정지
- 현재 재생중인 플레이를 정지합니다.
=다시
- 현재 재생중인 플레이를 재실행합니다.
=스킵 [스킵 노래 개수]
- 현재 재생중인 플레이를 다음 내역으로 넘깁니다. 파라미터를 추가시 해당 넘버만큼 추가 스킵을 시전합니다.
=정리
- 저장중인 스택및 재생중인 노래를 모두 종료합니다.
=루프
- 현재 저장된 노래스택을 기준으로 루프를 돌립니다.
=제거 [삭제할 목록 숫자] [추가 삭제 개수]
- 목록에 저장된 내용을 제거합니다.

=프리셋 [저장|로드|제거|리스트] [프리셋명]
- 프리셋을 관리합니다.
	저장 : 현재 목록에 있는 노래리스트를 저장합니다.
	로드 : 프리셋에 저장된 목록을 리스트로 적용합니다.
	제거 : 프리셋을 제거합니다.
	리스트 : 현재 사용자가 등록한 프리셋을 보여줍니다.
`;

const debugguide = `
# 디버깅용 가이드입니다.
## 해당 명령어는 개발자만 가능합니다.

=디버그 노래제거
- 현재 서버에 저장된 노래를 모두 제거합니다.
=디버그 설정 [bitrate|frequency] [number]
- frequency 는 24000 | 48000
- bitrate 는 32|48|64|96
해당 설정은 임시로 설정되는 기능입니다. 
`

export default {
    "search": "검색결과",

    "playingAudio": "재생중인 오디오",
		"waitingList": "대기중인 목록",
		"skipList": "스킵된 목록",
		"removeList": "제거된 목록",

		"guide": guide,
		"debugguide": debugguide,

    "startQueue": "반복재생시작",
    "stopQueue": "반복재생종료",

    "connectionMsg": "하-위",
    "disconnectMsg": "바-위",
		"cleanMsg": "클-린",

    "helpguide": "=도움 으로 명령어 체크 바람",

    "errorInputNaturalNumber": "0 이상의 숫자로 부탁함.",
    "errorNotFountVoiceChannel": "음성방에 들어가고 부르셈.",
    "errorAwaitVoiceChannel": "바빠 나중에 불러.",

		"save": "저장",
		"load": "로드",
		"remove": "제거",
		"presetlist": "리스트",

		"savePreset": "프리셋저장",
		"loadPreset": "프리셋로드",
		"removePreset": "프리셋제거",
		"listPreset": "프리셋리스트",

    commandBox: {
				"debug_type": "디버그",

				"preset_type": "프리셋",

        "ping_type": "핑",
        
        "help_type": "도움",

        "connect_type": "입장",
        
        "disconnect_type": "퇴장",

        "play_type": "고",

        "playlist_type": "목록",
        
        "clean_type": "정리",

        "pause_type": "정지",

        "resume_type": "다시",

        "skip_type": "스킵",

        "loop_type": "루프",

        "remove_type": "제거"
		},
		debugBox: {
			"clean_type": "노래제거",
			"set_type": "설정"
		}
	
};