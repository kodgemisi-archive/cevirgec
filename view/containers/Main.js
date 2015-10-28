/* Copyright (c) 2015 Kod Gemisi Ltd.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';

import React, {Component} from 'react';
import Breadcrumb from '../components/Breadcrumb';

class Main extends Component {
  render() {
  return (
    <main className="container">
      <Breadcrumb />
      {this.props.children}
    </main>
  );
  }
}

export default Main;
