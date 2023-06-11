import { useState } from "react";
import { useEdit } from "./ProfileScreen";
import { useUser } from "../../App";
import { updateProfile } from "../../firebase";
import ImageCrop from "./ImageCrop";


export default function ProfilePic() {
    const session = useUser();
    const editMode = useEdit();
    const [profilePic, setProfilePic] = useState(session.photoUrl);
    const handleImageUpload = (image) => {
        setProfilePic(image);
        updateProfile(session.uid, { photoUrl: image });
    };

    return (
        <div>
        {profilePic
        ? <img src={profilePic} alt="profile" className="profile-image"/> 
        : <img src={require("../../images/profile-pic.jpg")} alt="profile" className="profile-image"/>
        }
        {editMode 
        ? <ImageCrop handleImageUpload={handleImageUpload} /> 
        : <br />}
        </div>
    );
}