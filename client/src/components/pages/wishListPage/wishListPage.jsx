import { Header } from "../../atomic/templates/Header/Header";
import { Footer } from "../../atomic/templates/Footer/Footer";
import { WishList } from "../../atomic/templates/WishList/WishList";
import { useState } from "react";

export const WishListPage = () => {
    const [viewMobileFilter, setViewMobileFilter] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <Header viewMobileFilter={viewMobileFilter} setViewMobileFilter={setViewMobileFilter} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
            <WishList />
            <Footer />
        </>
    )
}