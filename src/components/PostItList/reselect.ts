import { createSelector } from "reselect";
import { postIt } from '../../redux/modules/managePostItStore';

export const reselectPostItList = createSelector(
  (state: any) => state.focusBoardStore,
  (state: any) => state.managePostItStore,
  (focusedBoardID: string, postItBoardList: { [key: string]: postIt[] }): [string, postIt[], number] => {
    const postItList = postItBoardList[focusedBoardID];
    if (!postItList) return [focusedBoardID, [], 0];

    let maxZIndex = 0;
    postItList.forEach((postIt: postIt) => {
      if (postIt.zIndex > maxZIndex) maxZIndex = postIt.zIndex;
    });

    return [focusedBoardID, postItList, maxZIndex];
  }
);