const electron = require('electron');
const selectDiseases = require('./js/modules/select-diseases');

let diseases = require('./diseases/diseases.json');

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
    let selectedDiseases = selectDiseases(level, diseaseCount, diseases);
    mainWindow.webContents.send('antipaladin-infected', selectedDiseases);
})