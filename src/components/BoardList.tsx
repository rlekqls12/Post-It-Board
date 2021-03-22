import React, { useCallback } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { board, create } from "../redux/modules/manageBoardStore";
import { changeFocus } from "../redux/modules/focusBoardStore";
import "./BoardList.css";

function BoardList() {
  /* ---- Variables ---- */

  const dispatch = useDispatch();

  const [focusedBoardID]: string[] = useSelector(
    (_state: any) => [_state.focusBoardStore],
    shallowEqual
  );
  const boardElementList: JSX.Element[] = useSelector((_state: any) => {
    const { manageBoardStore: _boardList } = _state;

    if (!focusedBoardID && _boardList[0]?.id)
      dispatch(changeFocus(_boardList[0].id));

    return _boardList.map((_board: board) => {
      const isBoardActive = _board.id === focusedBoardID ? " active" : "";
      const getFocus = () => dispatch(changeFocus(_board.id));

      return (
        <li
          key={_board.id}
          className={"board-item" + isBoardActive}
          onClick={getFocus}
        >
          <div>{_board.name}</div>
        </li>
      );
    });
  }, shallowEqual);

  /* ---- Variables ---- */
  /* ---- Functions ---- */

  const createBoard = useCallback(() => {
    dispatch(create("New\u00A0Board"));
  }, [dispatch]);

  /* ---- Functions ---- */

  return (
    <div className={"board-list"}>
      <ul className={"board-list-wrap"}>{boardElementList}</ul>
      <p className={"board-item-adder"} onClick={createBoard}>
        +
      </p>
    </div>
  );
}

export default BoardList;
