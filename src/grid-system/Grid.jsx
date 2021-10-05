
function Grid({ classList, id, ...props }) {
    if (!classList) {
        classList = [];
    }
    if (!id) {
        id = "";
    }
    classList.push("grid");

    return (
        <div className={classList.join(" ")} id={id}>
            {props.children}
        </div>
    );
}
export default Grid;