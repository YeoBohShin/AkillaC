import { useEffect, useState, useCallback } from "react";
import CreateReply from "./CreateReply"
import Replies from "./Replies";

export default function QuestionCard({ question, pypName }) {
    const [showCreateReply, setShowCreateReply] = useState(false);
    const { courseCode, pypYear, semester, midOrFinals } = pypName;
    const [replies, setReplies] = useState([]);
    const [showReplies, setShowReplies] = useState(false);

    const handleCreateReply = () => {
        setShowCreateReply(prev => !prev);
    }

    const handleShowReplies = () => {
        setShowReplies(prev => !prev);
    }

    const getReplies = useCallback(async () => {
        const response = await fetch(`/get_replies?parentID=${question.threadID}&courseCode=${courseCode}&pypYear=${pypYear}&semester=${semester}&midOrFinals=${midOrFinals}`, { method: 'GET' });
        const data = await response.json();
        setReplies(data);
    }
    , [courseCode, pypYear, semester, midOrFinals, question.threadID]);

    useEffect(() => {
        getReplies();
    }, [getReplies]);

    return (
        <>
        <div className="question-card">
            <h1>{question.author}</h1>
            <p>{question.threadContent}</p>
            <h3>
            <button className="show-replies" onClick={handleShowReplies}>
                {showReplies ? "Hide Replies" : "Show Replies" + ` (${replies.length})`}
            </button>
                <button className="reply-button" onClick={handleCreateReply}>
                    <img 
                        src={require("../../images/reply-icon.png")} 
                        alt="reply-icon" 
                        className="reply-icon"/>
                </button>
                {question.timestamp} 
            </h3>
            {showCreateReply && 
                <CreateReply 
                    handleCreateReply={handleCreateReply} 
                    id={question.threadID} 
                    pypName={pypName}
                    getReplies={getReplies} />}
        </div>
        {showReplies && <Replies replies={replies} />}
        </>
    )
}