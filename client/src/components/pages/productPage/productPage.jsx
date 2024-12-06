import { useEffect } from "react";
import { Header } from "../../atomic/templates/Header/Header";
import { ProductItem } from "../../atomic/organisms/productItem/ProductItem";
import { Footer } from "../../atomic/templates/Footer/Footer";

export const ProductPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div>
            <Header />
            <ProductItem />
            <Footer />

        </div>
    )
}