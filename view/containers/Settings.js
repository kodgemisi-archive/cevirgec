/* Copyright (c) 2015 Kod Gemisi Ltd. 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';

import React, {Component} from 'react';
import { Link } from 'react-router';
import SideMenu from '../components/SideMenu';

class Settings extends Component {
  render() {
    return (
      <div className="ui grid">
          <div className="three wide column">
            <SideMenu />
          </div>
          <div className="thirteen wide column">
            <section>{this.props.children}</section>
          </div>
        </div>
    );
  }
}

export default Settings;
