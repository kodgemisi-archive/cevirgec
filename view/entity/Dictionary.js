'use strict';

import Immutable from 'immutable';

const TodoRecord = Immutable.Record({
  id: undefined,
  complete: undefined,
  text: undefined,
});

export default class Todo extends TodoRecord {
  id: string;
  complete: boolean;
  text: string;

  constructor(text: string) {
    super({
      id: Date.now() + Math.round(Math.random() * 1000),
      complete: false,
      text,
    });
  }
}