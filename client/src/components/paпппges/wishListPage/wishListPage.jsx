import { Header } from "../../atomic/templates/Header/Header";
import { Footer } from "../../atomic/templates/Footer/Footer";
import { WishList } from "../../atomic/templates/WishList/WishList";
import { useState } from "react";
import { useEffect } from "react";
import { checkPromo } from "../../../utils/checkPromocodeUsage";
import { PromoModal } from "../../atomic/organisms/PromoModal/PromoModal";

export const WishListPage = () => {
    const [viewMobileFilter, setViewMobileFilter] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [promoUsed, setPromoUsed] = useState(false);
    const [promoModalOpen, setPromoModalOpen] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        checkPromo(setPromoUsed, setPromoModalOpen)
    }, []);

    return (
        <>
            <Header viewMobileFilter={viewMobileFilter} setViewMobileFilter={setViewMobileFilter} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
            <WishList />
            <Footer />
            <PromoModal promoModalOpen={promoModalOpen} setPromoModalOpen={setPromoModalOpen} />
        </>
    )
}