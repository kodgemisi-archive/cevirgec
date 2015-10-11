/* Copyright (c) 2015 Kod Gemisi Ltd.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';

import React, {Component} from 'react';
import { Link } from 'react-router';
import DocumentTitle from 'react-document-title';

import tr from '../utils/Translation';

class Dictionaries extends Component {
  render() {
    return (
      <DocumentTitle title={tr('Cevirgec › Dictionaries')}>
        <div className="notice">This is Dictionaries page!</div>
      </DocumentTitle>
    );
  }
}

export default Dictionaries;
