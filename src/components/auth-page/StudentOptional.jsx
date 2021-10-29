import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import majorApi from "../../api/majorApi";
import { createNetworkError } from "../../redux/actions/error";
import { updateMajorIdToSignupInfo, updateMSSVToSignupInfo } from "../../redux/actions/signup";

function StudentOptional({ userInfo }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [majors, setMajors] = useState([]);


    function handleMSSVChange(event) {
        const target = event?.target;
        if (target) {
            dispatch(updateMSSVToSignupInfo(target.value));
        }
    }

    function handleSelectMajorChange(event) {
        const target = event.target;
        const selectMajorId = target.options[target.selectedIndex].getAttribute("data");
        if (!selectMajorId) return;
        console.log(selectMajorId);
        dispatch(updateMajorIdToSignupInfo(selectMajorId));
    }

    useEffect(() => {
        majorApi.getMajorsWithoutPaging(onGetSuccess, onGetFailure);

        function onGetSuccess(data) {
            const majorData = data?.map(item => {
                delete item["@id"];
                return item;
            })
            console.log(data);
            setMajors(majorData);
        }

        function onGetFailure(response, status, message) {
            console.log(response);
            if (message === "Network Error") {
                history.push(createNetworkError());
                return;
            }
        }
    }, [setMajors, history])

    return (
        <React.Fragment>
            <input
                type="text"
                className="sign-up__optional__input"
                placeholder="Student code (MSSV)"
                value={userInfo.mssv || ""}
                onChange={handleMSSVChange}
            />
            <select
                className="sign-up__optional__select-major"
                onChange={handleSelectMajorChange}
                value={userInfo.majorId || ""}
            >
                <option disabled value=""> -- Select your major -- </option>
                {majors && [...majors].map(major =>
                    <option
                        key={`major_${major.id}`}
                        value={major.id}
                        data={major.id}
                    >
                        {`${major.id} - ${major.name}`}
                    </option>
                )}
            </select>
        </React.Fragment>
    );
}

export default StudentOptional;