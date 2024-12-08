import { PromocodeInput } from "../../atoms/Cart/Input/PromocodeInput"
import { CartButton } from "../../atoms/Cart/Button/CartButton"
import './PromocodeForm.css'

export const PromocodeForm = ({ handleSubmit }) => {
    return (
        <form className="promocode-form" onSubmit={handleSubmit}>
            <div>МАЄТЕ ПРОМОКОД?</div>
            <PromocodeInput />
            <CartButton type="submit" text={"ЗАСТОСУВАТИ"}/>
        </form>
    )
}