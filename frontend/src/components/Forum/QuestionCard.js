import { useEffect, useState, useCallback, useContext, createContext } from "react";
import { useUser } from "../../App";
import { useQuestionsContext } from "./Forum";
import { getProfile, updateProfile } from "../../firebase";
import CreateReply from "./CreateReply"
import Replies from "./Replies";

const RepliesContext = createContext();

export function useRepliesContext() {
    return useContext(RepliesContext);
}

export default function QuestionCard({ question, pypName }) {
    const { courseCode, pypYear, semester, midOrFinals } = pypName;
    const { profile } = useUser();
    const { getQuestions } = useQuestionsContext();
    const [replies, setReplies] = useState([]);
    const [showReplies, setShowReplies] = useState(false);
    const [showCreateReply, setShowCreateReply] = useState(false);
    const [liked, setLiked] = useState(question.likes.includes(profile.uid));
    const [disliked, setDisliked] = useState(question.dislikes.includes(profile.uid));

    // handle pop-up for creating reply
    const handleCreateReply = () => {
        setShowCreateReply(prev => !prev);
    }

    // handle show replies
    const handleShowReplies = () => {
        setShowReplies(prev => !prev);
    }

    // fetches replies from backend
    const getReplies = useCallback(async () => {
        const response = await fetch(`/get_replies?parentID=${question.threadID}&courseCode=${courseCode}&pypYear=${pypYear}&semester=${semester}&midOrFinals=${midOrFinals}`, { method: 'GET' });
        const data = await response.json();
        setReplies(data);
    }
    , [courseCode, pypYear, semester, midOrFinals, question.threadID]);

    useEffect(() => {
        getReplies();
    }, [getReplies]);

    const handleLike = async () => {
        const authorProfile = await getProfile(question.authorID);
        if (disliked) {
            const response = await fetch(`/dislike?userID=${profile.uid}&parentID=${question.parentID}&id=${question.threadID}&courseCode=${courseCode}&pypYear=${pypYear}&semester=${semester}&midOrFinals=${midOrFinals}`, { method: 'GET' });
            if (response.status === 200) {
                setDisliked(prev => !prev);
                const index = authorProfile.newsfeed.findIndex(
                    newsfeed => newsfeed.message === `${profile.name} disliked your question from ${courseCode} ${pypYear.substring(0, 2)}/${pypYear.substring(2, 4)} ${semester} ${midOrFinals}`);
                authorProfile.newsfeed.splice(index, 1);
                await updateProfile(question.authorID,
                    {
                        newsfeed: authorProfile.newsfeed
                    }
                );
            }
        }
        
        const response = await fetch(`/like?userID=${profile.uid}&parentID=${question.parentID}&id=${question.threadID}&courseCode=${courseCode}&pypYear=${pypYear}&semester=${semester}&midOrFinals=${midOrFinals}`, { method: 'GET' });
        if (response.status === 200) {
            getQuestions();
            setLiked(prev => !prev);
            if (liked) {
                const index = authorProfile.newsfeed.findIndex(
                    newsfeed => newsfeed.message === `${profile.name} liked your question from ${courseCode} ${pypYear.substring(0, 2)}/${pypYear.substring(2, 4)} ${semester} ${midOrFinals}`);
                authorProfile.newsfeed.splice(index, 1);
                await updateProfile(question.authorID,
                    {
                        newsfeed: authorProfile.newsfeed
                    }
                );
            } else {
                await updateProfile(question.authorID,
                    {
                        newsfeed: [
                            { 
                                message : `${profile.name} liked your question from ${courseCode} ${pypYear.substring(0, 2)}/${pypYear.substring(2, 4)} ${semester} ${midOrFinals}`,
                                courseCode: courseCode,
                                pypYear: pypYear,
                                semester: semester,
                                midOrFinals: midOrFinals
                            },
                            ...authorProfile.newsfeed
                        ]
                    }
                );
            }
        }
    }

    useEffect(() => {
        if (liked) {
            const like = document.getElementById("likes" + question.threadID); 
            like.style.mixBlendMode = "overlay";
        } else {
            const like = document.getElementById("likes" + question.threadID);
            like.style.mixBlendMode = "color-burn";
        }
    }, [liked, question.threadID]);

    const handleDislike = async () => {
        const authorProfile = await getProfile(question.authorID);
        if (liked) {
            const response = await fetch(`/like?userID=${profile.uid}&parentID=${question.parentID}&id=${question.threadID}&courseCode=${courseCode}&pypYear=${pypYear}&semester=${semester}&midOrFinals=${midOrFinals}`, { method: 'GET' });
            if (response.status === 200) {
                setLiked(prev => !prev);
                const index = authorProfile.newsfeed.findIndex(
                    newsfeed => newsfeed.message === `${profile.name} liked your question from ${courseCode} ${pypYear.substring(0, 2)}/${pypYear.substring(2, 4)} ${semester} ${midOrFinals}`);
                authorProfile.newsfeed.splice(index, 1);
                await updateProfile(question.authorID,
                    {
                        newsfeed: authorProfile.newsfeed
                    }
                );
            }
        }

        const response = await fetch(`/dislike?userID=${profile.uid}&parentID=${question.parentID}&id=${question.threadID}&courseCode=${courseCode}&pypYear=${pypYear}&semester=${semester}&midOrFinals=${midOrFinals}`, { method: 'GET' });
        if (response.status === 200) {
            getQuestions();
            setDisliked(prev => !prev);
            if (disliked) {
                const index = authorProfile.newsfeed.findIndex(
                    newsfeed => newsfeed.message === `${profile.name} disliked your question from ${courseCode} ${pypYear.substring(0, 2)}/${pypYear.substring(2, 4)} ${semester} ${midOrFinals}`);
                authorProfile.newsfeed.splice(index, 1);
                await updateProfile(question.authorID,
                    {
                        newsfeed: authorProfile.newsfeed
                    }
                );
            } else {
                await updateProfile(question.authorID,
                    {
                        newsfeed: [
                            {
                                message: `${profile.name} disliked your question from ${courseCode} ${pypYear.substring(0, 2)}/${pypYear.substring(2, 4)} ${semester} ${midOrFinals}`,
                                courseCode: courseCode,
                                pypYear: pypYear,
                                semester: semester,
                                midOrFinals: midOrFinals
                            },
                            ...authorProfile.newsfeed
                        ]
                    }
                );
            }
        }
    }

    useEffect(() => {
        if (disliked) {
            const dislike = document.getElementById("dislikes" + question.threadID); 
            dislike.style.mixBlendMode = "overlay";
        } else {
            const dislike = document.getElementById("dislikes" + question.threadID);
            dislike.style.mixBlendMode = "color-burn";
        }
    }, [disliked, question.threadID]);

    return (
        <>
        <div className="question-card">
            <h1>{question.author}</h1>
            <p>{question.threadContent}</p>
            <h3>
                <button className="show-replies" onClick={handleShowReplies}>
                    {showReplies ? "Hide Replies" : `Show Replies (${replies.length})`}
                </button>
                <p>
                    <img src={require("../../images/dislike-icon.png")} 
                        alt="dislike-icon" 
                        className="dislike-icon" 
                        onClick={handleDislike} 
                        id={"dislikes" + question.threadID} />
                    ({question.dislikes.length})
                </p>
                <p>
                    <img src={require("../../images/like-icon.png")} 
                        alt="like-icon" 
                        className="like-icon" 
                        onClick={handleLike} 
                        id={"likes" + question.threadID} />
                    ({question.likes.length})
                </p>
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
                    qnsAuthorId={question.authorID} 
                    pypName={pypName}
                    getReplies={getReplies} />}
        </div>
        {showReplies && 
            <RepliesContext.Provider value={{ getReplies }}>
                <Replies replies={replies} pypName={pypName} />
            </RepliesContext.Provider>}
        </>
    )
}