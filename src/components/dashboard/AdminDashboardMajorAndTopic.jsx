// import { useEffect, useState } from "react";
// import majorApi from "../../api/majorApi";
// import PageBar from "./PageBar";
// import TableLoadingEffect from "./TableLoadingEffect";

function AdminDashboardMajorAndTopic() {
    //     const [totalPages, setTotalPages] = useState(1);
    //     const [page, setPage] = useState(0);
    //     const [majorsWithTopics, setMajorsWithTopics] = useState([]);
    //     const [isLoading, setIsLoading] = useState(false);

    //     function handleOnClickChangePage(pageIndex) {
    //         setPage(pageIndex);
    //     }

    //     useEffect(() => {
    //         const bookingDashboard = document.querySelector(".admin-dashboard .sidebar__link-major-topic");
    //         const start = () => {
    //             bookingDashboard?.classList.add("active-dashboard-content");
    //             callGetMajorsWithTopics();
    //         }
    //         start();

    //         const end = () => {
    //             bookingDashboard?.classList.remove("active-dashboard-content");
    //         }

    //         function callGetMajorsWithTopics() {
    //             const onGetSuccess = (data) => {
    //                 console.log("Dashboard get major-topic success:");
    //                 console.log(data);

    //                 setIsLoading(false);
    //                 if (data.number !== page) return;

    //                 setMajorsWithTopics(data.content);
    //                 setTotalPages(data.totalPages);
    //             }

    //             const onGetFailure = (response, status, message) => {
    //                 console.log("Dashboard get major-topic failed:");
    //                 console.log(response);

    //                 setMajorsWithTopics(data.content);
    //                 setIsLoading(false);
    //             }

    //             setIsLoading(true);
    //             majorApi.getMajorsWithTopicsWithPaging(page, onGetSuccess, onGetFailure);
    //         }

    //         return end;
    //     }, [page])
    //     return (
    //         <div className="admin-dashboard__content admin-dashboard__major-topic">
    //             <h3 className="admin-dashboard__content__headline">
    //                 Majors And Topics
    //             </h3>

    //             <div className="list">
    //                 <div className="list__headline">
    //                     <div className="list__headline__th">Id</div>
    //                     <div className="list__headline__th">Slot Id</div>
    //                     <div className="list__headline__th">Owner Id</div>
    //                     <div className="list__headline__th">Owner Name</div>
    //                     <div className="list__headline__th">Title</div>
    //                     <div className="list__headline__th">Topic</div>
    //                     <div className="list__headline__th">Questions</div>
    //                     <div className="list__headline__th">Status</div>
    //                 </div>
    //                 {majorsWithTopics && majorsWithTopics.length > 0 && majorsWithTopics.map(majorWithTopics =>
    //                     <div
    //                         className="list__row"
    //                         key={`slot_${major.id}`}
    //                     >
    //                         <div className="list__row__td id">{major.id}</div>
    //                         <div className="list__row__td slot-id">{major.slotId}</div>
    //                         <div className="list__row__td student-id">{major.student?.id}</div>
    //                         <div className="list__row__td student-name">{major.student?.name}</div>
    //                         <div className="list__row__td title">{major.title}</div>
    //                         <div className="list__row__td topic">{major.topic?.courseId}</div>
    //                         <div className="list__row__td question">View question</div>
    //                         <div className="list__row__td status">
    //                             {major.status === 1 && "Waiting"}
    //                             {major.status === 2 && "Accepted"}
    //                             {major.status === 0 && "Cancled"}
    //                             {major.status === -1 && "Denied"}
    //                         </div>

    //                     </div>
    //                 )}
    //                 {isLoading ? <TableLoadingEffect /> : null}
    //             </div>
    //             {totalPages && totalPages > 0 &&
    //                 <PageBar
    //                     currentPage={page}
    //                     totalPages={totalPages}
    //                     callBack={handleOnClickChangePage}
    //                 />
    //             }
    //         </div>
    //     );
}

export default AdminDashboardMajorAndTopic;