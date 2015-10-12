/* Copyright (c) 2015 Kod Gemisi Ltd.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

 'use strict';

import {Dispatcher} from 'flux';

const instance = new Dispatcher();
export default instance;

// So we can conveniently do, `import {dispatch} from './dispatcher';`
export const dispatch = instance.dispatch.bind(instance);
