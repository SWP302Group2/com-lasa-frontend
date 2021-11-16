import Page from "./Page";

function PageBar({ currentPage, totalPages, callBack }) {

    return (
        <div className="bottom-page-bar">
            {currentPage !== 0 &&
                <div
                    className="page"
                    onClick={() => callBack(0)}
                >
                    <i className="material-icons">first_page</i>
                </div>
            }
            {Array.apply(null, { length: totalPages < 4 ? totalPages : 4 }).map((item, index) =>
                (index + currentPage - 1) >= 0 &&
                (index + currentPage - 1) < totalPages &&
                <Page
                    index={(index + currentPage - 1)}
                    key={`page_${index}`}
                    callBack={callBack}
                    currentPage={currentPage}
                />
            )}
            {currentPage !== totalPages - 1 &&
                <div
                    className="page"
                    onClick={() => callBack(totalPages - 1)}
                >
                    <i className="material-icons">last_page</i>
                </div>
            }
        </div>
    );
}

export default PageBar;