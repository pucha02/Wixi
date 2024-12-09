import UserProfile from "../../atomic/templates/UserProfile/UserProfile";
import { Header } from "../../atomic/templates/Header/Header";
import { Footer } from "../../atomic/templates/Footer/Footer";

export const UserProfilePage = () => {
    return (
        <>
            <Header/>
            <UserProfile/>
            <Footer/>
        </>
    )
}