import "./GridLibrary.css";

function Column({ classList, ...props }) {
  if (!classList) {
    classList = [];
  }
  classList.push("col");
  return <div className={classList.join(" ")}>{props.children}</div>;
}

export default Column;
