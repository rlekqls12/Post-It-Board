import { v4 } from "uuid";

// Types
export type postIt = {
  id: string,
  title: string,
  body: string,
  x: number,
  y: number,
  width: number,
  height: number,
  open: boolean,
  zIndex: number,
};

type state = {
  [key: string]: postIt[]
}

export type action = {
  type: string,
  board: string,
  id?: string,
  title?: string,
  body?: string,
  x?: number,
  y?: number,
  width?: number,
  height?: number,
  open?: boolean,
  zIndex?: number
}

// Actions
const ACTIONS = {
  INIT: 'MANAGE_POSTIT_STORE_INIT',
  CREATE: 'MANAGE_POSTIT_STORE_CREATE',
  MODIFY: 'MANAGE_POSTIT_STORE_MODIFY',
  MOVE: 'MANAGE_POSTIT_STORE_MOVE',
  RESIZE: 'MANAGE_POSTIT_STORE_RESIZE',
  TOGGLE: 'MANAGE_POSTIT_STORE_TOGGLE',
  REMOVE: 'MANAGE_POSTIT_STORE_REMOVE'
}

// Action Functions
export const initialized = () => ({
  type: ACTIONS.INIT,
});

export const create = (board: string, x: number, y: number, id?: string) => ({
  type: ACTIONS.CREATE,
  board: board,
  id: id ?? v4(),
  title: 'New\u00A0PostIt',
  body: '',
  x: x,
  y: y,
  open: true
});

export const modify = (board: string, id: string, title?: string, body?: string, zIndex?: number) => ({
  type: ACTIONS.MODIFY,
  board: board,
  id: id,
  title: title,
  body: body,
  zIndex: zIndex
});

export const move = (board: string, id: string, x: number, y: number) => ({
  type: ACTIONS.MOVE,
  board: board,
  id: id,
  x: x,
  y: y
});

export const resize = (board: string, id: string, x?: number, y?: number, width?: number, height?: number) => ({
  type: ACTIONS.MOVE,
  board: board,
  id: id,
  x: x,
  y: y,
  width: width,
  height: height
});

export const toggle = (board: string, id: string, open: boolean) => ({
  type: ACTIONS.TOGGLE,
  board: board,
  id: id,
  open: open,
});

export const remove = (board: string, id: string) => ({
  type: ACTIONS.REMOVE,
  board: board,
  id: id
});

const saveLocalStorage = (state: state) => {
  localStorage.setItem('postit', JSON.stringify(state));
}

// State Initialized
const init: state = {};

// Reducer
const managePostItStore = (state = init, action: action) => {
  const { type } = action;
  if (Object.values(ACTIONS).indexOf(type) === -1) return state;

  if (type === ACTIONS.INIT) {
    const storagePostItData = localStorage.getItem('postit');
    let initList = storagePostItData ? JSON.parse(storagePostItData) : state;
    return initList;
  }

  const { board, id, title, body, x, y, width, height, open, zIndex } = action;
  if (!board) return state;

  if (!state[board]) {
    state[board] = [];

    if (type !== ACTIONS.CREATE) return state;
  }

  if (type === ACTIONS.CREATE) {
    state[board].push({
      id: id ?? v4(),
      title: title ?? '',
      body: body ?? '',
      x: x ?? 0,
      y: y ?? 0,
      width: 320,
      height: 240,
      open: open ?? true,
      zIndex: 0
    });
    saveLocalStorage(state);

    return {...state};
  }

  if (!id) return state;
  const targetIndex = state[board].findIndex((postit: postIt, index: number) => postit.id === id);
  if (typeof targetIndex !== 'number') return state;

  if (type === ACTIONS.REMOVE) {
    state[board].splice(targetIndex, 1);
    saveLocalStorage(state);

    return {...state};
  }

  const target = state[board][targetIndex];
  if (!target) return state;

  let modifyObject: any = {}
  switch (type) {
    case ACTIONS.MODIFY:
      modifyObject = {
        title: title ?? target.title,
        body: body ?? target.body,
        zIndex: zIndex ?? target.zIndex
      };
      break;
    case ACTIONS.MOVE:
      modifyObject = {
        x: x ?? target.x,
        y: y ?? target.y
      };
      break;
      case ACTIONS.RESIZE:
        modifyObject = {
          x: x ?? target.x,
          y: y ?? target.y,
          width: width ?? target.width,
          height: height ?? target.height
        };
        break;
    case ACTIONS.TOGGLE:
      modifyObject = {
        open: open ?? target.open,
      };
      break;
    default:
      return state;
  }

  Object.assign(target, modifyObject);
  saveLocalStorage(state);

  return {...state};
}

export default managePostItStore;