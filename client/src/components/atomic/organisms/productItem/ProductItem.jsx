import { ProductCost } from "../../atoms/atomsProduct/Cost";
import { ProductDescription } from "../../atoms/atomsProduct/Description";
import { ProductName } from "../../atoms/atomsProduct/Name";
import { ProductButtonAddToCart } from "../../atoms/atomsProduct/Button";

export const ProductItem = ({name, description, cost}) => {
    return (
        <div>
            <ProductName name={name}/>
            <ProductDescription description={description}/>
            <ProductCost cost={cost}/>
            <ProductButtonAddToCart/>
        </div>
    )
};
