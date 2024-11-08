import { useSelector } from "react-redux"

export const TestButtonShowCart = () => {
    const products = useSelector((state=>state.cart.items))
    let showProduct

    const handleShowProduct = () => {
        showProduct = products
        console.log(showProduct)
    }

    return (
        <div>
            <button onClick={handleShowProduct}>Show cart state</button>
        </div>
    )
}