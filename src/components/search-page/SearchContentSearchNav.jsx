import { useEffect } from "react";
import Logo from "../Logo";
import SearchBar from "./SearchBar";

function SearchContentSearchNav({ lecturers, topics, invokeSearch, isLoading }) {

    useEffect(activeLoader, [isLoading]);

    function activeLoader() {
        const loader = document.querySelector(".search-content__searchNav__loader");
        if (isLoading) {
            loader?.classList.add("active-loader");
        }
        if (!isLoading) {
            loader?.classList.remove("active-loader");
        }
    }

    function handleFilterOnClick(event) {
        const filterContent = document.querySelector(".search-filter");
        filterContent?.classList.toggle("hide-filter");

        const overlay = document.querySelector(".filter-overlay");
        overlay?.classList.toggle("hide-overlay");

        const bodyHeader = document.querySelector(".search-content__searchNav");
        bodyHeader?.classList.toggle("active-header");
        setTimeout(() => {
            scrollToSearchContent();
        }, 300)
    }

    function scrollToSearchContent() {
        const searchPageBody = document.querySelector(".search-content__body");
        searchPageBody?.scrollIntoView({ top: 0, behavior: "smooth" });
    }

    function handleLogoOnClick() {
        if (isLoading) return;
        document.querySelector(".header").scrollIntoView({ top: 0, behavior: "smooth" })
    }

    return (
        <div className="search-content__searchNav">
            <div className="search-content__searchNav__containter">
                <div className="search-content__searchNav__loader">
                    <div
                        onClick={handleLogoOnClick}
                        className="search-content__searchNav__loader__circle"
                    >
                        <div><Logo /></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
                <SearchBar
                    lecturers={lecturers}
                    topics={topics}
                    invokeSearch={invokeSearch}
                />
                <div className="search-content__searchNav__toggle"
                    onClick={handleFilterOnClick}
                >
                    <i className="material-icons">filter_list</i>
                    <h2>Filters</h2>
                </div>
            </div>
        </div>
    );
}

export default SearchContentSearchNav;