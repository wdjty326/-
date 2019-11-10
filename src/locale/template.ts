const guide = `
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
=ㅈㄱ(or 제거) [삭제할 목록 숫자] [추가 삭제 개수]
- 목록에 저장된 내용을 제거합니다.
`;

export default {
    "search": "검색결과",

    "playingAudio": "재생중인 오디오",
		"waitingList": "대기중인 목록",
		"skipList": "스킵된 목록",
		"removeList": "제거된 목록",

    "guide": guide,

    "startQueue": "반복재생시작",
    "stopQueue": "반복재생종료",

    "connectionMsg": "하-위",
    "disconnectMsg": "바-위",
		"cleanMsg": "클-린",

    "helpguide": "=ㄷㅇ(or 도움) 으로 명령어 체크 바람",

    "errorInputNaturalNumber": "0 이상의 숫자로 부탁함.",
    "errorNotFountVoiceChannel": "음성방에 들어가고 부르셈.",
    "errorAwaitVoiceChannel": "바빠 나중에 불러.",

    commandBox: {
        "ping_type1": "ㅍ",
        "ping_type2": "핑",
        
        "help_type1": "ㄷㅇ",
        "help_type2": "도움",

        "connect_type1": "ㅇㅈ",
        "connect_type2": "입장",
        
        "disconnect_type1": "ㅌㅈ",
        "disconnect_type2": "퇴장",

        "play_type1": "ㄱ",
        "play_type2": "고",

        "playlist_type1": "ㅁㄹ",
        "playlist_type2": "목록",
        
        "clean_type1": "ㅋㄹ",
        "clean_type2": "클린",
        
        "pause_type1": "ㅈㅈ",
        "pause_type2": "정지",

        "resume_type1": "ㄷㅅ",
        "resume_type2": "다시",

        "skip_type1": "ㅅㅋ",
        "skip_type2": "스킵",
        
        "loop_type1": "ㄹㅍ",
        "loop_type2": "루프",

        "remove_type1": "ㅈㄱ",
        "remove_type2": "제거"
    }
};