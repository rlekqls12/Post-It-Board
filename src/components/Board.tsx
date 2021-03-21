import React from "react";
import "./Board.css";

function Board() {
  return (
    <div className={"board"}>
      <p className={"board-name-text"}>보드 이름</p>
      <div className={"board-area"}>
        <div className={"board-back-area"} />
      </div>
    </div>
  );
}

export default Board;
