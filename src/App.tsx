import { useEffect } from "react";
import Board from "./components/Board";
import BoardList from "./components/BoardList";
import { useDispatch } from "react-redux";
import { initialized as initBoardList } from "./redux/modules/manageBoardStore";
import { initialized as initPostItList } from "./redux/modules/managePostItStore";

// MEMO: https://www.notion.so/afc136a0028b4dc098074d2ca76dfe1f

// MEMO: 포스트잇 추가되거나 수정될 때, 다른 포스트잇은 다시 안 그리는 방법 없는지 생각 해보기
// MEMO: 포스트잇 Formik으로 재구성하기

// DONE: 1. 포스트잇 생성
// TODO: 2. 포스트잇 수정
// TODO: 3. 포스트잇 최소화, 닫기
// TODO: 4. 포스트잇 드래그
// TODO: 5. 포스트잇 리사이즈

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initBoardList());
    dispatch(initPostItList());
  }, [dispatch]);

  return (
    <div style={{ display: "flex" }}>
      <BoardList />
      <Board />
    </div>
  );
}

export default App;
