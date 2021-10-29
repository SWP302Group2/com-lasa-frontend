import { useEffect } from "react";
import Loader from "../Loader";
import SearchBar from "./SearchBar";

function SearchFilter({ lecturers, topics, invokeSearch, isLoading, ...props }) {

    function handleFilterOnClick(event) {
        const filterContent = document.querySelector(".search-filter__content");
        filterContent?.classList.toggle("hide-filter-content");

        const overlay = document.querySelector(".search-filter__overlay");
        overlay?.classList.toggle("active-overlay");

        const filterHeader = document.querySelector(".search-filter__header");
        filterHeader?.classList.toggle("active-header");
    }

    function handleCloseIconOnClick() {
        handleFilterOnClick();
    }


    useEffect(() => {
        const filter = document.querySelector(".search-filter");
        const filterContent = document.querySelector(".search-filter__content");
        document.addEventListener("keydown", handleCloseFilterOnKeyDown);
        document.addEventListener("click", handleCloseFilterOnClick);
        hideFilter();
        function handleCloseFilterOnKeyDown(event) {
            if (event.key !== "Escape") return;
            hideFilter();
        }

        function handleCloseFilterOnClick(event) {
            if (filter.contains(event.target)) return;
            hideFilter();
        }

        function hideFilter() {
            filterContent.classList.add("hide-filter-content")
        }

        return () => {
            filterContent.classList.remove("hide-filter-content")
            document.removeEventListener("keydown", handleCloseFilterOnKeyDown);
            document.removeEventListener("click", handleCloseFilterOnClick);
        }
    }, [])

    return (
        <div className="search-filter">
            <div className="search-filter__header">
                <div className="search-filter__header__toggle"
                    onClick={handleFilterOnClick}
                >
                    <i className="material-icons">filter_list</i>
                    <h2>Filters</h2>
                </div>
                <SearchBar
                    lecturers={lecturers}
                    topics={topics}
                    invokeSearch={invokeSearch}
                >
                    {isLoading && <Loader />}
                </SearchBar>
            </div>

            <div className="search-filter__content">
                <div className="search-filter__content__close">
                    <i
                        className="material-icons"
                        onClick={handleCloseIconOnClick}
                    >
                        close
                    </i>
                </div>
                {props.children}
            </div>
        </div>
    );
}

export default SearchFilter;