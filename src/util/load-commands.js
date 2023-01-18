const fs = require('fs');

module.exports = () => {
    console.log(`-> loading commands ......`);
    
    const commands = [];
    return new Promise((resolve, reject) => {
        fs.readdir('./src/commands/', (err, files) => {
            //console.log(`+-----------------------------+`);
            if (err)
                return console.log('Could not find any commands!');

            const jsFiles = files.filter(file => file.endsWith('.js'));

            if (jsFiles.length <= 0)
                return console.log('Could not find any commands!');

            for (const file of jsFiles) {
                try {
                    const p = `../commands/${file}`
                    const command = require(p);

                    //console.log(`| Loaded Command ${command.name.toLowerCase()}  \t|`);

                    commands.push(command); 
                    delete require.cache[require.resolve(p)];
                } catch (error) {
                    reject(error);
                }
            };
            //console.log(`+-----------------------------+`);
            console.log('-- loading Commands finished --');

            resolve(commands);
        });
    });
}