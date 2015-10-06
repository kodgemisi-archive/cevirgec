/* Copyright (c) 2015 Kod Gemisi Ltd. 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* eslint no-path-concat: 0, func-names:0 */

require('electron-debug')();
require('crash-reporter').start();

var app = require('app');
var devHelper = require('./vendor/electron-boilerplate/app/vendor/electron_boilerplate/dev_helper');
var globalShortcut = require('global-shortcut');
var assert = require('assert');
var jetpack = require('fs-jetpack');

var Menu = require('menu');
var Tray = require('tray');

var Definition = require('./backend/model/definition');
var Dictionary = require('./backend/model/dictionary');
var OnlineSource = require('./backend/model/onlineSource');

var windowHelper = require('./backend/WindowHelper');

var Sequelize = require('sequelize');

var trayIcon = null;


app.on('ready', function () {

  testDatabase();

  initializeSystemTray();

  registerGlobalShortcuts();

});

function initializeSystemTray() {
  trayIcon = new Tray('view/images/icon.png');
  var contextMenu = Menu.buildFromTemplate([
    {   
      label: 'Dashboard',
      accelerator: 'CmdOrCtrl+D',
      click: windowHelper.openDashboardWindow
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
    windowHelper.openDashboardWindow();
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