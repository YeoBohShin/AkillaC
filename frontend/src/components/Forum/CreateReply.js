import { useState } from "react";
import { useUser } from "../../App";

export default function CreateReply({ handleCreateReply, id, pypName, getReplies }) {
    const { profile } = useUser();
    const { courseCode, pypYear, semester, midOrFinals } = pypName;
    const [content, setContent] = useState("");

    const handleReply = async (event) => {
        event.preventDefault();
        await fetch(`/reply_to_thread?author=${profile.name}&replyContent=${content}&parentID=${id}&courseCode=${courseCode}&pypYear=${pypYear}&semester=${semester}&midOrFinals=${midOrFinals}`, { method: 'POST' });
        handleCreateReply();
        getReplies();
    }

    return (
        <div className="pop-up">
            <div className="pop-up-content">
                <h1>Reply to Question</h1>
                <textarea
                    id="content" 
                    name="content"
                    value={content}
                    onChange={(event) => setContent(event.target.value)}
                    className="qns-content" />
                <br />
                <button onClick={handleReply} className="submit-button">Reply</button>
                <button onClick={handleCreateReply} className="cancel-button">
                    Cancel
                </button>
            </div>
        </div>
    )
}