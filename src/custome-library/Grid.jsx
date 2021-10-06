
function Grid({ classList = [], id = "", ...props }) {
    classList.push("grid");

    return (
        <div className={classList.join(" ")} id={id}>
            {props.children}
        </div>
    );
}
export default Grid;