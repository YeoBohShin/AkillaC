import { useState, useEffect, useCallback } from 'react';
import CreatePost from './CreatePost';
import Questions from './Questions';

export default function Forum({ loading, pypName }) {
    const [showCreatePost, setShowCreatePost] = useState(false);
    const [questions, setQuestions] = useState([]);
    const { courseCode, pypYear, semester, midOrFinals } = pypName;   

    const handleCreatePost = () => {
        setShowCreatePost(prev => !prev);
    }

    const getQuestions = useCallback(async () => {
        const response = await fetch(`/get_threads?courseCode=${courseCode}&pypYear=${pypYear}&semester=${semester}&midOrFinals=${midOrFinals}`, { method: 'GET' });
        const data = await response.json();
        setQuestions(data);
    }
    , [courseCode, pypYear, semester, midOrFinals]);

    useEffect(() => {
        getQuestions();
    }, [getQuestions]);

    return (
        <div className="forum">
            <Questions questions={questions} pypName={pypName} />
            {loading && <button onClick={handleCreatePost} className='add-post-button'>
                <img src={require("../../images/plus-icon.jpg")} 
                    alt="add-post-button" 
                    className='add-post-icon'/>
            </button>}
            {showCreatePost && <CreatePost handleCreatePost={handleCreatePost} pypName={pypName} getQuestions={getQuestions} />}
        </div>
    )
}