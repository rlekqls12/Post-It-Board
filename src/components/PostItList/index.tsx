import React, { useRef } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { reselectPostItList } from "./reselect";
import { postIt, create } from "../../redux/modules/managePostItStore";
import { changeFocus } from "../../redux/modules/focusPostItStore";
import PostIt from "../PostIt";
import "./index.css";

function PostItList() {
  /* ---- Variables ---- */

  const dispatch = useDispatch();

  const [focusedBoardID, postItElementList]: [
    string,
    JSX.Element[]
  ] = useSelector((state: any) => {
    const [focusedBoardID, postItList, maxZIndex] = reselectPostItList(state);
    if (!focusedBoardID) return [focusedBoardID, []];

    const postItElementList = postItList.map((_postIt: postIt) => (
      <PostIt key={_postIt.id} data={_postIt} maxZIndex={maxZIndex} />
    ));

    return [focusedBoardID, postItElementList];
  }, shallowEqual);

  const refBoardAreaDiv = useRef<HTMLDivElement>(null);

  /* ---- Variables ---- */
  /* ---- Functions ---- */

  function onBoardDoubleClick(e: React.MouseEvent<HTMLDivElement>) {
    if (!focusedBoardID) return;

    const { pageX: x, pageY: y } = e;
    const leftPadding = refBoardAreaDiv?.current?.offsetLeft ?? 0;

    const createdPostIt = dispatch(create(focusedBoardID, x - leftPadding, y));
    dispatch(changeFocus(createdPostIt.id));
  }

  /* ---- Functions ---- */

  return (
    <div ref={refBoardAreaDiv} className={"board-area"}>
      <div className={"board-back-area"} onDoubleClick={onBoardDoubleClick} />
      {postItElementList}
    </div>
  );
}

export default React.memo(PostItList);
