import { Link } from "react-router-dom";
import { useFilteredCourseCode } from "./Pyp/PypListContext";
import { auth } from "../firebase"; // Import auth from firebase.js
import { signOut } from "firebase/auth";

export default function NavBar() {
    const {courseCode, 
        handleSetCourseCode, 
        handleResetCourseCode} = useFilteredCourseCode();

    // Logs out the user    
    const handleLogOutClick = async () => {
        await signOut(auth);
    };

    return (
        <nav className="navbar">
            <ul>
                {/* Logo that links to the home page */}
                <li className="logo"><Link to="/">
                    <img alt="logo" 
                     src={require("../images/logo.png")} 
                     className="page-logo"/>
                </Link>
                    <h1 className="nav-header">
                        AkillaC
                    </h1>
                </li>
                {/* upload button that links to the upload page */}
                <li className="item"><Link to="/upload">
                    <img alt="upload"
                    src={require("../images/upload-logo.png")}
                    className="upload-logo"/>
                 </Link></li>
                {/* Search bar that links to the search page */}
                <li className="item">
                    <div className="search-div">
                    <Link to="/search">
                        <input type="text" 
                            value={courseCode}
                            onChange={handleSetCourseCode}
                            onClick={handleResetCourseCode}
                            className="search-bar" 
                            placeholder="Search Courses"></input>
                    </Link>
                    <img alt="search" 
                        src={require("../images/search-logo.png")} 
                        className="search-button"/>
                    </div>
                </li>
                {/* Button that logout */}
                <li className="item">
                    <button className = "logout-button" onClick = {handleLogOutClick}>
                        LOGOUT
                    </button>
                </li>
            </ul>
        </nav>
    );
}