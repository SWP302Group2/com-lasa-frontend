import { Link } from "react-router-dom";
import "../css/logo.css";

function Logo() {
  return (
    <Link className="logo" to="/home">
      <svg xmlns="http://www.w3.org/2000/svg" height="3rem" width="160px">
        <g>
          <title>Home</title>
          <text fontStyle="normal" fontWeight="bold" textAnchor="middle"
            dominantBaseline="middle" y="55%" x="50%" fontFamily="Ephesis, sans-serif"
            fontSize="2rem" strokeWidth="0" stroke="#fc8b36" fill="#f2bc94">
            LASA
          </text>
        </g>
      </svg>
    </Link>
  );
}

export default Logo;
