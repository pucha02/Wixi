import ProductList from "../../atomic/templates/productList/productList"
import { Header } from "../../atomic/templates/Header/Header"
import { Footer } from "../../atomic/templates/Footer/Footer"

export const CatalogPage = () => {
    return (
        <>
            <Header />
            <ProductList />
            <Footer/>
        </>
    )
}