function PromptItem({ topic, itemOnClickCallback }) {
    function handlePromptItemClick(event) {
        itemOnClickCallback(event, topic);
    }

    function handlePromptItemKeyDown(event) {
        console.log(event.key);
        if (event.key !== "Enter") return;
        itemOnClickCallback(event, topic);
    }

    return (
        <div
            className="prompt__topic"
            onClick={handlePromptItemClick}
            onKeyDown={handlePromptItemKeyDown}
            tabIndex="0"
        >
            <i className="material-icons">add_box</i>
            <p className="prompt__topic__courseid">{(topic?.courseId || topic?.name)}</p>
            <p className="prompt__topic__majorid">{topic?.majorId}</p>
        </div>
    );
}

export default PromptItem;