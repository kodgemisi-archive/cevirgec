import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants from '../utils/constants';

var DictionaryActions = {
  create: function(text) {
    AppDispatcher.dispatch({
      actionType: Constants.DICTIONARY_CREATE,
      text: text
    });
  },
  destroy: function(id) {
    AppDispatcher.dispatch({
      actionType: Constants.DICTIONARY_DESTROY,
      id: id
    });
  },
};

module.exports = DictionaryActions;
