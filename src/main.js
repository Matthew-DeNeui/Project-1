const electron = require('electron');
const Datastore = require('nedb');
let diseasesDB = new Datastore({ filename: './diseases/diseases.db', autoload: true });
diseasesDB.ensureIndex({ fieldName: 'name', unique: true });
const selectDiseases = require('./js/modules/select-diseases');

// setting up db
/* var diseasesForDB = []; */

/* diseasesForDB.push({
    "name": "Demonic Taint (Dretch)",
    "level": 1,
    "save": "Wis 11",
    "onset": "Immediate",
    "frequency": "1 / combat",
    "description": "Often contracted when a demon's soul gets trapped within the soul of a humanoid on its way back to the abyssal plane upon the death of that demon. At the beginning of combat, make a wisdom saving throw or take on the aspect of a demon. Your stats are modified as follows +1 Str, +1 Dex, +2 Con, -5 Int, -2 Wis, -7 Cha. You also gain all abilities, attacks, senses, immunities, vulnerabilities, etc. of the demon. Your alignment becomes Chaotic Evil and your character is controlled by the DM for the duration of combat. At the end of combat, the character must make three successful wisdom saves (using their un modified wisdom score) before three unsuccessful wisdom saves or be controlled by the demon for 1d6 days.\nIf an antipaladin's level is equal to or greater than the CR of the demon. They retain control of their actions. If it is at least twice the demon's CR, their stats are only affected by the positive modifiers."
});

diseasesForDB.push({
    "name": "Black Fly Filth Fever (2)",
    "level": 2,
    "save": "Con 10 (+ con of attacker)",
    "onset": "Injury",
    "frequency": "1 / day",
    "description": "Black Fly filth fever is a disease spread by the various species of black fly due to their proximity to decaying matter and bodily waste. It is contracted through injury, and causes the victim's wounds to fester and rot and their skin erupts in small but painful boils.\nThe DC depends on the inflicting creature. Once contracted, the victim becomes poisoned until the disease is cured. While thus poisoned, the victim cannot regain hit points except by magical means, and the target's hit point maximum decreases by 3 (1d6) every 24 hours. If the target's hit point maximum drops to 0 as a result of this disease, the target dies."
});

diseasesForDB.push({
    "name": "Dance Fever",
    "level": 3,
    "save": "Con 11",
    "onset": "1d4 hours",
    "frequency": "1 / Round (optional)",
    "description": "Dance fever is a disease that causes those afflicted to dance uncontrollably. It incubates in water, but it can also survive in other liquids, such as wine or fruit juice.\nWhen a humanoid creature drinks a liquid that is contaminated with the disease, the creature must succeed on a DC 11 Constitution saving throw or become infected.\nIt takes 1d4 hours for dance fever's symptoms to manifest in an infected creature. Symptoms include a strange desire to dance and muscle spasms. The infected creature suffers one level of exhaustion, and it will dance whenever it is able to. A dancing creature must use half its movement to dance and has disadvantage on Dexterity saving throws and attack rolls. As an action, the creature can make a DC 11 Constitution saving throw to regain its composure. If it succeeds on the saving throw, it doesn't have to dance again for 1 hour.\nAt the end of each long rest, an infected creature must make a DC 11 Constitution saving throw. On a failed save, the character gains one level of exhaustion. On a successful save, the character's exhaustion level decreases by one level. If a successful saving throw reduces the infected creature's level of exhaustion below 1, the creature recovers from the disease."
});

diseasesForDB.push({
    "name": "Black Fly Filth Fever (5)",
    "level": 5,
    "save": "Con 11 (+ con of attacker)",
    "onset": "Injury",
    "frequency": "1 / day",
    "description": "Black Fly filth fever is a disease spread by the various species of black fly due to their proximity to decaying matter and bodily waste. It is contracted through injury, and causes the victim's wounds to fester and rot and their skin erupts in small but painful boils.\nThe DC depends on the inflicting creature. Once contracted, the victim becomes poisoned until the disease is cured. While thus poisoned, the victim cannot regain hit points except by magical means, and the target's hit point maximum decreases by 3 (1d6) every 24 hours. If the target's hit point maximum drops to 0 as a result of this disease, the target dies."
});

diseasesForDB.push({
    "name": "Corpseblight",
    "level": 7,
    "save": "Con 15",
    "onset": "Immediate",
    "frequency": "1 / hour",
    "description": "This fungal infection can be carried by a mundane living creature, but won't have any noticeable effect. However, it can infect undead; even those that have disease immunity. An undead coming into contact with the disease must make a Constitution saving throw with a DC of 15 or be infected. Any dead or undead body the fungus has infected will cause it to quickly decay. Every hour, the afflicted must make another Constitution saving throw or take 1d6 + 6 necrotic damage. This damage ignores damage resistance and immunity. Upon reaching 0 hit points, the afflicted disintegrates entirely. After three successful saves, the disease is warded off. Any already-dead corpse infected with the disease will disintegrate in 24 hours, leaving no trace.\nStrains of this disease are carried in vials by some clerics, specifically to repel hordes of undead that could otherwise overwhelm a town, but their usage of this disease is a closely guarded secret."
});

diseasesForDB.push({
    "name": "Black Fly Filth Fever (9)",
    "level": 9,
    "save": "Con 12 (+ con of attacker)",
    "onset": "Injury",
    "frequency": "1 / day",
    "description": "Black Fly filth fever is a disease spread by the various species of black fly due to their proximity to decaying matter and bodily waste. It is contracted through injury, and causes the victim's wounds to fester and rot and their skin erupts in small but painful boils.\nThe DC depends on the inflicting creature. Once contracted, the victim becomes poisoned until the disease is cured. While thus poisoned, the victim cannot regain hit points except by magical means, and the target's hit point maximum decreases by 7 (2d6) every 24 hours. If the target's hit point maximum drops to 0 as a result of this disease, the target dies."
});

diseasesForDB.push({
    "name": "Black Fly Filth Fever (13)",
    "level": 13,
    "save": "Con 13 (+ con of attacker)",
    "onset": "Injury",
    "frequency": "1 / day",
    "description": "Black Fly filth fever is a disease spread by the various species of black fly due to their proximity to decaying matter and bodily waste. It is contracted through injury, and causes the victim's wounds to fester and rot and their skin erupts in small but painful boils.\nThe DC depends on the inflicting creature. Once contracted, the victim becomes poisoned until the disease is cured. While thus poisoned, the victim cannot regain hit points except by magical means, and the target's hit point maximum decreases by 10 (3d6) every 24 hours. If the target's hit point maximum drops to 0 as a result of this disease, the target dies."
});

diseasesForDB.push({
    "name": "Alkali Fever",
    "level": 15,
    "save": "Con 15",
    "onset": "Immediate",
    "frequency": "1 / Round",
    "description": "When a creature starts its turn in an area where the air has toxic metals and other elements in it, and every hour they remain in such a location, they must roll a DC 15 Constitution saving throw and are infected with Alkali Fever on a fail. When first infected, the creature gains 2 levels of Exhaustion and gains another one every hour until the disease is cured. They are poisoned until the disease is cured. Other symptoms exist as well, such as nausea, vomiting, excessive thirst, abdominal pains, etc. These symptoms manifest by forcing any attack roll, ability check, or saving throw to act as a critical fail if the creature rolls a 5 or lower (6 or lower if they normally critical fail on a natural 2 for any reason). When this occurs, the symptoms mentioned above overcome the creature, preventing it from moving or taking any actions for a round and dealing 1D12 Necrotic damage to it.\nThe easiest cure for the aliment is to escape the area, breathing fresh air. While not spending time in an area that causes the disease, they lose one Exhaustion point each hour (But only those gained by the disease's effect). When they no longer have ANY Exhaustion points, at the end of an infected creature's turn they can attempt a DC 15 Constitution saving throw to end the disease. Spells that end disease do not cure the Exhaustion points unless the spell explicitly states that it ALSO cures Exhaustion points. If cured by a spell that doesn't remove the Exhaustion points, the creature loses one Exhaustion point each hour until they are all gone."
});

diseasesForDB.push({
    "name": "Black Fly Filth Fever (17)",
    "level": 17,
    "save": "Con 14 (+ con of attacker)",
    "onset": "Injury",
    "frequency": "1 / day",
    "description": "Black Fly filth fever is a disease spread by the various species of black fly due to their proximity to decaying matter and bodily waste. It is contracted through injury, and causes the victim's wounds to fester and rot and their skin erupts in small but painful boils.\nThe DC depends on the inflicting creature. Once contracted, the victim becomes poisoned until the disease is cured. While thus poisoned, the victim cannot regain hit points except by magical means, and the target's hit point maximum decreases by 14 (4d6) every 24 hours. If the target's hit point maximum drops to 0 as a result of this disease, the target dies."
});

diseasesForDB.push({
    "name": "Demonic Taint (Balor)",
    "level": 20,
    "save": "Wis 20",
    "onset": "Immediate",
    "frequency": "1 / combat",
    "description": "Often contracted when a demon's soul gets trapped within the soul of a humanoid on its way back to the abyssal plane upon the death of that demon. At the beginning of combat, make a wisdom saving throw or take on the aspect of a demon. Your stats are modified as follows +16 Str, +5 Dex, +12 Con, +10 Int, +6 Wis, +12 Cha. You also gain all abilities, attacks, senses, immunities, vulnerabilities, etc. of the demon. Your alignment becomes Chaotic Evil and your character is controlled by the DM for the duration of combat. At the end of combat, the character must make three successful wisdom saves (using their un modified wisdom score) before three unsuccessful wisdom saves or be controlled by the demon for 1d6 days. After being controlled three times in this way the humanoid's soul is completely consumed and the demon has full control. The character can only be brought back by wish or miracle.\nIf an antipaladin's level is equal to or greater than the CR of the demon. They retain control of their actions. If it is at least twice the demon's CR, their stats are only affected by the positive modifiers."
}); */

/* diseasesDB.insert(diseasesForDB, function (err, docs) {
    if (err) {
        console.log('Uh oh...', err);
    }
    else {
        console.log('Added: ', docs)
    }
}); */
/* diseasesDB.findOne({ name: 'Aberrant Clone' }, function (err, doc) {
    if (!doc) {
        console.log("Uh oh ... ", err)
    }
    else {
        console.log('Found user:', doc.onset);
    }
}); */
diseasesDB.find({ level: { $lte: 20 } }, function (err, docs) {
    if (err) {
        console.log(err)
    }
    else {
        console.log("Docs Found: ...")
        docs.forEach(disease => {
            console.log(`Found at level ${disease.level}: `, disease.name)
        })
    }
});
// end setting up db

// db queries
function resolveFind(dzsLevel) {
    return new Promise((resolve) => {
        diseasesDB.find({ level: { $lte: dzsLevel } }, (err, docs) => {
            if (err) {
                console.log(err)
            }
            else {
                console.log("Firstly::::::::::::::::::::::::::::::::::::::\n",docs.length)
                docs.forEach(disease => {
                    console.log(`Found at level ${disease.level}: `, disease.name)
                })
                resolve(docs)
            }
        });
    });
}

async function findDiseases(level) {
    let selectedDiseases = await resolveFind(level);
    console.log("Found:::::::::::::::::::::::::::::::::::::::::::\n", selectedDiseases.length)
    selectedDiseases.forEach(disease => {
        console.log(`Found at level ${disease.level}: `, disease.name)
    })
    return selectedDiseases
}
//findDiseases(2)
// db queries

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipc = electron.ipcMain;

let mainWindow
app.on('ready', _ => {

    mainWindow = new BrowserWindow({
        height: 600,
        width: 800
    })

    mainWindow.loadURL(`file://${__dirname}/index.html`)


    mainWindow.on('closed', _ => {
        console.log('closed!')
        mainWindow = null
    })

})

ipc.on('infect-antipaladin', (evt, level, diseaseCount) => {
    //let selectedDiseases = selectDiseases(level, diseaseCount);
    selectDiseases(level, diseaseCount).then(selectedDiseases => {
        console.log("Returned:::::::::::::::::::::::::::::::::::::::::::\n", selectedDiseases.length)
        selectedDiseases.forEach(disease => {
            console.log(`Found at level ${disease.level}: `, disease.name)
        })
        mainWindow.webContents.send('antipaladin-infected', selectedDiseases);
    });
})