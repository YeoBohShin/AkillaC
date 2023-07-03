import { useState, useEffect, useCallback } from 'react';
import CreatePost from './CreatePost';
import Questions from './Questions';

export default function Forum({ loading, courseCode }) {
    const [showCreatePost, setShowCreatePost] = useState(false);
    const [questions, setQuestions] = useState([]);

    const handleCreatePost = () => {
        setShowCreatePost(prev => !prev);
    }

    const getQuestions = useCallback(async () => {
        const response = await fetch(`/get_threads?courseCode=${courseCode}`, { method: 'GET' });
        const data = await response.json();
        setQuestions(data);
    }
    , [courseCode]);

    useEffect(() => {
        getQuestions();
    }, [getQuestions]);

    return (
        <div className="forum">
            <Questions questions={questions} />
            {loading && <button onClick={handleCreatePost} className='add-post-button'>
                <img src={require("../../images/plus-icon.jpg")} 
                    alt="add-post-button" 
                    className='add-post-icon'/>
            </button>}
            {showCreatePost && <CreatePost handleCreatePost={handleCreatePost} courseCode={courseCode} getQuestions={getQuestions} />}
        </div>
    )
}