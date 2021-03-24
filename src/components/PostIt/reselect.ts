import { createSelector } from "reselect";
import { postIt } from "../../redux/modules/managePostItStore";
import { Props } from './index';

export const reselectProps = createSelector(
  (props: Props) => props,
  (props: Props) => props
)

export const reselectPostItData = createSelector(
  (state: any, focusedBoardID: string, id: string) => state.managePostItStore,
  (state: any, focusedBoardID: string, id: string) => focusedBoardID,
  (state: any, focusedBoardID: string, id: string) => id,
  (postItDataList: { [key: string]: postIt[]}, focusedBoardID: string, id: string): postIt | undefined => {
    const postItList = postItDataList[focusedBoardID];
    if (!postItList) return;
    
    return postItList?.find((postIt: postIt) => postIt.id === id);
  }
);

export const reselectIsFocused = createSelector(
  (state: any, id: string) => state.focusPostItStore,
  (state: any, id: string) => id,
  (focusedPostItID: string, id: string) => {
    return id === focusedPostItID;
  }
);