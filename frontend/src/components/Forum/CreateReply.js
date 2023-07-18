import { useState } from "react";
import { useUser } from "../../App";
import { updateProfile } from "../../firebase";
import { getProfile } from "../../firebase";

export default function CreateReply({ handleCreateReply, id, qnsAuthorId, pypName, getReplies }) {
    const { profile } = useUser();
    const { courseCode, pypYear, semester, midOrFinals } = pypName;
    const [content, setContent] = useState("");

    // sends reply content to backend
    const handleReply = async (event) => {
        event.preventDefault();
        try {
            await fetch(`/reply_to_thread?author=${profile.name}&authorID=${profile.uid}&replyContent=${content}&parentID=${id}&courseCode=${courseCode}&pypYear=${pypYear}&semester=${semester}&midOrFinals=${midOrFinals}`, { method: 'POST' });
            handleCreateReply();
            getReplies();
            const authorProfile = await getProfile(qnsAuthorId);
            await updateProfile(qnsAuthorId, 
                { 
                    newsfeed: [
                        {
                            message: `${profile.name} replied to your question from ${courseCode} ${pypYear.substring(0, 2)}/${pypYear.substring(2, 4)} ${semester} ${midOrFinals}`,
                            courseCode: courseCode,
                            pypYear: pypYear,
                            semester: semester,
                            midOrFinals: midOrFinals
                        },
                        ...authorProfile.newsfeed
                    ] 
                }
            );
        } catch (error) {
            console.log(error);
            alert("Error replying Question");
        }
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