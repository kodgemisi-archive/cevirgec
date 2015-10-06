/* Copyright (c) 2015 Kod Gemisi Ltd. 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';

import React from 'react/addons';
import { Link } from 'react-router';

class Home extends React.Component {
  render() {
    return (
      <div>
        <div className="notice">This is homepage!</div>
        <Link className="notice" to="/dashboard">Dashboard</Link>
      </div>
    );
  }
}

export default Home;
