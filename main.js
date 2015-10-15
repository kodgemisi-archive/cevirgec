/* Copyright (c) 2015 Kod Gemisi Ltd.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* eslint no-path-concat: 0, func-names:0 */

'use strict';

require('electron-debug')();
require('crash-reporter').start();

var app = require('app');
var devHelper = require('./vendor/electron-boilerplate/app/vendor/electron_boilerplate/dev_helper');

var assert = require('assert');
var jetpack = require('fs-jetpack');
var globalShortcut = require('global-shortcut');
var Menu = require('menu');
var Tray = require('tray');

var Definition = require('./backend/model/Definition');
var Dictionary = require('./backend/model/Dictionary');
var OnlineSource = require('./backend/model/OnlineSource');

var windowHelper = require('./backend/WindowHelper');
var shortcutHelper = require('./backend/ShortcutHelper');

var Sequelize = require('sequelize');

require('./backend/dao/DictionaryDao');
require('./backend/dao/DefinitionDao');

var trayIcon = null;

app.on('ready', function () {
  initializeSystemTray();
  shortcutHelper.registerGlobalShortcuts();
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

// Event bindings
// ==============

app.on('will-quit', function() {
  // Unregister all shortcuts.
  globalShortcut.unregisterAll();
});

app.on('window-all-closed', function() {
  // if 'window-all-closed' event is not handeled, main process is killed when all windows are closed.
});
