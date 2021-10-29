import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTopicsToSearchCriteria } from "../../redux/actions/search";
import SelectedTopics from "../SelectedTopics";
import TopicPicker from "../TopicPicker";
import Box from "./Box";
function TopicFilter({ topics, invokeSearch }) {
    const searchCriteria = useSelector(state => state.search);
    const [isSearching, setIsSearching] = useState(false);
    const dispatch = useDispatch();

    function handleRemoveTopicOnClick(event, topic) {
        console.log(topic.id);
        removeFromTopics(topic.id);
    }

    function handleDefaultSelectOnClick() {
        dispatch(updateTopicsToSearchCriteria([]));
        setIsSearching(true);
    }

    function onChange(newTopics) {
        dispatch(updateTopicsToSearchCriteria(newTopics));
    }

    function removeFromTopics(id) {
        const newTopics = [...searchCriteria.topics].filter(topic => topic.id !== id) || [];
        dispatch(updateTopicsToSearchCriteria(newTopics));
        setIsSearching(true);
    }

    useEffect(() => {
        if (isSearching) {
            invokeSearch();
            setIsSearching(false);
        }
    }, [isSearching, invokeSearch])

    return (
        <div className="topic-filter">
            <h3 className="topic-filter__header">TOPIC</h3>
            <Box>
                <TopicPicker
                    topics={topics}
                    value={searchCriteria.topics}
                    onChange={onChange}
                />
                <SelectedTopics
                    topics={searchCriteria.topics}
                    removeItemCallback={handleRemoveTopicOnClick}
                >
                    <div
                        className={"box__topic " +
                            searchCriteria.topics && searchCriteria.topics.length === 0 ?
                            "box__topic--default" : "box__topic--default--inactive"
                        }
                        onClick={handleDefaultSelectOnClick}
                    >
                        All topics
                    </div>
                </SelectedTopics>
            </Box>
        </div >
    );
}

export default TopicFilter;