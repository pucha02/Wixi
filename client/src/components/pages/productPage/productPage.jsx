import { useEffect } from "react";
import { Header } from "../../atomic/templates/Header/Header";
import { ProductItem } from "../../atomic/organisms/productItem/ProductItem";
import { Footer } from "../../atomic/templates/Footer/Footer";
import { useState } from "react";
import { checkPromo } from "../../../utils/checkPromocodeUsage";
import { PromoModal } from "../../atomic/organisms/PromoModal/PromoModal";

export const ProductPage = () => {
    const [notification, setNotification] = useState("");
    const [viewMobileFilter, setViewMobileFilter] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [promoUsed, setPromoUsed] = useState(false);
    const [promoModalOpen, setPromoModalOpen] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        checkPromo(setPromoUsed, setPromoModalOpen)
    }, []);

    return (
        <div>
            <Header
                notification={notification}
                setNotification={setNotification}
                viewMobileFilter={viewMobileFilter}
                setViewMobileFilter={setViewMobileFilter}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen} />
            <ProductItem notification={notification} setNotification={setNotification} setCartOpen={setIsModalOpen}/>
            <Footer />
            <PromoModal promoModalOpen={promoModalOpen} setPromoModalOpen={setPromoModalOpen} />
        </div>
    )
}