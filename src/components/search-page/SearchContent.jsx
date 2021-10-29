import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import lecturerApi from "../../api/lecturerApi";
import slotApi from "../../api/slotApi";
import "../../assets/css/searchContent.css";
import { newSearchCriteria, updateUUIDToSearchCriteria } from "../../redux/actions/search";
import { SEARCH_PAGE_TITLE } from "../../utils/constant";
import LecturerFilter from "./LecturerFilter";
import SearchFilter from "./SearchFilter";
import SearchResult from "./SearchResult";
import TimeFilter from "./TimeFilter";
import TopicFilter from "./TopicFilter";
import dateTools from "../../utils/dateTools";
import PageBar from "../dashboard/PageBar";
import { v4 as uuidv4 } from 'uuid';
import SearchContentHeader from "./SearchContentHeader";
import SearchBar from "./SearchBar";
import topicApi from "../../api/topicApi";

function SearchContent() {
    const [totalPages, setTotalPages] = useState(1);
    const [page, setPage] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [lecturers, setLecturers] = useState([]);
    const [topics, setTopics] = useState([]);
    const [matchedSlots, setMatchedSlots] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    const searchCriteria = useSelector(state => state.search);
    const dispatch = useDispatch();

    function handleOnClickChangePage(pageIndex) {
        invokeSearch(pageIndex);
    }

    function invokeSearch(newPageIndex) {
        setPage(newPageIndex || 0);
        setIsSearching(true);
        setMatchedSlots([]);
        dispatch(updateUUIDToSearchCriteria(uuidv4()));
    }

    useEffect(() => {
        if (!isSearching) return;
        setIsSearching(false);

        function searchSlots() {
            console.log("Search criteria");
            console.log(searchCriteria);

            const noLecturerMatchedSearchValue = () =>
                searchCriteria.searchValue &&
                (!Array.isArray(searchCriteria.lecturers) ||
                    searchCriteria.lecturers.length === 0)

            if (noLecturerMatchedSearchValue()) {
                setMatchedSlots(null);
                return;
            }
            callSearchSlotApi();
        }

        function callSearchSlotApi() {
            setIsLoading(true);
            const onSuccess = (data, headers, response) => {
                console.log("Search slot success:");
                console.log(response);
                setIsLoading(false);

                if (headers.uuid !== searchCriteria.uuid) return;

                let slots = data.content;
                if (!Array.isArray(slots) || slots.length === 0) {
                    setMatchedSlots(null);
                    return;
                }

                const prepareSlotsDatetime = (slots) => [...slots].map(slot => {
                    slot.timeStart = dateTools.convertLocalDateTimeStringToObject(slot.timeStart);
                    slot.timeEnd = dateTools.convertLocalDateTimeStringToObject(slot.timeEnd);
                    return slot;
                });

                const result = prepareSlotsDatetime(slots);
                setMatchedSlots(result);
                setTotalPages(data.totalPages);
            }

            const onFailure = responses => {
                console.log(responses);
                setMatchedSlots(null);
                setIsLoading(false);
            }

            slotApi.searchAllSlotsWithPaging(
                page, searchCriteria, onSuccess, onFailure, 12
            );
        }

        searchSlots();
    }, [page, searchCriteria, isSearching])

    useEffect(() => {
        let flag = 0;

        function callGetLecturersApi() {
            const onGetSuccess = data => {
                console.log("Get lecturer success:");
                console.log(data);
                setLecturers(data);

                if (flag === 1) {
                    setIsSearching(true);
                }
                flag++;
            }

            const onGetFailure = (response, state, message) => {
                console.log(response);
            }

            lecturerApi.getLecturersWithoutPaging(
                onGetSuccess,
                onGetFailure
            );
        }

        function callGetTopics() {
            const onGetSuccess = data => {
                console.log("Get topics success:");
                console.log(data);
                setTopics(data);

                if (flag === 1) {
                    setIsSearching(true);
                }
                flag++;
            }

            const onGetFailure = (response, state, message) => {
                console.log(response);
                setTopics(null);
            }

            topicApi.getTopicsNoPaging(onGetSuccess, onGetFailure);
        }

        callGetLecturersApi();
        callGetTopics();
        document.querySelector(".search-content .search-bar input")?.focus();
    }, [])

    useEffect(() => {
        const searchNavLink = document.querySelector(".header .menu .navLink-search");
        const start = () => {
            document.title = SEARCH_PAGE_TITLE;
            searchNavLink.classList.add("active-navItem");
            dispatch(newSearchCriteria());
        }
        start();

        return () => {
            searchNavLink.classList.remove("active-navItem");
        };
    }, [dispatch]);

    return (
        <div className="search-content root-content">
            <SearchContentHeader>
                <SearchBar
                    lecturers={lecturers}
                    topics={topics}
                    invokeSearch={invokeSearch}
                />
            </SearchContentHeader>
            <div className="search-content__body">
                <SearchFilter
                    lecturers={lecturers}
                    topics={topics}
                    invokeSearch={invokeSearch}
                    isLoading={isLoading}
                >
                    <LecturerFilter
                        lecturers={lecturers}
                        invokeSearch={invokeSearch}
                    />
                    <TopicFilter
                        topics={topics}
                        invokeSearch={invokeSearch}
                    />
                    <TimeFilter
                        invokeSearch={invokeSearch}
                    />
                </SearchFilter>


                <SearchResult
                    matchedSlots={matchedSlots}
                    invokeSearch={invokeSearch}
                >
                    {matchedSlots && matchedSlots.length > 0 && totalPages && totalPages > 0 &&
                        <PageBar
                            currentPage={page}
                            totalPages={totalPages}
                            callBack={handleOnClickChangePage}
                        />
                    }
                </SearchResult>
            </div>

        </div>
    );
}

export default SearchContent;