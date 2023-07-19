import { useEffect, useState } from "react";
import { useEdit } from "./ProfileScreen";
import { useUser } from "../../App";
import { updateProfile } from "../../firebase";
import ImageCrop from "./ImageCrop";


export default function ProfilePic() {
    const { profile } = useUser();
    const editMode = useEdit();
    const [profilePic, setProfilePic] = useState(require("../../images/profile-pic.jpg"));

    // update the profile picture in the database
    const handleImageUpload = async (image) => {
        setProfilePic(image);
        await updateProfile(profile.uid, { photoUrl: image });
    };

    // update the profile picture in the component upon loading the profile
    useEffect(() => {
        if (profile?.photoUrl) {
            setProfilePic(profile.photoUrl);
        }
    }, [profile]);

    return (
        <div className="profile-pic">
            <img src={profilePic} alt="profile" className="profile-image"/> 
            {editMode 
            ? <ImageCrop handleImageUpload={handleImageUpload} /> 
            : <br />} 
        </div>
    );
}