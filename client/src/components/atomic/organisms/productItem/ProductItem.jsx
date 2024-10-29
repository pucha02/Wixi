import { ProductCost } from "../../atoms/atomsProduct/Cost";
import { ProductDescription } from "../../atoms/atomsProduct/Description";
import { ProductName } from "../../atoms/atomsProduct/Name";
import { ProductButtonAddToCart } from "../../atoms/atomsProduct/Button";
import { useParams } from "react-router-dom";


export const ProductItem = ({
  name,
  description,
  cost,
  addToCart,
  toProductItem,
}) => {

  return (
      <div onClick={toProductItem}>
        <ProductName name={name} />
        <ProductDescription description={description} />
        <ProductCost cost={cost} />
        <ProductButtonAddToCart />
      </div>
  );
};
