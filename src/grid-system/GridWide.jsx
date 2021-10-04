
function GridWide({ classList, id, ...props }) {
  if (!classList) {
    classList = [];
  }
  classList.push("grid");
  classList.push("wide");

  return (
    <div className={classList.join(" ")} id={id}>
      {props.children}
    </div>
  );
}

export default GridWide;
