import "./GridLibrary.css";

function Row({ classList, noGutter, ...props }) {
  if (!classList) {
    classList = [];
  }
  classList.push("row");
  if (noGutter) {
    classList.push("no-gutters");
  }
  return <div className={classList.join(" ")}>{props.children}</div>;
}

export default Row;
