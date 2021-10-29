function Page({ currentPage, index, callBack }) {
    function handlePageOnClick() {
        callBack(index);
    }
    return (
        <div
            className={`page ${index === currentPage && "active-page"}`}
            onClick={handlePageOnClick}
        >
            {index + 1}
        </div>
    );
}

export default Page;