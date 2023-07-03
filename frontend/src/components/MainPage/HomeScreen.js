import CourseTab from "./CourseTab";
import NavBar from "../NavBar";
import NewsFeed from "./NewsFeed";
import ProfileTab from "./ProfileTab";
import WelcomeBackBanner from "./WelcomeBackBanner";

export default function HomeScreen() {

    return (
        <>
            <NavBar />
            <div className="homepage">
                <WelcomeBackBanner />
                <ProfileTab />
                <NewsFeed />
                <CourseTab />
            </div>
        </>
    );
}