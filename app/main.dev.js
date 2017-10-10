/* eslint global-require: 0, flowtype-errors/show-errors: 0 */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 *
 * @flow
 */
import { app, BrowserWindow, globalShortcut } from 'electron';
import { autoUpdater } from 'electron-updater';
import notifier from 'node-notifier';
import isDev from 'electron-is-dev';

import MenuBuilder from './menu';

let mainWindow = null;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (
  process.env.NODE_ENV === 'development' ||
  process.env.DEBUG_PROD === 'true'
) {
  require('electron-debug')();
  const path = require('path');
  const p = path.join(__dirname, '..', 'app', 'node_modules');
  require('module').globalPaths.push(p);
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

  return Promise.all(
    extensions.map(name => installer.default(installer[name], forceDownload))
  ).catch(console.log); // eslint-disable-line no-console
};

const showUpdateNotification = function (it) {
  it = it || {};
  const restartNowAction = 'Restart now';

  const versionLabel = it.label
    ? `Version ${it.version}`
    : 'The latest version';

  notifier.notify(
    {
      title: 'A new update is ready to install.',
      message: `${versionLabel} has been downloaded and will be automatically installed after restart.`,
      closeLabel: 'Okay',
      actions: restartNowAction,
    },
    (err, response, metadata) => {
      if (err) throw err;
      if (metadata.activationValue !== restartNowAction) {
        return;
      }
      autoUpdater.quitAndInstall();
    }
  );
}

const initAutoUpdate = function () {
  if (isDev) {
    return;
  }

  if (process.platform === 'linux') {
    return;
  }

  autoUpdater.on('update-downloaded', showUpdateNotification);
  autoUpdater.checkForUpdates();
}

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  app.quit();
});

app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});

app.on('ready', async () => {
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
  ) {
    await installExtensions();
  }

  mainWindow = new BrowserWindow({
    show: false,
    width: 1360,
    height: 820,
    frame: false,
    minWidth: 500,
    minHeight: 700,
    backgroundColor: '#1D212D',
  });

  mainWindow.loadURL(`file://${__dirname}/app.html`);

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    mainWindow.focus();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  initAutoUpdate();

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  const settings = require('./settings');
  settings.setDefaultSettings();
  settings.setupShortcuts();
});
