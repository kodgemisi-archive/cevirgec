/* Copyright (c) 2015 Kod Gemisi Ltd. 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';

import Immutable from 'immutable';

const TodoRecord = Immutable.Record({
  id: undefined,
  complete: undefined,
  text: undefined,
});

export default class Todo extends TodoRecord {
  constructor(text: string) {
    super({
      id: Date.now() + Math.round(Math.random() * 1000),
      complete: false,
      text,
    });
  }
}