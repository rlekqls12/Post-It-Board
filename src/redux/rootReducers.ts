import { combineReducers } from 'redux';
import manageBoardStore from './modules/manageBoardStore';
import focusBoardStore from './modules/focusBoardStore';
import managePostItStore from './modules/managePostItStore';
import focusPostItStore from './modules/focusPostItStore';

const rootReducer = combineReducers({
  manageBoardStore,
  focusBoardStore,
  managePostItStore,
  focusPostItStore
});

export default rootReducer;