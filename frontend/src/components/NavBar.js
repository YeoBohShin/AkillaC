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
        <div className="navbar">
        <nav>
            <ul>
                {/* Logo that links to the home page */}
                <li><Link to="/">
                    <img alt="logo" 
                     src={require("../images/logo.png")} 
                     className="page-logo"/>
                </Link></li>
                {/* Search bar that links to the search page */}
                <li><Link to="/search">
                    <input type="text" 
                        value={courseCode}
                        onChange={handleSetCourseCode}
                        onClick={handleResetCourseCode}
                        className="search-bar" 
                        placeholder="Search Courses"></input>
                 </Link></li>
                {/* upload button that links to the upload page */}
                <li><Link to="/upload">
                    <img alt="upload"
                    src={require("../images/upload-logo.png")}
                    className="upload-logo"/>
                 </Link></li>
            </ul>
        </nav>
            <h1 className="header">
                AkillaC
            </h1>
                <img alt="search" 
                src={require("../images/search-logo.png")} 
                className="search-button"/>
            {/* Button that logout */}
            <button className = "logout-button" onClick = {handleLogOutClick}>
                LOGOUT
            </button>
        </div>
    );
}