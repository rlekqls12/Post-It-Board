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
  CREATE: 'MANAGE_BOARD_STORE_CREATE',
  MODIFY: 'MANAGE_BOARD_STORE_MODIFY'
}

// Action Functions
export const create = (name: string, id?: string) => ({
  type: ACTIONS.CREATE,
  id: id ?? v4(),
  name: name,
});

export const modify = (name: string, id: string) => ({
  type: ACTIONS.MODIFY,
  id: id,
  name: name
});

// State Initialized
const init: board[] = [];

// Reducer
const manageBoardStore = (state = init, action: action) => {
  const { type, id, name, } = action;

  switch (type) {
    case ACTIONS.CREATE:
      state.push({
        name,
        id: id ?? v4()
      });
      // TODO: LocalStorage 저장
      return [...state];
    case ACTIONS.MODIFY:
      const [target] = state.filter((board: board) => board.id === id);
      if (target) target.name = name;
      // TODO: LocalStorage 수정
      return [...state];
    default:
      return state;
  }
}

export default manageBoardStore;