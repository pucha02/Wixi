import { OrderFormInput } from "../../../atoms/OrderForm/Input/OrderFormInput"
import "./ContactInfo.css"

export const ContactInfo = ({ handleChange, userData, validationErrors }) => {
    return (
        <div className="contact-info-block">
            <div className="contact-info-profile-inputs">
                <div className="contact-info-full-name">
                    <OrderFormInput handleChange={handleChange} name={"firstname"} userData={userData.firstname} placeholder={"ІМ'Я*"} />
                    {validationErrors.firstname && <p>{validationErrors.firstname}</p>}
                    <OrderFormInput handleChange={handleChange} name={"lastname"} userData={userData.lastname} placeholder={"ПРІЗВИЩЕ*"} />
                    {validationErrors.lastname && <p>{validationErrors.lastname}</p>}
                </div>
                <div className="contact-info-contacts">
                    <OrderFormInput handleChange={handleChange} name={"number_phone"} userData={userData.number_phone} placeholder={"+380 (__) ___ __ __*"} />
                    {validationErrors.number_phone && <p>{validationErrors.number_phone}</p>}
                    <OrderFormInput handleChange={handleChange} name={"email"} userData={userData.email} placeholder={"EMAIL"} />
                    {validationErrors.email && <p>{validationErrors.email}</p>}
                </div>
                <div className="contact-info-contacts">
                    <OrderFormInput handleChange={handleChange} name={"birthday"} userData={userData.birthday} placeholder={"ДАТА НАРОДЖЕННЯ"} type="date"/>

                </div>
            </div>
        </div>
    )
}