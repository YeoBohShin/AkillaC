import CourseTab from "./CourseTab";
import NewsFeed from "./NewsFeed";
import ProfileTab from "./ProfileTab";
import WelcomeBackBanner from "./WelcomeBackBanner";

export default function HomeScreen() {

    return (
        <>
            <div className="homepage">
                <WelcomeBackBanner />
                <ProfileTab />
                <NewsFeed />
                <CourseTab />
            </div>
        </>
    );
}