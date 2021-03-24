import { createSelector } from "reselect";
import { postIt } from '../../redux/modules/managePostItStore';
import { postItData } from './index';

const reselectPostItList = createSelector(
  (state: any) => state.focusBoardStore,
  (state: any) => state.managePostItStore,
  (focusedBoardID: string, postItBoardList: { [key: string]: postIt[] }): [string, postItData[]] => {
    const postItList = postItBoardList[focusedBoardID];
    if (!postItList) return [focusedBoardID, []];

    let maxZIndex = 0;
    postItList.forEach((postIt: postIt) => {
      if (postIt.zIndex > maxZIndex) maxZIndex = postIt.zIndex;
    });
    
    const postItDataList = postItList.map(
      (postIt: postIt): postItData => ({
        id: postIt.id,
        data: postIt,
        maxZIndex: maxZIndex,
      })
    );

    return [focusedBoardID, postItDataList];
  }
);

export const getPostItList = (state: any): [string, postItData[]] => reselectPostItList(state);