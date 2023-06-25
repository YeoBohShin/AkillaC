import { useUser } from "../../App"

export default function WelcomeBackBanner() {
    const { profile } = useUser();

    return (
        <div className="welcomebackbanner">
            <h1>Welcome back,</h1>
            <h1>{ profile.name ? profile.name : "User" }</h1>
        </div>
    )
}