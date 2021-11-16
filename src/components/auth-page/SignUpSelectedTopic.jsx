function SignUpSelectedTopic({ topics, removeItemCallback }) {

    return (
        <>
            <div className="sign-up__topic__title">Your topics:</div>
            {Array.isArray(topics) && topics.length > 0 &&
                <div className="sign-up__topic__display">
                    {Array.isArray(topics) && [...topics].map(topic =>
                        <p
                            key={topic?.id}
                            className="sign-up__topic__selected-item"
                        >
                            {`${(topic?.courseId || topic?.name)} ${topic?.majorId}`}
                            <i
                                className="material-icons"
                                onClick={(event) => removeItemCallback(event, topic)}
                            >
                                close
                            </i>
                        </p>
                    )}
                </div>
            }
        </>
    );
}

export default SignUpSelectedTopic;