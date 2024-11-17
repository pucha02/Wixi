import { useSelector } from "react-redux"
import { Link } from "react-router-dom";

export const CartPage = () => {
    const products = useSelector((state) => state.cart.items);

    return (
        <>
            <ul>
                {products.map((product) => (
                    <li key={product._id}>{product.title}</li>
                ))}
            </ul>
            <Link to={'/register-order/'}><div>Перейти до оформлення</div></Link>
        </>
    );
};
