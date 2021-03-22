import React from "react";
import Board from "./components/Board";
import BoardList from "./components/BoardList";

// MEMO: https://www.notion.so/afc136a0028b4dc098074d2ca76dfe1f
// MEMO: Immer Library 사용? https://react.vlpt.us/basic/23-immer.html (포스트잇 관리할 때, 생각해보기)

// TODO: 1. Reselect 적용
// TODO: 2. LocalStorage 적용

// TODO: 1. 포스트잇 생성
// TODO: 2. 포스트잇 수정
// TODO: 3. 포스트잇 최소화, 닫기
// TODO: 4. 포스트잇 드래그
// TODO: 5. 포스트잇 리사이즈

function App() {
  return (
    <div style={{ display: "flex" }}>
      <BoardList />
      <Board />
    </div>
  );
}

export default App;
