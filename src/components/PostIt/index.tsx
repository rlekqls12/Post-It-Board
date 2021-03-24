import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { Form, Formik, Field } from "formik";
import { reselectProps, reselectIsFocused } from "./reselect";
import { postIt, modify } from "../../redux/modules/managePostItStore";
import { changeFocus } from "../../redux/modules/focusPostItStore";
import "./index.css";

export type Props = {
  data: postIt;
  maxZIndex: number;
};

const FocusType = {
  TITLE: "TITLE",
  BODY: "BODY",
};

function PostIt(props: Props) {
  /* ---- Variables ---- */

  const { data: postIt } = reselectProps(props);

  const dispatch = useDispatch();

  const focusedBoardID = useSelector(
    (state: any) => state.focusBoardStore,
    shallowEqual
  );
  const isFocused = useSelector(
    (state: any) => reselectIsFocused(state, postIt.id),
    shallowEqual
  );

  const refPostItTitleInput = useRef<any>();
  const refPostItNameInput = useRef<any>();
  const [focusElement, setFocusElement] = useState<string>("");

  /* ---- Variables ---- */
  /* ---- Functions ---- */

  function getFocus(type: string) {
    if (isFocused) return;
    setFocusElement(type);
    dispatch(changeFocus(postIt.id));
  }

  function lossFocus() {
    if (!isFocused) return;
    setFocusElement("");
    dispatch(changeFocus(""));
  }

  function onSubmit(data: any) {
    const { tempPostItTitle, tempPostItBody } = data;
    if (tempPostItTitle !== postIt.title || tempPostItBody !== postIt.body) {
      dispatch(
        modify(focusedBoardID, postIt.id, tempPostItTitle, tempPostItBody)
      );
    }
    lossFocus();
  }

  /* ---- Functions ---- */
  /* ---- Events ---- */

  useEffect(() => {
    if (!focusElement) return;

    let current: any;
    if (focusElement === FocusType.TITLE)
      current = refPostItTitleInput?.current;
    else if (focusElement === FocusType.BODY)
      current = refPostItNameInput?.current;

    if (current) current.focus();
  }, [focusElement]);

  /* ---- Events ---- */

  const headFocus = isFocused ? " post-it-focus" : "";
  const modifyVisible = isFocused ? "d-inline-block" : "d-none";
  const textVisible = isFocused ? "d-none" : "d-inline-block";

  return (
    <div
      className={"post-it"}
      style={{
        left: `${postIt.x}px`,
        top: `${postIt.y}px`,
        width: `${postIt.width}px`,
        height: `${postIt.height}px`,
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
            <div className={"post-it-head " + headFocus}>
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
                <div className={"post-it-control-item"}>-</div>
                <div className={"post-it-control-item"}>X</div>
              </div>
            </div>
            <div
              className={"post-it-body"}
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
