import { ProductCost } from "../../atoms/atomsProduct/Cost";
import { ProductDescription } from "../../atoms/atomsProduct/Description";
import { ProductName } from "../../atoms/atomsProduct/Name";
import { ProductButtonAddToCart } from "../../atoms/atomsProduct/Button";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from "../../../../redux/reducers/cartReducer";
import { useEffect } from "react";

export const ProductItem = ({ name, description, cost, addToCart, toProductItem, id}) => {

  const {productName} = useParams();
  const productItem = name || productName
  const dispatch = useDispatch();
  const product = useSelector((state=>state.cart.items))

  const handleAddToCart =  () => {
    const item = { id, productName, description, cost }; 
    dispatch(addItem(item));
    console.log(productItem, '/n', product) // диспатчим экшен для добавления товара в корзину
  };

  return (
      <div onClick={toProductItem}>
        <ProductName name={productItem} />
        <ProductDescription description={description} />
        <ProductCost cost={cost} />
        <ProductButtonAddToCart handleAddToCart={handleAddToCart}/>
      </div>
  );
};