import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { Form, Formik, Field } from "formik";
import {
  reselectProps,
  reselectIsFocused,
  reselectPostItData,
} from "./reselect";
import {
  postIt,
  modify,
  move,
  toggle,
  remove,
} from "../../redux/modules/managePostItStore";
import { changeFocus } from "../../redux/modules/focusPostItStore";
import "./index.css";

export type Props = {
  id: string;
  maxZIndex: number;
};

const FocusType = {
  TITLE: "TITLE",
  BODY: "BODY",
};

const initPostItData = {
  id: "",
  title: "",
  body: "",
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  open: false,
  zIndex: 0,
};

function PostIt(props: Props) {
  /* ---- Variables ---- */

  const { id, maxZIndex } = reselectProps(props);

  const dispatch = useDispatch();

  const focusedBoardID = useSelector(
    (state: any) => state.focusBoardStore,
    shallowEqual
  );
  const postIt: postIt = useSelector(
    (state: any) =>
      reselectPostItData(state, focusedBoardID, id) ?? initPostItData,
    shallowEqual
  );
  const isFocused = useSelector(
    (state: any) => reselectIsFocused(state, id),
    shallowEqual
  );

  const refPostItTitleInput = useRef<any>();
  const refPostItNameInput = useRef<any>();
  const [focusElement, setFocusElement] = useState<string>("");

  const [dragState, setDragState] = useState<boolean>(false);
  const [adderXY, setAdderXY] = useState<number[]>([0, 0]);
  const [startXY, setStartXY] = useState<number[]>([0, 0]);

  /* ---- Variables ---- */
  /* ---- Functions ---- */

  function getFocus(type: string) {
    if (isFocused) return;
    setFocusElement(type);
    dispatch(changeFocus(id));
    updateZIndex();
  }

  function lossFocus() {
    if (!isFocused) return;
    setFocusElement("");
    dispatch(changeFocus(""));
  }

  function onSubmit(data: any) {
    const { tempPostItTitle, tempPostItBody } = data;
    if (tempPostItTitle !== postIt.title || tempPostItBody !== postIt.body) {
      dispatch(modify(focusedBoardID, id, tempPostItTitle, tempPostItBody));
    }
    lossFocus();
  }

  function togglePostIt() {
    updateZIndex();
    dispatch(toggle(focusedBoardID, id, !postIt.open));
  }

  function updateZIndex() {
    dispatch(modify(focusedBoardID, id, undefined, undefined, maxZIndex + 1));
  }

  function removePostIt() {
    let isDelete = true;
    if (postIt.body.length > 0)
      isDelete = globalThis.confirm("????????? ?????????????????????????");
    if (isDelete) dispatch(remove(focusedBoardID, id));
  }

  function postItDragStart(e: React.DragEvent<HTMLDivElement>) {
    const { pageX, pageY } = e;
    updateZIndex();
    setStartXY([pageX, pageY]);
    setDragState(true);
  }

  function postItDragOver(e: React.DragEvent<HTMLDivElement>) {
    if (!dragState) return;

    const { pageX, pageY } = e;
    setAdderXY([pageX - startXY[0], pageY - startXY[1]]);
  }

  function postItDragEnd(e: React.DragEvent<HTMLDivElement>) {
    if (!dragState) return;

    dispatch(
      move(focusedBoardID, id, postIt.x + adderXY[0], postIt.y + adderXY[1])
    );
    setAdderXY([0, 0]);
    setDragState(false);
  }

  /* ---- Functions ---- */
  /* ---- Events ---- */

  useEffect(() => {
    let current: any;

    if (focusElement === FocusType.BODY) current = refPostItNameInput?.current;
    else current = refPostItTitleInput?.current;

    if (current) current.focus();
  }, [focusElement]);

  /* ---- Events ---- */

  const headFocus = isFocused ? " post-it-focus" : "";
  const modifyVisible = isFocused ? "d-inline-block" : "d-none";
  const textVisible = isFocused ? "d-none" : "d-inline-block";
  const minializedPostIt = postIt.open ? `${postIt.height}px` : "auto";
  const minializedBody = postIt.open ? "" : "minimalized";

  return (
    <div
      className={"post-it"}
      style={{
        left: `${postIt.x + adderXY[0]}px`,
        top: `${postIt.y + adderXY[1]}px`,
        width: `${postIt.width}px`,
        height: minializedPostIt,
        zIndex: postIt.zIndex,
      }}
    >
      <Formik
        enableReinitialize
        initialValues={{
          tempPostItTitle: postIt.title,
          tempPostItBody: postIt.body,
        }}
        onSubmit={onSubmit}
      >
        {({ handleSubmit }) => (
          <Form className={"post-it-form"} onBlur={handleSubmit}>
            <div
              draggable
              className={"post-it-head " + headFocus}
              onDragStart={postItDragStart}
              onDragOver={postItDragOver}
              onDragEnd={postItDragEnd}
            >
              <Field
                name={"tempPostItTitle"}
                innerRef={refPostItTitleInput}
                className={"post-it-title-input " + modifyVisible}
                maxLength={32}
              />
              <div
                className={"post-it-title-text " + textVisible}
                onClick={() => getFocus(FocusType.TITLE)}
              >
                {postIt.title}
              </div>
              <div className={"post-it-control"}>
                <div className={"post-it-control-item"} onClick={togglePostIt}>
                  -
                </div>
                <div className={"post-it-control-item"} onClick={removePostIt}>
                  X
                </div>
              </div>
            </div>
            <div
              className={"post-it-body " + minializedBody}
              onClick={() => getFocus(FocusType.BODY)}
            >
              <Field
                name={"tempPostItBody"}
                innerRef={refPostItNameInput}
                className={"post-it-body-textarea " + modifyVisible}
                as="textarea"
              />
              <div className={"post-it-body-text " + textVisible}>
                {postIt.body}
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default PostIt;
