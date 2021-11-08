
function SearchContentHeader({ ...props }) {
    return (
        <div className="search-content__header">
            <div className="search-content__header"></div>
            <div className="content">
                <h1>LASA</h1>
                <p>Help you make appointments with your lecturers</p>
            </div>
            {props.children}
        </div>
    );
}

export default SearchContentHeader;