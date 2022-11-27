const path = require('path');

const {
  app, BrowserWindow, Menu, ipcMain, dialog,
} = require('electron');

async function handleFileOpen() {
  const { canceled, filePaths } = await dialog.showOpenDialog();
  if (canceled) {
    /* empty */
  } else {
    return filePaths[0];
  }
  return null;
}

const mainMenuTemplates = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Quit',
        accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Control+Q',
        click() {
          app.quit();
        },
      },
    ],
  },
];

function createMainWindow() {
  const mainWindow = new BrowserWindow({
    center: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });
  mainWindow.on('closed', () => {
    app.quit();
  });
  ipcMain.handle('ping', handleFileOpen);
  mainWindow.loadFile('mainWindow.html');

  const mainMenu = Menu.buildFromTemplate(mainMenuTemplates);
  Menu.setApplicationMenu(mainMenu);
}

app.whenReady().then(() => {
  createMainWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

if (process.env.NODE_ENV !== 'production') {
  mainMenuTemplates.push({
    label: 'Developer Tools',
    submenu: [
      {
        label: 'Toggle Developer Tools',
        accelerator: 'F12',
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools();
        },
      },
      {
        role: 'reload',
        accelerator: 'F5',
      },
    ],
  });
}
