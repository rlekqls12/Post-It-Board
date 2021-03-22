import { combineReducers } from 'redux';
import manageBoardStore from './modules/manageBoardStore';
import focusBoardStore from './modules/focusBoardStore';

const rootReducer = combineReducers({
  manageBoardStore,
  focusBoardStore
});

export default rootReducer;