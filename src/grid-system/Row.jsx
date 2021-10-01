import "./GridLibrary.css";

function Row({ classList, ...props }) {
  if (!classList) {
    classList = [];
  }
  classList.push("row");
  return <div className={classList.join(" ")}>{props.children}</div>;
}

export default Row;
