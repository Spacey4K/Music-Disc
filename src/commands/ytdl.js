const ytdl = require('ytdl-core');
const wl = require('../../wl.json');

module.exports = {
    name: 'youtube-download',
    aliases: ['ytdl'],
    description: 'Download a video from YT',
    voiceChannel: false,
    options: [
        {
            name: "url",
            description: "YouTube video URL",
            type: 3, // string
            required: true,
        }, {
            name: "format",
            description: "Video format",
            type: 3, // string
            required: false,
            choices: [
                { value: "videoandaudio", name: "mp4" },
                { value: "audioonly", name: "mp3" },
            ]
        }, {
            name: "quality",
            description: "Video quality",
            type: 3, // string
            required: false,
            choices: [
                { value: 'highest', name: 'Highest' },
                { value: 'lowest', name: 'Lowest' },
                { value: 'highestaudio', name: 'Highest audio' },
                { value: 'lowestaudio', name: 'Lowest audio' },
                { value: 'highestvideo', name: 'Highest video' },
                { value: 'lowestvideo', name: 'Lowest video' },
            ]
        }
    ],

    async execute(client, message, args) {
        if (!wl[message.author.id]) return message.reply({ content: "You can't use this command!", allowedMentions: { repliedUser: false } });
         
        const url = args[0];
        if (!url) return message.reply({ content: 'Provide provide a valid YT video url', allowedMentions: { repliedUser: false } });

        await message.channel.sendTyping();

        const res = getResponse(url);
        
        await message.reply(res);
    },

    async slashExecute(client, interaction) {
        if (!wl[interaction.user.id]) return interaction.reply({ content: "You can't use this command!", ephemeral: true }); 
        
        const url = interaction.options.getString('url');
        const filter = interaction.options.getString('format') || undefined;
        const format = this.options.find(o => o.name == 'format').choices.find(c => c.value == filter)?.name || undefined
        const quality = interaction.options.getString('quality') || undefined;

        await interaction.deferReply();

        const res = getResponse(url, format, filter, quality);

        await interaction.editReply(res);
        
    },
};

function getResponse(url, format = 'mp4', filter = 'videoandaudio', quality = 'lowest') {    
    try {
        const video = ytdl(url, { filter, quality }).on('error', () => {});

        res = {
            files: [{
                attachment: video,
                name: `${ytdl.getVideoID(url)}.${format}`,
            }],
            allowedMentions: { repliedUser: false },
        };
    }
    catch(err) {
        res = { content: err.toString(), allowedMentions: { repliedUser: false }, ephemeral: true };
    }

    return res;
}