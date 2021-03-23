import { reselectProps } from "./reselect";
import { postIt } from "../../redux/modules/managePostItStore";
import "./index.css";

export type Props = {
  data: postIt;
  maxZIndex: number;
};

function PostIt(props: Props) {
  /* ---- Variables ---- */

  const { data: postIt } = reselectProps(props);

  /* ---- Variables ---- */

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
      <div className={"post-it-head"}>
        {postIt.title}
        <div className={"post-it-control"}>
          <div className={"post-it-control-item"}>-</div>
          <div className={"post-it-control-item"}>X</div>
        </div>
      </div>
      <div className={"post-it-body"}>{postIt.body}</div>
    </div>
  );
}

export default PostIt;
