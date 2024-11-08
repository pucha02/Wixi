import { ProductCost } from "../../atoms/atomsProduct/Cost";
import { ProductDescription } from "../../atoms/atomsProduct/Description";
import { ProductName } from "../../atoms/atomsProduct/Name";
import { ProductButtonAddToCart } from "../../atoms/atomsProduct/Button";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from "../../../../redux/reducers/cartReducer";

export const ProductItem = ({ productName, description, productCost, toProductItem, productId }) => {

  const dispatch = useDispatch();
  const product = useSelector((state=>state.cart.items))
  const location = useLocation()

  const {localProductCost, localProductId, localProductName} = location.state || {}

  const cost = productCost || localProductCost
  const _id = productId || localProductId
  const title = productName || localProductName

  const handleAddToCart =  () => {
    const item = { title, _id, cost};
    dispatch(addItem(item));
    console.log(product, cost)
  };

  return (
      <div onClick={toProductItem}>
        <ProductName name={title} />
        <ProductDescription description={description} />
        <ProductCost cost={cost} />
        <ProductButtonAddToCart handleAddToCart={handleAddToCart}/>
      </div>
  );
};