const fs = require('fs');

const dictionary = JSON.parse(fs.readFileSync("C:\\CODE\\TANAKH\\data\\ministerioMenorahDictionary.json", 'utf8'));

const files = fs.readdirSync('C:\\CODE\\TANAKH\\material\\ministeriomenorah\\books\\');

let dataBase = [];

let text = '';

function formatBibleText(text) {
    let currentVerse = 1; // Secuencia de versículos
    return text.replace(/(\d+)\s/g, (match, num) => {
        // Verificamos si el número coincide con la secuencia
        if (parseInt(num, 10) === currentVerse) {
            currentVerse++; // Incrementamos la secuencia
            return `\n${num} `; // Agregamos un salto de línea antes del número
        }
        return match; // No hacemos nada si no es un número de versículo
    });
}

dictionary.forEach(dict => {
    const filePath = 'C:\\CODE\\TANAKH\\material\\ministeriomenorah\\books\\' + files.filter(item => {
        return item === dict.fileName;
    })[0];

    if (fs.existsSync(filePath)) {
        const bookContent = fs.readFileSync(filePath, 'utf8');

        let item = dict;

        text += item.nombre + '\n\n';

        dataBase.push(
            {
                libro: item,
                caps: []
            });

        let separator = '';

        separator = item.abrev + ' ';

        let caps = `${bookContent}`.split(separator).map(item => {
            return item.trim()
        }).filter(item => {
            return item.length > 10;
        }).map(item => {
            return item.substring(item.indexOf(':') + 1, item.length);
        });

        let capsCounter = 1;

        caps.forEach(cap => {

            text += 'Capitulo ' + String(capsCounter) + '\n';

            text += formatBibleText(cap).split('\n').map(item => {
                return item.trim().replace(/\t/g, '').replace(/(.)\1{2}/g, '').replace(/--./g, '').replace(/.--/g, '.').replace(/YaHWéH-?/g, 'YaHWéH (יהוה)').replace(/.-  -/g, '.');
            }).filter(item => {
                return item.length > 0;
            }).join('\n') + '\n\n';

            dataBase[dataBase.length - 1].caps.push(
                {
                    capitulo: capsCounter,
                    versiculos: formatBibleText(cap).split('\n').map(item => {
                        return item.trim().replace(/\t/g, '').replace(/(.)\1{2}/g, '').replace(/--./g, '').replace(/.--/g, '.').replace(/YaHWéH-?/g, 'YaHWéH (יהוה)').replace(/.-  -/g, '.');
                    }).filter(item => {
                        return item.length > 0;
                    })
                });

            capsCounter++;
        });
    }
});

fs.writeFileSync('C:\\CODE\\TANAKH\\material\\ministeriomenorah\\antiguo.json', JSON.stringify(dataBase), { encoding: 'utf8' })
fs.writeFileSync('C:\\CODE\\TANAKH\\material\\ministeriomenorah\\antiguo_testamento.txt', text, { encoding: 'utf8' })