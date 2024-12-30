import { useState } from "react";
import { PhoneRegistrationMolecule } from "../../molecules/ClientRegistrationForm/PhoneMolecule";
import { FirstNameRegistrationMolecule } from "../../molecules/ClientRegistrationForm/FirstNameMolecule";
import { LastNameRegistrationMolecule } from "../../molecules/ClientRegistrationForm/LastNameMolecule";
import { PasswordRegistrationMolecule } from "../../molecules/ClientRegistrationForm/PasswordMolecule";
import { EmailRegistrationMolecule } from "../../molecules/ClientRegistrationForm/EmailMolecule";
import { RegistrationFormSubmitButtonAtom } from "../../atoms/ClientRegistrationForm/SubmitButton";
import { validateFields } from "../../../../utils/ValidateForm";
import { handleChangeInput } from "../../../../utils/handleChangeInput";
import { Modal } from "../../../../common/Modal";

const ClientRegistrationForm = ({
  isModalOpen,
  setIsModalOpen,
  setIsModalOpenLogin,
  setIsModalOpenReg,
}) => {
  const [registrationResultModal, setRegistrationResultModal] = useState({
    isOpen: false,
    message: "",
  });

  const [userData, setUserData] = useState({
    number_phone: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [validationErrors, setValidationErrors] = useState({});

  const handleSubmitRegistrationUser = async (e) => {
    e.preventDefault();
    const errors = validateFields(userData);

    setValidationErrors(errors);

    if (Object.keys(errors).length > 0) {
      console.log("Ошибки валидации, регистрация отменена", errors);
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5001/api/auth/register-user",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      if (response.status === 400) {
        setRegistrationResultModal({
          isOpen: true,
          message: "Користувач з таким номером телефону вже існує",
        });
      } else if (response.status === 201) {
        setRegistrationResultModal({
          isOpen: true,
          message: "Реєстрація пройшла успішно",
        });
      } else {
        throw new Error("Помилка під час реєстрації");
      }
    } catch (error) {
      setRegistrationResultModal({
        isOpen: true,
        message: "Помилка під час реєстрації",
      });
    }
  };

  return (
    <div className="reg-form-modal">
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="login-form-head">ВХІД ДО ОСОБИСТОГО КАБІНЕТУ</div>
        <form onSubmit={handleSubmitRegistrationUser}>
          <PhoneRegistrationMolecule
            userData={userData}
            handleChange={(e) => handleChangeInput(e, setUserData, userData)}
            validationErrors={validationErrors}
          />
          <FirstNameRegistrationMolecule
            userData={userData}
            handleChange={(e) => handleChangeInput(e, setUserData, userData)}
            validationErrors={validationErrors}
          />
          <PasswordRegistrationMolecule
            userData={userData}
            handleChange={(e) => handleChangeInput(e, setUserData, userData)}
            validationErrors={validationErrors}
          />
          <div className="login-form-btns">
            <RegistrationFormSubmitButtonAtom text={"ЗАРЕЄСТРУВАТИСЯ"} />
            <RegistrationFormSubmitButtonAtom
              type="button"
              text={"ВЖЕ МАЮ ОСОБИСТИЙ КАБІНЕТ"}
              setIsModalOpenLogin={setIsModalOpenLogin}
              setIsModalOpenReg={setIsModalOpenReg}
            />
          </div>
        </form>
        <div className="login-form-info">
          Здійснюючи реєстрацію або вхід з використанням cвого профілю в
          соціальній мережі, я тим самим даю згоду на зв'язування мого аккаунта
          відповідно до положень Політики конфіденційності
        </div>
      </Modal>
      <RegistrationResultModal
        isOpen={registrationResultModal.isOpen}
        message={registrationResultModal.message}
        onClose={() =>
          setRegistrationResultModal({ isOpen: false, message: "" })
        }
      />
    </div>
  );
};

export default ClientRegistrationForm;

const RegistrationResultModal = ({ isOpen, message, onClose }) => {
  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="registration-result-modal">
        <p>{message}</p>
      </div>
    </Modal>
  );
};
