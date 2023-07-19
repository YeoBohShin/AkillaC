import { Link } from "react-router-dom";
import { useUser } from "../../App";

export default function ProfileTab() {
    const { profile } = useUser();

    return (
        <div className="profiletab">
        {profile.photoUrl
        ? <img src={profile?.photoUrl} alt="profile" className="profiletab-image"/>
        : <img src={require("../../images/profile-pic.jpg")} alt="profile" className="profiletab-image"/>}
        <Link to="/profile">
            <button className="profiletab-button">
                View Profile
            </button>
        </Link>
        </div>
    )
}