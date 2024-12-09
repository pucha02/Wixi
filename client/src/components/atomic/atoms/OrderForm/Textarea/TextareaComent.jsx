import './TextareaComent.css'

export const TextareaComent = ({ handleChange, userData, name }) => {
    return (
        <textarea
            className='coment-textarea'
            name={name}
            placeholder="КОМЕНТАР ДО ЗАМОВЛЕННЯ..."
            value={userData}
            onChange={handleChange}>

        </textarea>
    )
}