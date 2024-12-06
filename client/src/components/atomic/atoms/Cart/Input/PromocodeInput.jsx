import './PromocodeInput.css'

export const PromocodeInput = ({ onChange }) => {
    return (
        <input type="text" onChange={onChange} placeholder="ВВЕДІТЬ ПРОМОКОД" />
    )
}