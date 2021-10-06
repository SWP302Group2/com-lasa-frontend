
function Row({ classList = [], ...props }) {
  classList.push("row");

  return (
    <div className={classList.join(" ")}>
      {props.children}
    </div>
  );
}

export default Row;
