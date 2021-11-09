

function Page({ currentPage, index, callBack }) {
    function handlePageOnClick() {
        callBack(index);
    }

    return (
        <div
            data={index}
            className={`page ${index === currentPage && "active-page"}`}
            onClick={handlePageOnClick}
        >
            {index + 1}
        </div>
    );
}

export default Page;