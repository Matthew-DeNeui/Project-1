const Datastore = require('nedb');
let selectdiseasesDB = new Datastore({ filename: './diseases/diseases.db', autoload: true });
selectdiseasesDB.ensureIndex({ fieldName: 'name', unique: true });

function resolveFind(level) {
    return new Promise(resolve => {
        let lvl = parseInt(level, 10)
        selectdiseasesDB.find({ level: {$lte: lvl} }, (err, docs) => {
            if (err) {
                console.log(err)
            }
            else {
                console.log("Firstly::::::::::::::::::::::::::::::::::::::\n", docs.length)
                docs.forEach(disease => {
                    console.log(`Found at level ${disease.level}: `, disease.name)
                })
                resolve(docs)
            }
        });
    });
}

module.exports = function selectDiseases(level, count) {
    return new Promise(resolve => {
        let selectedDiseases = []
        resolveFind(level).then(docs => {
            let docsLength = docs.length
            if (count > docsLength) {
                count = docsLength
            }

            let diseaseIndex
            for (let di = count; di > 0; di--) {
                diseaseIndex = Math.floor(Math.random() * (docsLength))
                selectedDiseases.push(docs[diseaseIndex])
                docs.splice(diseaseIndex, 1)
                docsLength--
            }

            resolve(selectedDiseases)
        });
    })
}