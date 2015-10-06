/* Copyright (c) 2015 Kod Gemisi Ltd. 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

var BrowserWindow = require('browser-window');
var windowStateKeeper = require('../vendor/electron-boilerplate/app/vendor/electron_boilerplate/window_state');
var menuHelper = require('./MenuHelper')

var mainWindow = null;
var mainWindowState;

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
    show: false
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
    mainWindow.loadUrl('file://' + __dirname + '/../view/hot-dev-app.html');
  } else {
    mainWindow.loadUrl('file://' + __dirname + '/../view/app.html');
  }

  mainWindow.webContents.on('did-finish-load', function() {
    mainWindow.show();
    mainWindow.restore();
  });

  mainWindow.on('close', function () {
    mainWindowState.saveState(mainWindow);
    mainWindow = null;
  });
}

module.exports = {
  openDashboardWindow
}