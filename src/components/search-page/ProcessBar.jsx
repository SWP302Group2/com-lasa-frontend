import { useEffect } from "react";

function ProcessBar({ percent }) {

    useEffect(() => {
        const processBar = document.querySelector(".processbar");
        if (processBar) {
            processBar.style.width = `${percent}%`;
        }
    }, [percent])

    return (
        <div className="process-bar"></div>
    );
}

export default ProcessBar;