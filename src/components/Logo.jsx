import { Link } from "react-router-dom";

function Logo() {
    return (
        <Link className="logo" to="/home">
            <img className="logo__img"
                src="https://see.fontimg.com/api/renderfont4/BW0ox/eyJyIjoiZnMiLCJoIjoxNjMsInciOjI1MDAsImZzIjo2NSwiZmdjIjoiIzAzRDBGRiIsImJnYyI6IiNGRkZGRkYiLCJ0IjoxfQ/TGFzYQ/aquire.png"
                alt="Tattoo fonts" />
            <p className="logo__text">Appointment</p>
        </Link>
    );
}

export default Logo;