require('dotenv').config()
const { REST, Routes } = require('discord.js');
const loadCommands = require('./load-commands.js');

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
    const commands = await loadCommands()

    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(Routes.applicationCommands('1040348557879812106'), { body: commands });

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();