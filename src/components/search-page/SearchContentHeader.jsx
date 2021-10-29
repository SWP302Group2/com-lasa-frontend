
function SearchContentHeader({ ...props }) {
    return (
        <div className="search-content__header">
            <div className="background"></div>
            <div className="content">
                <h1>LASA</h1>
                <p>Make appointments with your lecturers</p>
            </div>
            {props.children}
        </div>
    );
}

export default SearchContentHeader;