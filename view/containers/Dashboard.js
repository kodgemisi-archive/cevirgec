'use strict';

import React from 'react/addons';
import {Component} from 'react';
import DictionaryStore from '../stores/DictionaryStore';
import DictionaryActions from '../actions/DictionaryActions';
import Constants from '../utils/constants';
import {dispatch} from '../dispatcher/AppDispatcher';
import {Container} from 'flux/utils';

class Dashboard extends Component {

  static getStores(): Array<Store> {
    return [DictionaryStore];
  }

  static calculateState(prevState: ?State): State {
    return {
      dictionaries: DictionaryStore.getState()
    };
  }

  render() {

    var dicts = [];

    for (let [id, todo] of this.state.dictionaries) {
      dicts.push(<li key={id} >{todo}</li>);
    }
    return (
      <div className="dashboard-component">
        <h3>Huloooo Dashboard</h3>
        <div>
          <ul>
            {dicts}
          </ul>
        </div>
        <input type="text" ref="dictName" name="dictName"></input>
        {/*http://stackoverflow.com/questions/29577977/react-ref-and-setstate-not-working-with-es6*/}
        <input type="submit" id="createDict" onClick={this._onCreateClick.bind(this)}></input>
      </div>
    );
  }

  _onCreateClick() {
    var dictName = React.findDOMNode(this.refs.dictName).value.trim();
    React.findDOMNode(this.refs.dictName).value = '';
    dispatch({
      type: Constants.DICTIONARY_CREATE,
      name: dictName,
    });
  }
}

const DashboardContainer = Container.create(Dashboard);
export default DashboardContainer;
