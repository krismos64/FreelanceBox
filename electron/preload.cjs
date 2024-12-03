const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('database', {
  getClients: () => ipcRenderer.invoke('db:getClients'),
  addClient: (client) => ipcRenderer.invoke('db:addClient', client),
  getDocuments: () => ipcRenderer.invoke('db:getDocuments'),
  addDocument: (document) => ipcRenderer.invoke('db:addDocument', document),
  getCompanySettings: () => ipcRenderer.invoke('db:getCompanySettings'),
  updateCompanySettings: (settings) => ipcRenderer.invoke('db:updateCompanySettings', settings)
});