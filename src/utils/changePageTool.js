import { SEARCH_PAGE_TITLE } from "./constant";



const changePageTools = {
    displayTitleAndActiveLinkForSearchPage: () => {
        //Change title
        document.title = SEARCH_PAGE_TITLE;

        //Active link
        const searchNavLink = document.querySelector(".header .menu .navLink-search");
        searchNavLink.classList.add("active-navItem");
        return () => {
            searchNavLink.classList.remove("active-navItem");
        };
    }
}

export default changePageTools;