import ProductList from "../../atomic/templates/productList/productList"
import { Header } from "../../atomic/templates/Header/Header"
import { Footer } from "../../atomic/templates/Footer/Footer"

import './CatalogPage.css'

export const CatalogPage = () => {
    return (
        <>
            <Header />
            <div className="main">

                <div className="filter-block">

                </div>
                <div className="product-list-block">
                    <ProductList />
                </div>
            </div>
            <Footer />
        </>
    )
}