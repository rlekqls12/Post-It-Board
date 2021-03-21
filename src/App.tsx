import React from "react";
import Board from "./components/Board";
import BoardList from "./components/BoardList";

function App() {
  return (
    <div style={{ display: "flex" }}>
      <BoardList />
      <Board />
    </div>
  );
}

export default App;
