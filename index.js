'use strict';

const fs = require('fs');
const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');
const { Player } = require('discord-player');
require('dotenv').config();
require('console-stamp')(console, { format: ':date(yyyy/mm/dd HH:MM:ss.l)' });

const config = require('./config.json');
const embed = require('./src/embeds/embeds');


const loadCommands = require('./src/util/load-commands.js');

let client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates,
    ],
    partials: [Partials.Channel],
    disableMentions: 'everyone',
});


client.config = config;

client.config.prefix = process.env.PREFIX || config.prefix;
client.config.name = process.env.NAME || config.name;
client.config.playing = process.env.PLAYING || config.playing;
client.config.defaultVolume = Number(process.env.DEFAULTVOLUME || config.defaultVolume);
client.config.maxVolume = Number(process.env.MAX_VOLUME || config.maxVolume);
client.config.autoLeave = process.env.AUTO_LEAVE === 'true' ? true : false || config.autoLeave;
client.config.autoLeaveCooldown = Number(process.env.AUTO_LEAVE_COOLDOWN || config.autoLeaveCooldown);
client.config.displayVoiceState = process.env.DISPLAY_VOICE_STATE === 'true' ? true : false || config.displayVoiceState;
client.config.guildId = process.env.GUILD_ID || config.guildId;

client.config.ytdlOptions = {
    filter: 'audioonly',
    quality: 'highestaudio',
    highWaterMark: 1 << 27 // about 134 mins
};

client.commands = new Collection();
client.player = new Player(client, {
    ytdlOptions: client.config.ytdlOptions
});
const player = client.player;




const loadEvents = () => {
    return new Promise((resolve, reject) => {
        const events = fs.readdirSync('./src/events/').filter(file => file.endsWith('.js'));
        for (const file of events) {
            try {
                const event = require(`./src/events/${file}`);
                //console.log(`-> Loaded event ${file.split('.')[0]}`);

                client.on(file.split('.')[0], event.bind(null, client));
                delete require.cache[require.resolve(`./src/events/${file}`)];
            } catch (error) {
                reject(error);
            }
        };

        resolve();
    });
};



Promise.all([loadCommands(), loadEvents()])
    .then(([commands]) => {        
        commands.forEach((c) => client.commands.set(c.name.toLowerCase(), c));
        console.log('\x1B[32m*** All loaded successfully ***\x1B[0m');
        client.login(process.env.TOKEN);
    });




const settings = (queue, song) =>
    `**Volume**: \`${queue.volume}%\` | **Loop**: \`${queue.repeatMode ? (queue.repeatMode === 2 ? 'All' : 'ONE') : 'Off'}\` | **Filter**: ${queue.getFiltersEnabled().length ? queue.getFiltersEnabled() : "none"}`;


player.on('error', (queue, error) => {
    console.log(`There was a problem with the song queue => ${error.message}`);
});

player.on('connectionError', (queue, error) => {
    console.log(`I'm having trouble connecting => ${error.message}`);
});

player.on('trackStart', (queue, track) => {
    if (queue.repeatMode !== 0)
        return;
    queue.metadata.send({ embeds: [embed.Embed_play("Playing", track.title, track.url, track.duration, track.thumbnail, settings(queue))] });
});

player.on('trackAdd', (queue, track) => {
    if (queue.previousTracks.length > 0)
        queue.metadata.send({ embeds: [embed.Embed_play("Added", track.title, track.url, track.duration, track.thumbnail, settings(queue))] });
});

player.on('channelEmpty', (queue) => {
    if (!client.config.autoLeave)
        queue.stop();
});