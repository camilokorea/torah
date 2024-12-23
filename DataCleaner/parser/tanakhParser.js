const fs = require('fs');

let cap = '';

const filePath = "C:\\CODE\\TANAKH\\material\\TANAKH0.txt";

let tanakh = {
    sections: []
};

const sections = fs.readFileSync(filePath, 'utf8').split('/****/');

sections.forEach(section => {
    let sectionLines = section.split('\n');
    let books = section.split('/**/');

    tanakh.sections.push({
        name: sectionLines[1].trim().replace(/\s{2,}/g, ' '),
        books: []
    });


    for (let i = 1; i < books.length; i++) {
        let bookLines = books[i].split('\n');
        let bookTitle = bookLines[1].trim().replace(/\s{2,}/g, ' ');
        let bookIdentifier = bookLines[2].split(' ')[0].trim().replace(/\s{2,}/g, ' ');

        tanakh.sections[tanakh.sections.length - 1]['books'].push({
            title: bookTitle,
            identifier: bookIdentifier,
            caps: {}
        });

        cap = '';

        fs.writeFileSync('C:\\CODE\\TANAKH\\data\\tanakh.json', JSON.stringify(tanakh), 'utf8');

        for (let ii = 2; ii < bookLines.length; ii++) {
            let lineItems = bookLines[ii].split(' ');

            if (lineItems[1]) {
                let capsItem = lineItems[1].split(':');

                let ver = capsItem[1];

                if (cap !== capsItem[0]) {
                    cap = capsItem[0];

                    tanakh.sections[tanakh.sections.length - 1]['books'][tanakh.sections[tanakh.sections.length - 1]['books'].length - 1]['caps'][cap] = {
                    };
                }

                let line = bookLines[ii].trim().split(' ');

                tanakh.sections[tanakh.sections.length - 1]['books'][tanakh.sections[tanakh.sections.length - 1]['books'].length - 1]['caps'][cap][ver] = line.slice(2, line.length).join(' ').replace(/\s{2,}/g, ' ').trim();
            }
        }
    }
});

fs.writeFileSync('C:\\CODE\\TANAKH\\data\\tanakh.json', JSON.stringify(tanakh), 'utf8');
