/* Copyright (c) 2015 Kod Gemisi Ltd.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';

import React, {Component} from 'react';
import {Container} from 'flux/utils';
import BreadcrumbStore from '../stores/BreadcrumbStore';

class Breadcrumb extends Component {

  static getStores(): Array<Store> {
    return [BreadcrumbStore];
  }

  static calculateState(prevState: ?State): State {
    return {routes: BreadcrumbStore.getRoutes()};
  }

  render() {

    if(this.state.routes.length == 0) {
      return null;
    }

    var cumulativeHrefPath = '#';
    var links =  this.state.routes.reduce(function (previousValue, currentValue, index, array) {
      cumulativeHrefPath += currentValue.path + (currentValue.path == '/' ? '' : '/');

      previousValue.push(<a href={cumulativeHrefPath} className="section">{currentValue.name}</a>);

      if(index < array.length -1) {
        previousValue.push(<i className="right angle icon divider"></i>);
      }

      return previousValue;
    }, []);

    return (
      <div className="ui breadcrumb">
        {links}
      </div>
    );
  }
}

export default Container.create(Breadcrumb);
