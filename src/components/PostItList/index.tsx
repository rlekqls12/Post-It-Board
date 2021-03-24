import React, { useRef } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { getPostItList } from "./reselect";
import { postIt, create } from "../../redux/modules/managePostItStore";
import { changeFocus } from "../../redux/modules/focusPostItStore";
import PostIt from "../PostIt";
import "./index.css";

export type postItData = {
  id: string;
  data: postIt;
  maxZIndex: number;
};

function PostItList() {
  /* ---- Variables ---- */

  const dispatch = useDispatch();

  const [focusedBoardID, postItList]: [string, postItData[]] = useSelector(
    getPostItList,
    shallowEqual
  );

  const refBoardAreaDiv = useRef<HTMLDivElement>(null);

  /* ---- Variables ---- */
  /* ---- Functions ---- */

  function onBoardDoubleClick(e: React.MouseEvent<HTMLDivElement>) {
    if (!focusedBoardID) return;

    const { pageX: x, pageY: y } = e;
    const leftMargin = refBoardAreaDiv?.current?.offsetLeft ?? 0;

    const createdPostIt = dispatch(create(focusedBoardID, x - leftMargin, y));
    dispatch(changeFocus(createdPostIt.id));
  }

  /* ---- Functions ---- */

  const postItElementList = postItList.map((data: postItData) => (
    <PostIt key={data.id} data={data.data} maxZIndex={data.maxZIndex} />
  ));

  return (
    <div ref={refBoardAreaDiv} className={"board-area"}>
      <div className={"board-back-area"} onDoubleClick={onBoardDoubleClick} />
      {postItElementList}
    </div>
  );
}

export default React.memo(PostItList);
