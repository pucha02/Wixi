import { ProductCost } from "../../atoms/atomsProduct/Cost";
import { ProductDescription } from "../../atoms/atomsProduct/Description";
import { ProductName } from "../../atoms/atomsProduct/Name";
import { ProductButtonAddToCart } from "../../atoms/atomsProduct/Button";

export const ProductItem = () => {
    return (
        <div>
            <ProductName/>
            <ProductDescription/>
            <ProductCost/>
            <ProductButtonAddToCart/>
        </div>
    )
};
