import './OrderFormInput.css'

export const OrderFormInput = ({ handleChange, userData, name, placeholder }) => {
    return (
        <input
            className='order-form-input'
            type="text"
            name={name}
            placeholder={placeholder}
            value={userData}
            onChange={handleChange}
        />
    )
}