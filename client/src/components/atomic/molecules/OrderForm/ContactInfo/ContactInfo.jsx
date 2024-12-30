import { OrderFormInput } from "../../../atoms/OrderForm/Input/OrderFormInput";

export const ContactInfo = ({ handleChange, userData, validationErrors }) => {
  return (
    <div className="contact-info-block">
      <div className="contact-info-head">КОНТАКТНА ІНФОРМАЦІЯ</div>
      <div className="contact-info-inputs">
        <div className="contact-info-full-name">
          <OrderFormInput
            handleChange={handleChange}
            name={"firstname"}
            userData={userData.firstname}
            placeholder={"ІМ'Я*"}
            required={true}
          />
          {validationErrors.firstname && <p>{validationErrors.firstname}</p>}
          <OrderFormInput
            handleChange={handleChange}
            name={"lastname"}
            userData={userData.lastname}
            placeholder={"ПРІЗВИЩЕ*"}
            required={true}
          />
          {validationErrors.lastname && <p>{validationErrors.lastname}</p>}
        </div>
        <div className="contact-info-contacts">
          <OrderFormInput
            handleChange={handleChange}
            name={"number_phone"}
            userData={userData.number_phone}
            placeholder={"+380 (__) ___ __ __*"}
            required={true}
          />
          {validationErrors.number_phone && (
            <p>{validationErrors.number_phone}</p>
          )}
          <OrderFormInput
            handleChange={handleChange}
            name={"email"}
            userData={userData.email}
            placeholder={"EMAIL"}
          />
          {validationErrors.email && <p>{validationErrors.email}</p>}
        </div>
      </div>
    </div>
  );
};
