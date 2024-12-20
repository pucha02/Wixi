import ProductList from "../../atomic/templates/productList/productList"
import { Header } from "../../atomic/templates/Header/Header"
import { Footer } from "../../atomic/templates/Footer/Footer"
import { CarouselListByTypes } from "../../atomic/templates/CarouselListByTypes/CarouselListByTypes"
import { useEffect } from "react"
import { useState } from "react"
import Filter from "../../atomic/organisms/Filter/Filter"

import './CatalogPage.css'

export const CatalogPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [viewMobileFilter, setViewMobileFilter] = useState(false)
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <>
            <Header viewMobileFilter={viewMobileFilter} setViewMobileFilter={setViewMobileFilter} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
            <div className="main">

                <div className="product-list-block">
                    <ProductList viewMobileFilter={viewMobileFilter} setViewMobileFilter={setViewMobileFilter} />
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
        </>
    )
}