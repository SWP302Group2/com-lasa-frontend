import { useEffect, useState } from "react";
import { RANDOM_IMG_API } from "../../utils/constant";
import SearchResultLoadingEffect from "./SearchResultLoadingEffect";

function SearchResult({
    matchedSlots,
    isFilterWithTopic,
    isLoading,
    setIsLoading,
    lecturers,
    isSearchNotMatched
}) {
    const [resultItems, setResultItems] = useState([]);

    useEffect(() => {
        if (
            Array.isArray(matchedSlots) &&
            matchedSlots.length !== 0 &&
            isFilterWithTopic &&
            lecturers.length !== 0
        ) {
            createResultItems();
        }

        function createResultItems() {
            const resultItems = matchedSlots.map(slot => {
                slot.lecturer = getLecturerById(slot.lecturerId);
                return slot;
            })
            console.log("Result Items")
            console.log(resultItems)
            setResultItems(resultItems);
            setIsLoading(false);
        }

        function getLecturerById(id) {
            const result = [...lecturers].find(lecturer => lecturer.id === id);
            if (!result) {
                console.log("Update slot info fail, Id: " + id);
            }
            return result;
        }

    }, [matchedSlots, isFilterWithTopic, lecturers, setIsLoading]);

    return (
        <div className="search-result">
            {isLoading ? <SearchResultLoadingEffect /> : null}
            {isSearchNotMatched ?
                <div className="search-result__notMatch">
                    Your search does not match anything.
                </div> : null
            }
            <div className="search-result__subject search-result__content ">
                {
                    !isSearchNotMatched &&
                    Array.isArray(resultItems) &&
                    resultItems.length !== 0 &&
                    isFilterWithTopic &&
                    [...resultItems].map(slot =>
                        <div
                            className="search-result__slot"
                            key={"slot_" + slot.id}
                        >
                            <div className="search-result__slot__avatar">
                                <img src={slot.lecturer.avatarUrl || RANDOM_IMG_API} alt="" />
                            </div>
                            <div className="search-result__slot__info">
                                <div className="search-result__slot__host">
                                    <div className="search-result__slot__name">
                                        {slot.lecturer.name || "Annonymus"}
                                    </div>
                                    <div className="search-result__slot__topic">
                                        Slot's topic:
                                        {slot.topics && [...slot.topics].map(topic =>
                                            <div key={`topic_${topic.id}`} className="search-result__slot__topic-item">{topic.courseId}</div>
                                        )}
                                    </div>
                                    <div className="search-result__slot__time">
                                        Starting from {slot.timeStart || ""} to {slot.timeStart || ""}
                                    </div>

                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
            <div className="search-result__subject up-coming"></div>
            <div className="search-result__subject top-rating-list"></div>
        </div>
    );
}

export default SearchResult;