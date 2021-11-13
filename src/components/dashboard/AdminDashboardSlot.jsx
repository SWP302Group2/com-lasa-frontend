import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import slotApi from "../../api/slotApi";
import { addLocation } from "../../redux/actions/history";
import dateTools from "../../utils/dateTools";
import PageBar from "./PageBar";
import TableLoadingEffect from "./TableLoadingEffect";

function AdminDashboardSlot() {
    const [totalPages, setTotalPages] = useState(1);
    const [page, setPage] = useState(0);
    const [slots, setSlots] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(function saveLocation() {
        dispatch(addLocation(history?.location?.pathname));
    }, [dispatch, history]);

    function handleOnClickChangePage(pageIndex) {
        setPage(pageIndex);
    }

    useEffect(() => {
        //init
        const slotDashboard = document.querySelector(".admin-dashboard .sidebar__link-slot");
        // const sidebar = 
        const start = () => {
            slotDashboard.classList.add("active-dashboard-content");
            callGetSlots();
        }
        start();

        const end = () => {
            slotDashboard.classList.remove("active-dashboard-content");
        }

        function callGetSlots() {
            const onGetSuccess = (data) => {
                console.log("Dashboard get slots success:");
                console.log(data);
                const prepareSlotsDatetime = (slots) => {
                    return [...slots].map(slot => {
                        slot.timeStart = dateTools.convertLocalDateTimeStringToObject(slot.timeStart);
                        slot.timeEnd = dateTools.convertLocalDateTimeStringToObject(slot.timeEnd);
                        return slot;
                    });
                }

                setIsLoading(false);
                if (data.number !== page) return;

                const newSlots = prepareSlotsDatetime(data.content);
                setSlots(newSlots);
                setTotalPages(data.totalPages);
            }

            const onGetFailure = (response, status, message) => {
                console.log("Dashboard get slots failed:");
                console.log(response);
                setSlots(null);
                setIsLoading(false);
            }

            setIsLoading(true);
            slotApi.getAllSlotsWithPaging(page, onGetSuccess, onGetFailure);
        }

        return end;
    }, [page]);

    return (
        <div className="admin-dashboard__content admin-dashboard__slot">
            <h3 className="admin-dashboard__content__headline">
                Slot Management
            </h3>
            <div className="list">
                <div className="list__headline">
                    <div className="list__headline__th">Id</div>
                    <div className="list__headline__th">Owner Id</div>
                    <div className="list__headline__th">Owner Name</div>
                    <div className="list__headline__th">Time Start</div>
                    <div className="list__headline__th">Time End</div>
                    <div className="list__headline__th">Status</div>
                </div>
                {slots && slots.length > 0 && slots.map(slot =>
                    <div
                        className="list__row"
                        key={`slot_${slot.id}`}
                    >
                        <div className="list__row__td slot-id">{slot.id}</div>
                        <div className="list__row__td lecturer-id">{slot.lecturer.id}</div>
                        <div className="list__row__td lecturer-name">{slot.lecturer.name}</div>
                        <div className="list__row__td time-start">
                            <div>{`${slot.timeStart.date?.name}, ${slot.timeStart.date?.value}/${slot.timeStart.month?.value + 1}`}</div>
                            <div>{`${slot.timeStart.hours?.value}:${slot.timeStart.minutes?.value} ${slot.timeEnd.when?.value}`}</div>
                        </div>
                        <div className="list__row__td time-end">
                            <div>{`${slot.timeEnd.date?.name}, ${slot.timeEnd.date?.value}/${slot.timeEnd.month?.value + 1}`}</div>
                            <div>{`${slot.timeEnd.hours?.value}:${slot.timeEnd.minutes?.value} ${slot.timeEnd.when?.value}`}</div>
                        </div>
                        <div className="list__row__td status">
                            Available
                        </div>

                    </div>
                )}
                {isLoading ? <TableLoadingEffect /> : null}
            </div>
            {totalPages && totalPages > 0 &&
                <PageBar
                    currentPage={page}
                    totalPages={totalPages}
                    callBack={handleOnClickChangePage}
                />
            }
        </div>
    );
}

export default AdminDashboardSlot;