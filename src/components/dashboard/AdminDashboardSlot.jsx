import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import slotApi from "../../api/slotApi";
import { addLocation } from "../../redux/actions/history";
import dateTools from "../../utils/dateTools";
import Loader from "../Loader";
import PageBar from "./PageBar";
import SlotStatusBar from "./SlotStatusBar";

function AdminDashboardSlot() {
    const [totalPages, setTotalPages] = useState(1);
    const [page, setPage] = useState(0);
    const [slots, setSlots] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isGettingSlots, setIsGettingSlots] = useState(true);

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(function saveLocation() {
        dispatch(addLocation(history?.location?.pathname));
    }, [dispatch, history]);

    function handleOnClickChangePage(pageIndex) {
        setPage(pageIndex);
        setIsGettingSlots(true);
    }

    useEffect(function activeContent() {
        const slotDashboard = document.querySelector(".admin-dashboard .sidebar__link-slot");
        slotDashboard.classList.add("active-dashboard-content");
        return () => {
            slotDashboard.classList.remove("active-dashboard-content");
        }
    }, [])

    useEffect(function callApiGetSlot() {
        if (!isGettingSlots) return;
        setIsLoading(true);
        setIsGettingSlots(false);
        callGetSlots();

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
                setIsLoading(false);
                setSlots(null);
            }

            slotApi.getAllSlotsWithPaging(onGetSuccess, onGetFailure, page);
        }

    }, [page, isGettingSlots]);

    return (
        <div className="admin-dashboard__content admin-dashboard__slot">
            <h3 className="admin-dashboard__content__headline">
                Slot Management
            </h3>
            <div className="list">
                <div className="list__headline">
                    <div className="list__headline__th">Id</div>
                    <div className="list__headline__th">Lecturer</div>
                    <div className="list__headline__th">Lecturer name</div>
                    <div className="list__headline__th">Date start</div>
                    <div className="list__headline__th">Time</div>
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
                        <div className="list__row__td date-start">
                            {slot.timeStart?.getDateString()}
                        </div>
                        <div className="list__row__td time">
                            {slot.timeStart?.getTimeString()} &#10140; {slot.timeEnd?.getTimeString()}
                        </div>
                        <div className="list__row__td status">
                            <SlotStatusBar status={slot.status} />
                        </div>
                    </div>
                )}
                {isLoading ? <Loader /> : null}
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