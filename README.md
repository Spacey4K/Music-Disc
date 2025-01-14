<img width="150" height="150" align="right" style="float: right; margin: 0 10px 0 0;" alt="music_disc" src="https://i.imgur.com/JWSIlSt.png">

# Music Disc 

<a href="https://github.com/hmes98318/Music-Disc/releases"><img alt="GitHub package.json version" src="https://img.shields.io/github/package-json/v/hmes98318/Music-Disc?style=for-the-badge"></a> 
<a href="https://discord.js.org/"><img src="https://img.shields.io/badge/Discord.JS-v14-blue?style=for-the-badge&logo=DISCORD" /></a> 
<a href="https://nodejs.org/"><img src="https://img.shields.io/badge/Node%20Version->=16.13.0-brightgreen?style=for-the-badge&logo=Node.js"></a> 
<a href="https://github.com/hmes98318/Music-Disc/blob/main/LICENSE"><img alt="GitHub" src="https://img.shields.io/github/license/hmes98318/Music-Disc?style=for-the-badge&color=brightgreen"></a>  

## Discord.js v14 Music Bot  
Supports **YouTube**, **Spotify**, **SoundCloud** streams.

### Commands
- `+back/rewind`
- `+filter/f`
- `+leave/stop`
- `+loop/lp`
- `+nowplaying/np`
- `+pause`
- `+ping`
- `+play/p`
- `+time/t`
- `+queue/q, list`
- `+remove/r`
- `+resume`
- `+save`
- `+search/find`
- `+server`
- `+shuffle/random`
- `+skip/s`
- `+status/usage`
- `+volume/v`

### Reference version  
[**node.js  `v18.12.1`**](https://nodejs.org/en/)  
[**discord.js  `v14.6.0`**](https://www.npmjs.com/package/discord.js)  


## Deploying with node.js

### Clone the repository
```
git clone https://github.com/Spacey4K/Music-Disc
```
or [**click here**](https://github.com/Spacey4K/Music-Disc/archive/refs/heads/main.zip) to download  


### Install the dependencies
auto install all dependencies on [`package.json`](./package.json)  
```
npm install
```

### Configure environment
[`config.env`](./config.env) 
```env
TOKEN = "your_token"
NAME = "Music Disc"
PREFIX = "+"
PLAYING = "+help | music"
COLOR = "#FFFFFF"
DEFAULT_VOLUME = 50
MAX_VOLUME = 100
AUTO_LEAVE = true
AUTO_LEAVE_COOLDOWN = 5000
DISPLAY_VOICE_STATE = true
GUILD_ID = ""

```
**`AUTO_LEAVE`** : After the music finished, can choose whether let the bot leave voice channel automatically or not.  
**`AUTO_LEAVE_COOLDOWN`** : Timer for auto disconnect(ms).  
**`DISPLAY_VOICE_STATE`** : Show voice channel status updates.   
**`GUILD_ID`** : ID of the server you want to deploy slash commands to.

## Running the script 
```
npm run start
```


## Deploying with Docker Compose  
**image link** : https://hub.docker.com/r/hmes98318/music-disc  
### put your Token into [`docker-compose.yml`](./docker-compose.yml)
```yml
version: '3.8'
services:
  music-disc:
    image: hmes98318/music-disc:1.2.5
    container_name: music-disc
    restart: always
    environment:
      TOKEN: "your_token"
      PREFIX: "+"
      PLAYING: "+help | music"
      COLOR: "#FFFFFF"
      DEFAULTVOLUME: 50
      MAXVOLUME: 100
      AUTO_LEAVE: "true"
      AUTO_LEAVE_COOLDOWN: 5000
      DISPLAY_VOICE_STATE: "true"
    ports:
      - 33333:33333
```

### Start the container  
```
docker-compose up -d
```


## Deploying with Replit  
Watch it by clicking on the image down below  
[![Music-Disc-with-Replit](https://img.youtube.com/vi/WH5aSHIebcc/0.jpg)](https://youtu.be/WH5aSHIebcc)  


