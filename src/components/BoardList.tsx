import React from "react";
import "./BoardList.css";

function BoardList() {
  return (
    <div className={"board-list"}>
      <ul className={"board-list-wrap"}></ul>
      <div className={"board-item-adder"}>+</div>
    </div>
  );
}

export default BoardList;
