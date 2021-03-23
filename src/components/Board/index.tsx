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

  function modifyBoardName(_boardName: string) {
    if (_boardName?.trim()?.length > 0) {
      const name = _boardName.replace(/\s/g, "\u00A0");

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

  return (
    <div className={"board"}>
      <Formik
        enableReinitialize
        initialValues={{
          tempBoardName: focusedBoardName,
        }}
        onSubmit={(_data) => modifyBoardName(_data.tempBoardName)}
      >
        {({ handleSubmit }) => (
          <Form>
            <Field
              name={"tempBoardName"}
              innerRef={refboardNameInput}
              className={"board-name-input"}
              maxLength={32}
              style={{ display: isBoardNameModify ? "block" : "none" }}
              onBlur={handleSubmit}
            />
          </Form>
        )}
      </Formik>
      <p
        className={"board-name-text"}
        style={{ display: isBoardNameModify ? "none" : "block" }}
        onClick={() => focusedBoardID && setBoardNameModifyState(true)}
      >
        {focusedBoardName}
      </p>
      <PostItList />
    </div>
  );
}

export default Board;
