import { Link } from "react-router-dom";
import { SiFacebook } from 'react-icons/si';
import { FaLinkedinIn } from 'react-icons/fa';
import { FaYoutube } from 'react-icons/fa';
import { BsGoogle } from 'react-icons/bs';
import { BsTwitter } from 'react-icons/bs';
import { FaGithub } from 'react-icons/fa';

import "../assets/css/footer.css";
function Footer() {
    return (
        <footer className="footer">
            <div className="footer__container">
                <div className="footer__contact">
                    <ul>
                        <li>
                            <Link to="#">
                                <SiFacebook />
                            </Link>
                        </li>
                        <li>
                            <Link to="#">
                                <FaYoutube />
                            </Link>
                        </li>
                        <li>
                            <Link to="#">
                                <BsGoogle />
                            </Link>
                        </li>
                        <li>
                            <Link to="#">
                                <FaLinkedinIn />
                            </Link>
                        </li>
                        <li>
                            <Link to="#">
                                <BsTwitter />
                            </Link>
                        </li>
                        <li>
                            <Link to="#">
                                <FaGithub />
                            </Link>
                        </li>
                    </ul>
                    <p>Powered by TTNA</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;