const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const serve = require('electron-serve');
const db = require('./database.cjs');

const loadURL = serve({ directory: 'dist' });

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.cjs')
    }
  });

  if (app.isPackaged) {
    loadURL(mainWindow);
  } else {
    mainWindow.loadURL('http://localhost:5173');
  }
}

// IPC handlers pour la base de données
ipcMain.handle('db:getClients', () => db.getClients());
ipcMain.handle('db:addClient', (_, client) => db.addClient(client));
ipcMain.handle('db:getDocuments', () => db.getDocuments());
ipcMain.handle('db:addDocument', (_, document) => db.addDocument(document));
ipcMain.handle('db:getCompanySettings', () => db.getCompanySettings());
ipcMain.handle('db:updateCompanySettings', (_, settings) => db.updateCompanySettings(settings));

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});