import { v4 } from 'uuid';

// Types
export type board = {
  id: string,
  name: string
}

export type action = {
  type: string,
  id?: string,
  name: string
}

// Actions
const ACTIONS = {
  INIT: 'MANAGE_BOARD_STORE_INIT',
  CREATE: 'MANAGE_BOARD_STORE_CREATE',
  MODIFY: 'MANAGE_BOARD_STORE_MODIFY'
}

// Action Functions
export const initialized = () => ({
  type: ACTIONS.INIT,
});

export const create = (id?: string) => ({
  type: ACTIONS.CREATE,
  id: id ?? v4(),
  name: "New\u00A0Board",
});

export const modify = (name: string, id: string) => ({
  type: ACTIONS.MODIFY,
  id: id,
  name: name
});

const saveLocalStorage = (state: board[]) => {
  localStorage.setItem('board', JSON.stringify(state));
}

// State Initialized
const init: board[] = [];

// Reducer
const manageBoardStore = (state = init, action: action) => {
  const { type, id, name } = action;

  switch (type) {
    case ACTIONS.INIT:
      const storageBoardData = localStorage.getItem('board');
      let initList = storageBoardData ? JSON.parse(storageBoardData) : state;
      return initList;
    case ACTIONS.CREATE:
      state.push({
        name,
        id: id ?? v4()
      });
      saveLocalStorage(state);
      return [...state];
    case ACTIONS.MODIFY:
      const [target] = state.filter((board: board) => board.id === id);
      if (target) target.name = name;
      saveLocalStorage(state);
      return [...state];
    default:
      return state;
  }
}

export default manageBoardStore;