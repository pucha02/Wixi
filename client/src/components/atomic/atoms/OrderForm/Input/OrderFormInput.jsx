import './OrderFormInput.css'

export const OrderFormInput = ({ handleChange, userData, name, placeholder, type='text' }) => {
    return (
        <input
            className='order-form-input'
            type={type}
            name={name}
            placeholder={placeholder}
            value={userData}
            onChange={handleChange}
        />
    )
}