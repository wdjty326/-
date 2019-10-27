# Node Discord MusicBox

## Getting Start
### Source
nodejs + typescript

### package script
```bash
# clean build source
npm run clean

# build source
npm run build

# start server
npm run serve

# stop server
npm run stop
```

### library
- discord.js
- nodeopus
- ytdl
- ffmpeg

### directory and file
```bash
# main js
src/index.ts

# discord class js
src/app.ts

# interface or const
src/define/*

# library
src/lib/*

# action source
src/method/*

# call action js
src/method/index.ts

# help method message
src/template.ts
```

### create key file
```bash
# make google api key
echo "$API_KEY" > api_key

# make discord client token
echo "$CLIENT_TOKEN" > client_token
```

### permissions integer
36768000