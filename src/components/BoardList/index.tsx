import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { board, create } from "../../redux/modules/manageBoardStore";
import { changeFocus } from "../../redux/modules/focusBoardStore";
import "./index.css";

type boardData = {
  id: string;
  name: string;
  active: boolean;
  onClick: () => void;
};

function BoardList() {
  /* ---- Variables ---- */

  const dispatch = useDispatch();

  const boardList: boardData[] = useSelector((state: any) => {
    const {
      focusBoardStore: focusedBoardID,
      manageBoardStore: boardList,
    } = state;

    if (!focusedBoardID && boardList[0]?.id)
      dispatch(changeFocus(boardList[0].id));

    return boardList.map(
      (board: board): boardData => {
        const getFocus = () => {
          if (focusedBoardID !== board.id) dispatch(changeFocus(board.id));
        };

        return {
          id: board.id,
          name: board.name,
          active: board.id === focusedBoardID,
          onClick: getFocus,
        };
      }
    );
  }, shallowEqual);

  /* ---- Variables ---- */
  /* ---- Functions ---- */

  function createBoard() {
    dispatch(create("New\u00A0Board"));
  }

  /* ---- Functions ---- */

  const boardElementList = boardList.map((data: boardData) => (
    <li
      key={data.id}
      className={"board-item" + (data.active ? " active" : "")}
      onClick={data.onClick}
    >
      <div>{data.name}</div>
    </li>
  ));

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
