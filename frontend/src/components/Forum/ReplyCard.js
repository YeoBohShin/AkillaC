import { useState, useEffect } from 'react';
import { useUser } from '../../App';
import { useRepliesContext } from './QuestionCard';
import { getProfile, updateProfile } from '../../firebase';


export default function ReplyCard({ reply, pypName }) {
    const { profile } = useUser();
    const { getReplies} = useRepliesContext();
    const { courseCode, pypYear, semester, midOrFinals } = pypName;
    const [liked, setLiked] = useState(reply.likes.includes(profile.uid));
    const [disliked, setDisliked] = useState(reply.dislikes.includes(profile.uid));

    const handleLike = async () => {
        const authorProfile = await getProfile(reply.authorID);
        if (disliked) {
            const response = await fetch(`/dislike?userID=${profile.uid}&parentID=${reply.parentID}&id=${reply.replyID}&courseCode=${courseCode}&pypYear=${pypYear}&semester=${semester}&midOrFinals=${midOrFinals}`, { method: 'GET' });
            if (response.status === 200) {
                setDisliked(prev => !prev);
                const index = authorProfile.newsfeed.findIndex(
                    newsfeed => newsfeed.message === `${profile.name} disliked your reply from ${courseCode} ${pypYear.substring(0, 2)}/${pypYear.substring(2, 4)} ${semester} ${midOrFinals}`);
                authorProfile.newsfeed.splice(index, 1);
                await updateProfile(reply.authorID,
                    {
                        newsfeed: authorProfile.newsfeed
                    }
                );
            }
        }
        
        const response = await fetch(`/like?userID=${profile.uid}&parentID=${reply.parentID}&id=${reply.replyID}&courseCode=${courseCode}&pypYear=${pypYear}&semester=${semester}&midOrFinals=${midOrFinals}`, { method: 'GET' });
        if (response.status === 200) {
            getReplies();
            setLiked(prev => !prev);
            if (liked) {
                const index = authorProfile.newsfeed.findIndex(
                    newsfeed => newsfeed.message === `${profile.name} liked your reply from ${courseCode} ${pypYear.substring(0, 2)}/${pypYear.substring(2, 4)} ${semester} ${midOrFinals}`);
                authorProfile.newsfeed.splice(index, 1);
                await updateProfile(reply.authorID,
                    {
                        newsfeed: authorProfile.newsfeed
                    }
                );
            } else {
                await updateProfile(reply.authorID,
                    {
                        newsfeed: [
                            {
                            message: `${profile.name} liked your reply from ${courseCode} ${pypYear.substring(0, 2)}/${pypYear.substring(2, 4)} ${semester} ${midOrFinals}`,
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
            const like = document.getElementById("likes" + reply.replyID); 
            like.style.mixBlendMode = "overlay";
        } else {
            const like = document.getElementById("likes" + reply.replyID);
            like.style.mixBlendMode = "color-burn";
        }
    }, [liked, reply.replyID]);

    const handleDislike = async () => {
        const authorProfile = await getProfile(reply.authorID);
        if (liked) {
            const response = await fetch(`/like?userID=${profile.uid}&parentID=${reply.parentID}&id=${reply.replyID}&courseCode=${courseCode}&pypYear=${pypYear}&semester=${semester}&midOrFinals=${midOrFinals}`, { method: 'GET' });
            if (response.status === 200) {
                setLiked(prev => !prev);
                const index = authorProfile.newsfeed.findIndex(
                    newsfeed => newsfeed.message === `${profile.name} liked your reply from ${courseCode} ${pypYear.substring(0, 2)}/${pypYear.substring(2, 4)} ${semester} ${midOrFinals}`);
                authorProfile.newsfeed.splice(index, 1);
                await updateProfile(reply.authorID,
                    {
                        newsfeed: authorProfile.newsfeed
                    }
                );
            }
        }

        const response = await fetch(`/dislike?userID=${profile.uid}&parentID=${reply.parentID}&id=${reply.replyID}&courseCode=${courseCode}&pypYear=${pypYear}&semester=${semester}&midOrFinals=${midOrFinals}`, { method: 'GET' });
        if (response.status === 200) {
            getReplies();
            setDisliked(prev => !prev);
            if (disliked) {
                const index = authorProfile.newsfeed.findIndex(
                    newsfeed => newsfeed.message === `${profile.name} disliked your reply from ${courseCode} ${pypYear.substring(0, 2)}/${pypYear.substring(2, 4)} ${semester} ${midOrFinals}`);
                authorProfile.newsfeed.splice(index, 1);
                await updateProfile(reply.authorID,
                    {
                        newsfeed: authorProfile.newsfeed
                    }
                );
            } else {
                await updateProfile(reply.authorID,
                    {
                        newsfeed: [
                            {
                                message: `${profile.name} disliked your reply from ${courseCode} ${pypYear.substring(0, 2)}/${pypYear.substring(2, 4)} ${semester} ${midOrFinals}`,
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
            const dislike = document.getElementById("dislikes" + reply.replyID); 
            dislike.style.mixBlendMode = "overlay";
        } else {
            const dislike = document.getElementById("dislikes" + reply.replyID);
            dislike.style.mixBlendMode = "color-burn";
        }
    }, [disliked, reply.replyID]);

    return (
        <div className="reply-card">
            <h1>{reply.author}</h1>
            <p>{reply.threadContent}</p>
            <h3>
                <p>
                    <img src={require("../../images/dislike-icon.png")} 
                        alt="dislike-icon" 
                        className="dislike-icon" 
                        onClick={handleDislike}
                        id={"dislikes" + reply.replyID} />
                    ({reply.dislikes.length})
                </p>
                <p>
                    <img src={require("../../images/like-icon.png")} 
                        alt="like-icon" 
                        className="like-icon" 
                        onClick={handleLike}
                        id={"likes" + reply.replyID} />
                    ({reply.likes.length})
                </p>
                <p>{reply.timestamp}</p>
            </h3>
        </div>
    )
}