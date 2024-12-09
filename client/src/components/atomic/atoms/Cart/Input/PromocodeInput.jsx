import './PromocodeInput.css'

export const PromocodeInput = ({ onChange }) => {
    return (
        <input className='promocode-input' type="text" onChange={onChange} placeholder="ВВЕДІТЬ ПРОМОКОД" />
    )
}