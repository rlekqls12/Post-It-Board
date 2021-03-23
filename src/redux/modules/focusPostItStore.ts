// Types
export type action = {
  type: string,
  id?: string
}

// Actions
const CHANGE_FOCUS = 'FOCUS_POSTIT_STORE_CHANGE_FOCUS';

// Action Functions
export const changeFocus = (id: string) => ({
  type: CHANGE_FOCUS,
  id: id
});

// State Initialized
const init: string = "";

// Reducer
const focusPostItStore = (state = init, action: action) => {
  const { type, id } = action;

  switch (type) {
    case CHANGE_FOCUS:
      return id ?? "";
    default:
      return state;
  }
}

export default focusPostItStore;