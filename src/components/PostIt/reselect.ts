import { createSelector } from "reselect";
import { Props } from './index';

export const reselectProps = createSelector(
  (props: Props) => props,
  (props: Props) => props
)

export const reselectIsFocused = createSelector(
  (state: any, id: string) => state.focusPostItStore,
  (state: any, id: string) => id,
  (focusedPostItID: string, id: string) => {
    return id === focusedPostItID;
  }
);