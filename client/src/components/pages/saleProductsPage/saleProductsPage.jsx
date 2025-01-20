import { Header } from "../../atomic/templates/Header/Header"
import { Footer } from "../../atomic/templates/Footer/Footer"
import { CarouselListByTypes } from "../../atomic/templates/CarouselListByTypes/CarouselListByTypes"
import { useEffect } from "react"
import { useState } from "react"
import { checkPromo } from "../../../utils/checkPromocodeUsage"
import { PromoModal } from "../../atomic/organisms/PromoModal/PromoModal"
import SaleProductList from "../../atomic/templates/SaleProductList/SaleProductList"
// import './CatalogPage.css'

export const SaleProductsPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [promoUsed, setPromoUsed] = useState(false);
    const [promoModalOpen, setPromoModalOpen] = useState(false);
    const [viewMobileFilter, setViewMobileFilter] = useState(false)

    useEffect(() => {
        window.scrollTo(0, 0);
        checkPromo(setPromoUsed, setPromoModalOpen)
    }, []);

    return (
        <>
            <Header viewMobileFilter={viewMobileFilter} setViewMobileFilter={setViewMobileFilter} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
            <div className="main">

                <div className="product-list-block">
                    <SaleProductList viewMobileFilter={viewMobileFilter} setViewMobileFilter={setViewMobileFilter} />
                </div>
                <div className="catalog-page-container">
                    <div className="recently-viewed-container">
                        {JSON.parse(localStorage.getItem("recentlyViewed"))?.length > 0 && (
                            <>
                                <h2>ПЕРЕГЛЯНУТІ
                                    ТОВАРИ:</h2>
                                <CarouselListByTypes
                                    type={null}
                                    getdata={JSON.parse(localStorage.getItem("recentlyViewed"))}
                                    countSlide={4}
                                />
                            </>
                        )}
                    </div>

                </div>
            </div>

            <Footer />
            
            <PromoModal promoModalOpen={promoModalOpen} setPromoModalOpen={setPromoModalOpen} />
        </>
    )
}