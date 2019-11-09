const guide = `
# Help.

=p(or ping)
- Notifies the pings between the bot and the server.
=conn(or connect)
- Call the taxiway to the room with the user you called.
=disc(or disconnect)
- Drainage exiting the room.
=py(or play) [youtube link or title]
- Play a YouTube link. Saves in a list format when saving continuously.
=pl(or playlist)
- Get your YouTube list.
=st(or stop)
- Stop the play that is currently playing.
=re(or resume)
- Re-enable the play that is currently playing.
=sk(or skip) [skip music count]
- Transfer the play you are currently playing to the next detail. When you add a parameter, you test the number of additional skips.
=cl(or clean)
- Exits all stacks that are being saved and any songs that are being played.
=lp(or loop)
- Rotate the loop based on the currently stored songstack.
=rm(or remove) [delete list number] [add delete count]
- Remove content stored in the list.
`;

export default {
    "search": "search info",

    "playingAudio": "playing audio",
    "waitingList": "waiting list",

    "guide": guide,

    "startQueue": "start Loop",
    "stopQueue": "stop Loop",

    "connectionMsg": "H-i",
    "disconnectMsg": "By-e",

    "helpguide": "please =hp(or help) command",

    "errorInputNaturalNumber": "I'd like a number above 0.",
    "errorNotFountVoiceChannel": "Get in the voicemail and call it.",
    "errorAwaitVoiceChannel": "Call me later.",

    commandBox: {
        "ping_type1": "p",
        "ping_type2": "ping",
        
        "help_type1": "hp",
        "help_type2": "help",

        "connect_type1": "conn",
        "connect_type2": "connect",
        
        "disconnect_type1": "disc",
        "disconnect_type2": "disconnect",

        "play_type1": "py",
        "play_type2": "play",

        "playlist_type1": "pl",
        "playlist_type2": "playlist",
        
        "clean_type1": "cl",
        "clean_type2": "clean",
        
        "pause_type1": "stop",
        "pause_type2": "st",

        "resume_type1": "re",
        "resume_type2": "resume",

        "skip_type1": "sk",
        "skip_type2": "skip",
        
        "loop_type1": "lp",
        "loop_type2": "loop",

        "remove_type1": "rm",
        "remove_type2": "remove"
    }
};