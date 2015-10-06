/* eslint no-path-concat: 0, func-names:0 */
var app = require('app');
var BrowserWindow = require('browser-window');
var menuHelper = require('./backend/MenuHelper')

require('electron-debug')();
require('crash-reporter').start();

var app = require('app');
var BrowserWindow = require('browser-window');
var devHelper = require('./vendor/electron-boilerplate/app/vendor/electron_boilerplate/dev_helper');
var windowStateKeeper = require('./vendor/electron-boilerplate/app/vendor/electron_boilerplate/window_state');
var globalShortcut = require('global-shortcut');
var assert = require('assert');
var jetpack = require('fs-jetpack');

var Menu = require('menu');
var Tray = require('tray');

var Definition = require('./backend/model/definition');
var Dictionary = require('./backend/model/dictionary');
var OnlineSource = require('./backend/model/onlineSource');

var Sequelize = require('sequelize');

var trayIcon = null;
var mainWindow = null;
var mainWindowState;

app.on('ready', function () {

  testDatabase();

  initializeSystemTray();

  registerGlobalShortcuts();

});

function openDashboardWindow() {

  if(mainWindow != null){
    mainWindow.show();
    mainWindow.restore();
    return;
  }

  // Preserver of the window size and position between app launches.
  mainWindowState = windowStateKeeper('main', {
    width: 1000,
    height: 600
  });

  var windowOptions = {
    width: mainWindowState.width,
    height: mainWindowState.height,
    transparent: true
  };

  // Center the window if this is the first run
  if(mainWindowState.x == undefined){
    windowOptions.center = true;
  }
  else{
    windowOptions.x = mainWindowState.x;
    windowOptions.y = mainWindowState.y;
  }

  mainWindow = new BrowserWindow(windowOptions);
  menuHelper.createApplicationMenu(mainWindow);

  if (mainWindowState.isMaximized) {
    mainWindow.maximize();
  }

  if (process.env.HOT) {
    mainWindow.loadUrl('file://' + __dirname + '/view/hot-dev-app.html');
  } else {
    mainWindow.loadUrl('file://' + __dirname + '/view/app.html');
  }

  mainWindow.show();
  mainWindow.restore();

  mainWindow.on('close', function () {
    mainWindowState.saveState(mainWindow);
    mainWindow = null;
  });
}

function initializeSystemTray() {
  trayIcon = new Tray('view/images/icon.png');
  var contextMenu = Menu.buildFromTemplate([
    {   
      label: 'Dashboard',
      accelerator: 'CmdOrCtrl+D',
      click: openDashboardWindow
    },
    { label: 'Verbose', type: 'checkbox', checked: true },
    {   
      label: 'Quit',
      accelerator: 'CmdOrCtrl+Q',
      selector: 'terminate:',
      click: function() {
        app.quit();
      }
    }
    ]);
  trayIcon.setToolTip('This is my application.');
  trayIcon.setContextMenu(contextMenu);
}

function registerGlobalShortcuts() {
  var DASHBOARD_OPEN_SHORTCUT = 'ctrl+alt+x';
  var COPY_SHORTCUT = 'ctrl+alt+c';

  // Register a 'ctrl+x' shortcut listener.
  var ret = globalShortcut.register(DASHBOARD_OPEN_SHORTCUT, function() {
    openDashboardWindow();
  });

  var ret = globalShortcut.register(COPY_SHORTCUT, function() {
    console.log("copy");
  });

  if (!ret) {
    console.log('registration failed');
  }

  // Check whether a shortcut is registered.
  console.log(DASHBOARD_OPEN_SHORTCUT + ' is registered ' + globalShortcut.isRegistered(DASHBOARD_OPEN_SHORTCUT));
}

function testDatabase() {
  var databaseFilePath = jetpack.cwd(app.getPath('appData')).path('database.sqlite');

  Definition.create({
    key: 'javascript',
    value: 'javaynan ayni',
    usage: 'var',
    notes: '--',
    type: 'NOUN',
    sex: 'NEUTER'
  });

  Dictionary.create({
    name: 'bilisim'
  });

  OnlineSource.create({
    url: 'example.com'
  });

}

// Event bindings
// ==============

app.on('will-quit', function() {
  // Unregister all shortcuts.
  globalShortcut.unregisterAll();
});

app.on('window-all-closed', function() {
  // if 'window-all-closed' event is not handeled, main process is killed when all windows are closed.
});