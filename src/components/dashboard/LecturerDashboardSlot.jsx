import { useEffect } from 'react';
// import CreateSlotBox from './CreateSlotBox';

function LecturerDashboardSlot() {

    useEffect(() => {
        const slotDashboard = document.querySelector(".lecturer-dashboard .sidebar__link-slot");
        slotDashboard?.classList.add("active-dashboard-content");

        return () => slotDashboard?.classList.remove("active-dashboard-content");
    }, [])
    
    return (
        <div className="lecturer-dashboard__content lecturer-dashboard__slot">
            <h2 className="lecturer-dashboard__content__headline">
                Schedule
            </h2>
           
        </div>
    );
}

export default LecturerDashboardSlot;