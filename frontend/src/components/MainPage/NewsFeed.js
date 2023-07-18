import { useUser } from "../../App"
import { Link } from "react-router-dom";

export default function NewsFeed() {
    const { profile } = useUser();

    return (
        <div className="newsfeed">
            <h1>Newsfeed</h1>
            {profile.newsfeed.length === 0 
            ? <p>It's quiet here isn't it</p>
            : profile.newsfeed.map((news, index) => 
                <div key={index} className="newsfeed-card">
                    <Link to={`/search/${news.courseCode}/${news.pypYear}${news.semester}${news.midOrFinals}`} className="newsfeed-link">
                        {news.message}
                    </Link>
                </div>
            )}
        </div>
    )
}