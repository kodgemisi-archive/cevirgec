/* Copyright (c) 2015 Kod Gemisi Ltd. 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';

var app = require('app');
var jetpack = require('fs-jetpack');
var globalShortcut = require('global-shortcut');
var windowHelper = require('./WindowHelper');

var DASHBOARD_OPEN_SHORTCUT = 'ctrl+alt+x';
var COPY_SHORTCUT = 'ctrl+alt+c';

var userDataDir = jetpack.cwd(app.getPath('userData'));
console.log(app.getPath('userData'));

var shortcutStorageFile = 'shortcuts.json';

var shortcutCallbacks = {
  DASHBOARD_OPEN_SHORTCUT: function dashboardOpenShortcutCallback () {
    windowHelper.openDashboardWindow();
  },
  WORD_ADD_SHORTCUT: function wordAddShortcutCallback () {
    console.log('ctrl+alt+a PRESSED');
  },
  LOOK_UP_SHORTCUT: function wordAddShortcutCallback () {
    console.log('ctrl+alt+s PRESSED');
  }
}
Object.freeze(shortcutCallbacks);

var defaultShortcuts = {
  DASHBOARD_OPEN_SHORTCUT: 'ctrl+alt+x',
  WORD_ADD_SHORTCUT: 'ctrl+alt+a',
  LOOK_UP_SHORTCUT: 'ctrl+alt+s',
}

class ShortcutHelper {
  // this.shortcuts = undefined;

  constructor() {
    this.restoreShortcuts();
  }

  registerGlobalShortcuts() {
    Object.keys(this.shortcuts).forEach(function (key, index, array) {
      this.registerGlobalShortcut(this.shortcuts[key], shortcutCallbacks[key]);
    }, this);
  }

  registerGlobalShortcut(shortcut, callback) {
    var ret = globalShortcut.register(shortcut, callback);

    if (ret) {
      // Check whether a shortcut is registered.
      console.log(shortcut, ' is registered: ', globalShortcut.isRegistered(shortcut));
      return true;
    }

    console.log(shortcut, 'registration failed');
    return false;
  }

  restoreShortcuts() {
    this.shortcuts = userDataDir.read(shortcutStorageFile, 'json') || defaultShortcuts;
  }

  saveShortcuts() {
    userDataDir.write(shortcutStorageFile, this.shortcuts, { atomic: true });
  }

  // shortcutType one of the keys of defaultShortcuts
  setShortcut(shortcutType, shortcutString) {
    if(typeof defaultShortcuts[shortcutType] === undefined) {
      throw new Error(shortcutType + ' is not a valid shortcut key!');
    }

    if(this.registerGlobalShortcut(this.shortcut[shortcutType], shortcutCallbacks[shortcutType])) {
      globalShortcut.unregister(this.shortcut[shortcutType]);
      this.shortcut[shortcutType] = shortcutString;
      this.saveShortcuts();
    }
  }

  getDefaultShortcuts() {
    return defaultShortcuts;
  }
}

module.exports = new ShortcutHelper();