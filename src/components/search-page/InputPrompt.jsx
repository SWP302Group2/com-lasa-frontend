import { useEffect } from "react";

function InputPrompt({ ...props }) {

    useEffect(() => {

    }, [props])

    return (
        <div className="prompt">
            {props.children}
        </div>
    );
}

export default InputPrompt;