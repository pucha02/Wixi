import UserProfile from "../../atomic/templates/UserProfile/UserProfile";
import { Header } from "../../atomic/templates/Header/Header";
import { Footer } from "../../atomic/templates/Footer/Footer";
import { useState } from "react";

export const UserProfilePage = () => {
    const [viewMobileFilter, setViewMobileFilter] = useState(false)
    return (
        <>
           <Header viewMobileFilter={viewMobileFilter} setViewMobileFilter={setViewMobileFilter}/>
            <UserProfile/>
            <Footer/>
        </>
    )
}