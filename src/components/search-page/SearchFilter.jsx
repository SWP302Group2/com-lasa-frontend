import { useEffect } from "react";
import "../../assets/css/nprogress.css";

function SearchFilter({ lecturers, topics, invokeSearch, isLoading, ...props }) {

    useEffect(handleFilterShowAndHide, [])

    function handleFilterShowAndHide() {
        const filter = document.querySelector(".search-filter");
        const overlay = document.querySelector(".filter-overlay");
        const searchNav = document.querySelector(".search-content__searchNav")
        document.addEventListener("keydown", handleCloseFilterOnKeyDown);
        document.addEventListener("click", handleCloseFilterOnClick);
        hideFilter();

        function handleCloseFilterOnKeyDown(event) {
            if (window.innerWidth > 1024) return;
            if (event.key !== "Escape") return;
            hideFilter();
        }

        function handleCloseFilterOnClick(event) {
            if (window.innerWidth > 1024) return;
            if (searchNav?.contains(event.target)) return;
            if (filter?.contains(event.target)) return;
            hideFilter();
        }

        function hideFilter() {
            overlay?.classList.add("hide-overlay");
            filter.classList.add("hide-filter")
        }

        return () => {
            filter.classList.remove("hide-filter-content")
            document.removeEventListener("keydown", handleCloseFilterOnKeyDown);
            document.removeEventListener("click", handleCloseFilterOnClick);
        }
    }

    function closeFilter(event) {
        const filterContent = document.querySelector(".search-filter");
        filterContent?.classList.add("hide-filter");

        const overlay = document.querySelector(".filter-overlay");
        overlay?.classList.add("hide-overlay");

        const bodyHeader = document.querySelector(".search-content__searchNav");
        bodyHeader?.classList.remove("active-header");
    }

    function handleCloseIconOnClick() {
        closeFilter();
    }

    return (
        <div className="search-filter">
            <div className="search-filter__close">
                <i
                    className="material-icons"
                    onClick={handleCloseIconOnClick}
                >
                    close
                </i>
            </div>
            {props.children}
        </div>
    );
}

export default SearchFilter;