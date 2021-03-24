import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { Formik, Form, Field } from "formik";
import { getFocusedBoardData } from "./reselect";
import { modify as modifyName } from "../../redux/modules/manageBoardStore";
import PostItList from "../PostItList";
import "./index.css";

function Board() {
  /* ---- Variables ---- */

  const dispatch = useDispatch();

  const [focusedBoardID, focusedBoardName]: [string, string] = useSelector(
    getFocusedBoardData,
    shallowEqual
  );

  const refboardNameInput = useRef<any>();
  const [isBoardNameModify, setBoardNameModifyState] = useState<boolean>(false);

  /* ---- Variables ---- */
  /* ---- Functions ---- */

  function modifyBoardName(boardName: string) {
    if (boardName?.trim()?.length > 0) {
      const name = boardName.replace(/\s/g, "\u00A0");

      if (focusedBoardName !== name) {
        dispatch(modifyName(name, focusedBoardID));
      }
    }

    setBoardNameModifyState(false);
  }

  /* ---- Functions ---- */
  /* ---- Events ---- */

  useEffect(() => {
    const { current: input } = refboardNameInput;
    if (isBoardNameModify && input) input.focus();
  }, [isBoardNameModify]);

  /* ---- Events ---- */

  const nameInputVisible = isBoardNameModify ? "d-block" : "d-none";
  const nameTextVisible = isBoardNameModify ? "d-none" : "d-block";

  return (
    <div className={"board"}>
      <Formik
        enableReinitialize
        initialValues={{
          tempBoardName: focusedBoardName,
        }}
        onSubmit={(data) => modifyBoardName(data.tempBoardName)}
      >
        {({ handleSubmit }) => (
          <Form>
            <Field
              name={"tempBoardName"}
              innerRef={refboardNameInput}
              className={"board-name-input " + nameInputVisible}
              maxLength={32}
              onBlur={handleSubmit}
            />
          </Form>
        )}
      </Formik>
      <p
        className={"board-name-text " + nameTextVisible}
        onClick={() => focusedBoardID && setBoardNameModifyState(true)}
      >
        {focusedBoardName}
      </p>
      <PostItList />
    </div>
  );
}

export default Board;
