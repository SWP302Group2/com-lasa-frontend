function SearchStatusLine({ ...props }) {
    return (
        <div className="search-content__status-line">
            {props.children}
        </div>
    );
}

export default SearchStatusLine;