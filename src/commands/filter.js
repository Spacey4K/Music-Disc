const filters = [
    // { value: "bassboost_low", name: "Bassboost low" },
    { value: "bassboost", name: "Bassboost" },
    // { value: "bassboost_high", name: "Bassboost high" },
    { value: "8D", name: "8D" },
    { value: "vaporwave", name: "Vaporwave" },
    { value: "nightcore", name: "Nightcore" },
    { value: "phaser", name: "Phaser" },
    // { value: "tremolo", name: "Tremolo" },
    { value: "vibrato", name: "Vibrato" },
    { value: "reverse", name: "Reverse" },
    // { value: "treble", name: "Treble" },
    { value: "normalizer", name: "Normalizer" },
    { value: "normalizer2", name: "Normalizer 2" },
    // { value: "surrounding", name: "Surrounding" },
    { value: "pulsator", name: "Pulsator" },
    { value: "subboost", name: "Sub boost" },
    { value: "karaoke", name: "Karaoke" },
    { value: "flanger", name: "Flanger" },
    { value: "gate", name: "Gate" },
    { value: "haas", name: "Haas" },
    { value: "mcompand", name: "Mcompand" },
    // { value: "mono", name: "Mono" },
    /* { value: "mstlr", name: "Mstlr" },
    { value: "mstrr", name: "Mstrr" }, */
    { value: "compressor", name: "Compressor" },
    { value: "expander", name: "Expander" },
    { value: "softlimiter", name: "Soft limiter" },
    { value: "chorus", name: "Chorus" },
    { value: "chorus2d", name: "Chorus 2D" },
    { value: "chorus3d", name: "Chorus 3D" },
    { value: "fadein", name: "Fade in" },
    { value: "dim", name: "Dim" },
    { value: "earrape", name: "Ear rape" },
];

module.exports = {
    name: 'filter',
    aliases: ['f'],
    description: `Audio filters`,
    voiceChannel: true,
    options: [{
        name: "set",
        description: "Set a filter",
        type: 1, // subcommand
        options: [{
            name: "filter",
            description: "Choose a filter",
            type: 3, // string
            required: true,
            choices: filters
        }]
    }, {
        name: "off",
        description: "Disable filters",
        type: 1, // subcommand
    }],

    async execute(client, message, args) {
        return message.reply({ content: "Use the slash command", allowedMentions: { repliedUser: false } });
    },

    async slashExecute(client, interaction) {
        const queue = client.player.getQueue(interaction.guild.id);

        if (!queue || !queue.playing)
            return interaction.reply(`❌ | There is no music currently playing.`);

        const filter = interaction.options.getString('filter');
        const subcommand = interaction.options.getSubcommand();

        if (subcommand == "set") {
            await queue.setFilters({
                [filter]: true });

            return interaction.reply(`Applied filter *${filter}*`);
        }
        if (subcommand == "off") {
            await queue.setFilters({
                [queue.getFiltersEnabled()[0]]: false });
            return interaction.reply(`Disabled all filters`);

        }
    }

};