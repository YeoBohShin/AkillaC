import { useState, useContext, createContext } from "react";
import { useUser } from "../../App";
import ProfilePic from "./ProfilePic";
import ProfileInfo from "./ProfileInfo";

const EditContext = createContext();

export function useEdit() {
    return useContext(EditContext);
}

export default function ProfileScreen() {
    const { handleUser } = useUser();
    const [editMode, setEditMode] = useState(false);

    // update all components once editing is done
    const handleEdit = () => {
        if (editMode) {
            handleUser();
        }
        setEditMode(!editMode);
    };
    
    return (
        <EditContext.Provider value={editMode}>
            <div className="profilescreen">
                <ProfilePic />
                <ProfileInfo />
                <button onClick={handleEdit} className="edit-button">{editMode? "Done" : "Edit Profile"}</button>
            </div>
        </EditContext.Provider>
    );
}