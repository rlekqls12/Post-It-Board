import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { board, create } from "../../redux/modules/manageBoardStore";
import { changeFocus } from "../../redux/modules/focusBoardStore";
import "./index.css";

function BoardList() {
  /* ---- Variables ---- */

  const dispatch = useDispatch();

  const boardElementList: JSX.Element[] = useSelector((state: any) => {
    const {
      focusBoardStore: focusedBoardID,
      manageBoardStore: boardList,
    } = state;

    if (!focusedBoardID && boardList[0]?.id)
      dispatch(changeFocus(boardList[0].id));

    return boardList.map((board: board) => {
      const isBoardActive = board.id === focusedBoardID ? " active" : "";
      const getFocus = () => {
        if (focusedBoardID !== board.id) dispatch(changeFocus(board.id));
      };

      return (
        <li
          key={board.id}
          className={"board-item" + isBoardActive}
          onClick={getFocus}
        >
          <div>{board.name}</div>
        </li>
      );
    });
  }, shallowEqual);

  /* ---- Variables ---- */
  /* ---- Functions ---- */

  function createBoard() {
    dispatch(create("New\u00A0Board"));
  }

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
