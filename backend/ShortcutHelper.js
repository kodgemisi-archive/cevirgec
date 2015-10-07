/* Copyright (c) 2015 Kod Gemisi Ltd. 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';

var globalShortcut = require('global-shortcut');
var windowHelper = require('./WindowHelper');

var DASHBOARD_OPEN_SHORTCUT = 'ctrl+alt+x';
var COPY_SHORTCUT = 'ctrl+alt+c';

class ShortcutHelper {
  registerGlobalShortcuts() {

    this.registerGlobalShortcut(DASHBOARD_OPEN_SHORTCUT, function() {
      windowHelper.openDashboardWindow();
    });

    this.registerGlobalShortcut(COPY_SHORTCUT, function () {
      console.log('COPY', arguments);
    });
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
}

module.exports = new ShortcutHelper();