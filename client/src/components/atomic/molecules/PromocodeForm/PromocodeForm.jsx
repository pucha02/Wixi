import { PromocodeInput } from "../../atoms/Cart/Input/PromocodeInput"
import { CartButton } from "../../atoms/Cart/Button/CartButton"

export const PromocodeForm = () => {
    return (
        <form >
            <div>МАЄТЕ ПРОМОКОД?</div>
            <PromocodeInput />
            <CartButton />
        </form>
    )
}