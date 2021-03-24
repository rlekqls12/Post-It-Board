import { useEffect } from "react";
import Board from "./components/Board";
import BoardList from "./components/BoardList";
import { useSelector, useDispatch } from "react-redux";
import { initialized as initBoardList } from "./redux/modules/manageBoardStore";
import { initialized as initPostItList } from "./redux/modules/managePostItStore";
import { create } from "./redux/modules/managePostItStore";

// MEMO: https://www.notion.so/afc136a0028b4dc098074d2ca76dfe1f

// MEMO: 포스트잇 Formik으로 재구성하기

// DONE: 1. 포스트잇 생성
// DONE: 2. 포스트잇 수정
// TODO: 3. 포스트잇 최소화, 닫기
// TODO: 4. 포스트잇 드래그
// TODO: 5. 포스트잇 리사이즈

const keys: any = {};

function App() {
  const dispatch = useDispatch();
  const focusedBoardID: string = useSelector(
    (state: any) => state.focusBoardStore
  );

  useEffect(() => {
    dispatch(initBoardList());
    dispatch(initPostItList());
  }, [dispatch]);

  useEffect(() => {
    function onKeyUp(e: KeyboardEvent) {
      if (!e) return;
      delete keys[e.key.toLowerCase()];
      delete keys[e.keyCode];
    }

    function onKeyDown(e: KeyboardEvent) {
      if (!e) return;
      keys[e.key.toLowerCase()] = true;
      keys[e.keyCode] = true;

      if (
        (keys["control"] && keys["alt"] && keys["n"]) ||
        (keys["17"] && keys["18"] && keys["78"])
      ) {
        dispatch(create(focusedBoardID, 0, 0));
      }
    }

    globalThis.addEventListener("keyup", onKeyUp);
    globalThis.addEventListener("keydown", onKeyDown);
    return () => {
      globalThis.removeEventListener("keyup", onKeyUp);
      globalThis.removeEventListener("keydown", onKeyDown);
    };
  }, [dispatch, focusedBoardID]);

  return (
    <div style={{ display: "flex" }}>
      <BoardList />
      <Board />
    </div>
  );
}

export default App;
