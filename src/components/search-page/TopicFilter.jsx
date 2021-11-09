import { useDispatch, useSelector } from "react-redux";
import { updateTopicsToSearchCriteria } from "../../redux/actions/search";
import SelectedTopics from "../SelectedTopics";
import TopicPicker from "../TopicPicker";
import Box from "./Box";

function TopicFilter({ topics, invokeSearch }) {
    const searchCriteria = useSelector(state => state.search);
    const dispatch = useDispatch();

    function handleRemoveTopicOnClick(event, topic) {
        event.stopPropagation();
        removeFromTopics(topic.id);
        invokeSearch();
    }

    function handleDefaultSelectOnClick() {
        dispatch(updateTopicsToSearchCriteria([]));
        invokeSearch();
    }

    function removeFromTopics(id) {
        const newTopics = [...searchCriteria.topics].filter(topic => topic.id !== id);
        dispatch(updateTopicsToSearchCriteria(newTopics));
    }

    return (
        <div className="topic-filter">
            <h3 className="topic-filter__header">TOPIC</h3>
            <Box>
                <TopicPicker
                    topics={topics}
                    invokeSearch={invokeSearch}
                />
                <SelectedTopics
                    removeItemCallback={handleRemoveTopicOnClick}
                >
                    <div
                        className={`box__topic ${searchCriteria.topics?.length === 0 && "box__topic--default"}`}
                        onClick={handleDefaultSelectOnClick}
                    >
                        All topics
                    </div>
                </SelectedTopics>
            </Box>
        </div>
    );
}

export default TopicFilter;