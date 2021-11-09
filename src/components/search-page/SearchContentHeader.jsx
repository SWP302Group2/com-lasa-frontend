
function SearchContentHeader({ ...props }) {
    return (
        <div className="search-content__header">
            <div className="search-content__header__container">
                <div className="content">
                    <p>&#10095; Do search</p>
                    <p>&#10095; Make appointment</p>
                    <p>&#10095; Go meeting</p>
                    {props.children}
                </div>
            </div>
        </div>
    );
}

export default SearchContentHeader;