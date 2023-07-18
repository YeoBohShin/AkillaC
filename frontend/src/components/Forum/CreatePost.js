import { useState } from "react";
import { useUser } from "../../App";

export default function CreatePost({ handleCreatePost, pypName, getQuestions }) {
    const { profile } = useUser();
    const { courseCode, pypYear, semester, midOrFinals } = pypName;
    const [content, setContent] = useState('');

    // sends post content to backend
    const handlePost = async (event) => {
        event.preventDefault();
        try {
            await fetch(`/create_thread?author=${profile.name}&authorID=${profile.uid}&threadContent=${content}&courseCode=${courseCode}&pypYear=${pypYear}&semester=${semester}&midOrFinals=${midOrFinals}`, { method: "GET" });
            handleCreatePost();
            getQuestions();
        } catch (error) {
            console.log(error);
            alert("Error creating post");
        }
    }
    
    return (
        <div className="pop-up">
            <div className="pop-up-content">
                <h1>Post your Question</h1>
                <textarea
                    id="content" 
                    name="content"
                    value={content}
                    onChange={(event) => setContent(event.target.value)}
                    className="qns-content" />
                <br />
                <button onClick={handlePost} className="submit-button">Post</button>
                <button onClick={handleCreatePost} className="cancel-button">
                    Cancel
                </button>
            </div>
        </div>
    )
}
