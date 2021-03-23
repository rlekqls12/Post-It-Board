import { createSelector } from 'reselect';
import { board } from "../../redux/modules/manageBoardStore";

const reselectFocusedBoardData = createSelector(
  (state: any) => state.focusBoardStore,
  (state: any) => state.manageBoardStore,
  (focusedBoardID: string, boardList: board[]): [string, string] => {
    const focusedBoard: board | undefined = boardList.find(
      (board: board) => board.id === focusedBoardID
    );

    return [focusedBoardID, focusedBoard?.name ?? ""];
  }
);

export const getFocusedBoardData = (state: any) => reselectFocusedBoardData(state);