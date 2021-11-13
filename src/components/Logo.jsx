import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addLocation } from "../redux/actions/history";

function Logo() {
    const dispatch = useDispatch();

    function handleLinkOnCLick() {
        dispatch(addLocation("/home"));
    }

    return (
        <Link className="logo" to="/home" onClick={handleLinkOnCLick}>
            <img className="logo__img"
                src="https://see.fontimg.com/api/renderfont4/BW0ox/eyJyIjoiZnMiLCJoIjoxNjMsInciOjI1MDAsImZzIjo2NSwiZmdjIjoiIzAzRDBGRiIsImJnYyI6IiNGRkZGRkYiLCJ0IjoxfQ/TGFzYQ/aquire.png"
                alt="Tattoo fonts" />
            <p className="logo__text">Appointment</p>
        </Link>
    );
}

export default Logo;