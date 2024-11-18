import { useLocation } from "react-router-dom";
import { Header } from "../../atomic/templates/Header/Header";
import { ProductPageItem } from "../../atomic/organisms/productPageItem/productPageItem";

export const ProductPage = () => {

    const location = useLocation();

    const { localProductCost, localProductId, localProductName, localProductColors, localProductDiscount, localProductType } = location.state || {};
    return(
        <div>
            <Header/>
            <ProductPageItem/>
            
        </div>
    )
}