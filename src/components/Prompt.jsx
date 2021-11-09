function Prompt({ ...props }) {
    return (
        <div
            className="prompt"
            tabIndex="1"
        >
            {props.children}
        </div>
    );
}

export default Prompt;