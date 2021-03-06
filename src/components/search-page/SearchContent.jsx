import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import lecturerApi from "../../api/lecturerApi";
import slotApi from "../../api/slotApi";
import "../../assets/css/searchContent.css";
import {
    newSearchCriteria,
    updateUUIDToSearchCriteria
} from "../../redux/actions/search";
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
import SearchContentBody from "./SearchContentBody";
import SearchContentSearchNav from "./SearchContentSearchNav";
import SortFilter from "./SortFilter";
import OrderFilter from "./OrderFilter";
import { useHistory } from "react-router-dom";
import { addLocation } from "../../redux/actions/history";


const numberSlotEachPage = 12;
function SearchContent({ setIsCheckedAuth }) {
    const [isInitialSearchCriteria, setIsInitialSearchCriteria] = useState(false);
    const [totalPages, setTotalPages] = useState(1);
    const [page, setPage] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [lecturers, setLecturers] = useState([]);
    const [topics, setTopics] = useState([]);
    const [matchedSlots, setMatchedSlots] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    const searchCriteria = useSelector(state => state.search);
    const dispatch = useDispatch();

    const history = useHistory();

    useEffect(function saveLocation() {
        dispatch(addLocation(history?.location?.pathname));
    }, [dispatch, history]);

    useEffect(checkAuthentication, [setIsCheckedAuth]);
    useEffect(displayTitleAndActiveLinkForSearchPage, []);
    useEffect(initialNewSearchCriteria, [dispatch, isInitialSearchCriteria]);
    useEffect(getNecessaryResource, [lecturers, topics]); //Lecturers, topics for search
    useEffect(processSearching, [page, searchCriteria, isSearching])

    function checkAuthentication() {
        setIsCheckedAuth(false);
    }

    function displayTitleAndActiveLinkForSearchPage() {
        document.title = SEARCH_PAGE_TITLE;
        const searchNavLink = document.querySelector(".header .navLink-search");
        searchNavLink.classList.add("active-navItem");
        return () => searchNavLink.classList.remove("active-navItem");
    }

    function initialNewSearchCriteria() {
        if (isInitialSearchCriteria) return;
        dispatch(newSearchCriteria());
        setIsInitialSearchCriteria(true);
    }

    function getNecessaryResource() {
        if (!lecturers || lecturers.length <= 0) {
            callGetLecturersApi();
        }
        if (!topics || topics.length <= 0) {
            callGetTopics();
        }

        function callGetLecturersApi() {
            const onGetSuccess = data => {
                console.log("Get lecturer success:");
                console.log(data);
                setLecturers(data);
            }
            const onGetFailure = (response, state, message) => {
                console.log("Get lecturer failed:");
                console.log(response);
            }
            lecturerApi.getLecturersWithoutPaging(onGetSuccess, onGetFailure);
        }

        function callGetTopics() {
            const onGetSuccess = data => {
                console.log("Get topics success:");
                console.log(data);
                setTopics(data);
            }
            const onGetFailure = (response, state, message) => {
                console.log(response);
                setTopics(null);
            }
            topicApi.getTopicsNoPaging(onGetSuccess, onGetFailure);
        }
    }

    function processSearching() {
        if (!isSearching) return;
        setIsSearching(false);
        setIsLoading(true);

        const isValid = validBeforeSearch();
        if (!isValid) {
            setTimeout(() => setIsLoading(false), 500);
            setMatchedSlots(null);
            return;
        }
        if (isValid) {
            callSearchSlotApi();
        }

        function validBeforeSearch() {
            console.log("Search criteria");
            console.log(searchCriteria);

            if (!searchCriteria.searchBarValue && !searchCriteria.searchLecturerValue) {
                return true;
            }

            if (searchCriteria.searchBarValue) {
                if (!Array.isArray(searchCriteria.lecturers)) {
                    if (!Array.isArray(searchCriteria.topics)) return false;
                    if (searchCriteria.topics.length === 0) return false;
                }
            }

            if (searchCriteria.searchLecturerValue) {
                if (!Array.isArray(searchCriteria.lecturers)) return false;
                if (searchCriteria.lecturers.length === 0) return false;
            }
            return true;
        }

        function callSearchSlotApi() {
            const onSuccess = (data, headers, response) => {
                console.log("Search slot success:");
                console.log(response);
                setIsLoading(false);

                if (headers.uuid !== searchCriteria.uuid) return;

                const slots = data.content;
                if (!Array.isArray(slots) || slots.length === 0) {
                    setMatchedSlots(null);
                    return;
                }

                const result = [...slots].map(slot => {
                    slot.timeStart = dateTools.convertLocalDateTimeStringToObject(slot.timeStart);
                    slot.timeEnd = dateTools.convertLocalDateTimeStringToObject(slot.timeEnd);
                    return slot;
                });

                setMatchedSlots(result);
                setTotalPages(data.totalPages);
            }

            const onFailure = responses => {
                console.log(responses);
                setMatchedSlots(null);
                setIsLoading(false);
            }

            setIsLoading(true);
            slotApi.searchAllSlotsWithPaging(onSuccess, onFailure,
                page, searchCriteria, numberSlotEachPage
            );
        }
    }

    function invokeSearch(newPageIndex) {
        scrollToSearchContent();
        setPage(newPageIndex != null ? newPageIndex : 0);
        setIsSearching(true);
        dispatch(updateUUIDToSearchCriteria(uuidv4()));
    }

    function handleOnClickChangePage(pageIndex) {
        invokeSearch(pageIndex);
    }

    function scrollToSearchContent() {
        const searchPageBody = document.querySelector(".search-content__body");
        searchPageBody.scrollIntoView({ top: 0, behavior: "smooth" });
    }

    function isRequiredToDisplayChangePageBar() {
        return matchedSlots && matchedSlots.length > 0 && totalPages && totalPages > 1
    }


    return (
        <div className="search-content root-content">
            <SearchContentHeader>
                <SearchBar
                    lecturers={lecturers}
                    topics={topics}
                    invokeSearch={invokeSearch}
                />
            </SearchContentHeader>
            <SearchContentBody>
                <SearchContentSearchNav
                    lecturers={lecturers}
                    topics={topics}
                    invokeSearch={invokeSearch}
                    isLoading={isLoading}
                />
                <div className="filter-overlay"></div>
                <SearchFilter>
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
                    <SortFilter
                        invokeSearch={invokeSearch}
                    />
                    <OrderFilter
                        invokeSearch={invokeSearch}
                    />
                </SearchFilter>
                <SearchResult
                    matchedSlots={matchedSlots}
                    invokeSearch={invokeSearch}
                >
                    {isRequiredToDisplayChangePageBar() &&
                        <PageBar
                            currentPage={Number.isInteger(page) ? page : 0}
                            totalPages={totalPages}
                            callBack={handleOnClickChangePage}
                        />
                    }
                </SearchResult>
            </SearchContentBody>

        </div>
    );
}

export default SearchContent;