import { useState } from "react";
import { useUser } from "../../App";

export default function CreatePost({ handleCreatePost, courseCode, getQuestions }) {
    const { profile } = useUser();
    const [content, setContent] = useState('');

    const handlePost = async (event) => {
        event.preventDefault();
        await fetch(`/create_thread?author=${profile.name}&threadContent=${content}&courseCode=${courseCode}`, { method: "GET" });
        handleCreatePost();
        getQuestions();
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
