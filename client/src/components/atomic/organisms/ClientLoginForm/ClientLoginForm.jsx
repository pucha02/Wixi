import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PhoneLoginMolecule } from "../../molecules/ClientLoginForm/PhoneMolecule";
import { PasswordLoginMolecule } from "../../molecules/ClientLoginForm/PasswordMolecule";
import { LoginFormSubmitButtonAtom } from "../../atoms/ClientLoginForm/SubmitButton";
import { validateFields } from "../../../../utils/ValidateForm";
import { handleChangeInput } from "../../../../utils/handleChangeInput";
import { Modal } from "../../../../common/Modal";

const ClientLoginForm = ({
  isModalOpen,
  setIsModalOpen,
  setIsModalOpenLogin,
  setIsModalOpenReg,
}) => {
  const [loginResultModal, setLoginResultModal] = useState({
    isOpen: false,
    message: "",
  });

  const [userData, setUserData] = useState({
    number_phone: "",
    password: "",
  });

  const [validationErrors, setValidationErrors] = useState({});
  const navigate = useNavigate();
  const handleSubmitLoginUser = async (e) => {
    e.preventDefault();

    const errors = validateFields(userData);
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5001/api/auth/login-user",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      const data = await response.json();

      if (response.status === 400) {
        setLoginResultModal({
          isOpen: true,
          message: data.message,
        });
        return;
      }

      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userid", data.id);
        setLoginResultModal({
          isOpen: true,
          message: "Ви успішно увійшли до системи",
        });
        setTimeout(() => navigate("/profile"), 1500); // Переход через 1.5 секунды
      } else {
        setLoginResultModal({
          isOpen: true,
          message: "Помилка входу. Спробуйте ще раз.",
        });
      }
    } catch (error) {
      setLoginResultModal({
        isOpen: true,
        message: "Помилка входу. Перевірте дані.",
      });
    }
  };

  return (
    <div className="login-form-modal">
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="login-form-head">ВХІД ДО ОСОБИСТОГО КАБІНЕТУ</div>
        <form className="login-form" onSubmit={handleSubmitLoginUser}>
          <PhoneLoginMolecule
            userData={userData}
            handleChange={(e) => handleChangeInput(e, setUserData, userData)}
            validationErrors={validationErrors}
          />
          <PasswordLoginMolecule
            userData={userData}
            handleChange={(e) => handleChangeInput(e, setUserData, userData)}
            validationErrors={validationErrors}
          />
          <div className="login-form-btns">
            <LoginFormSubmitButtonAtom text={"УВІЙТИ"} />
            <LoginFormSubmitButtonAtom
              text={"ЗАРЕЄСТРУВАТИСЯ"}
              type="button"
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
      <LoginResultModal
        isOpen={loginResultModal.isOpen}
        message={loginResultModal.message}
        onClose={() => setLoginResultModal({ isOpen: false, message: "" })}
      />
    </div>
  );
};

export default ClientLoginForm;

const LoginResultModal = ({ isOpen, message, onClose }) => {
  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="login-result-modal">
        <p>{message}</p>
      </div>
    </Modal>
  );
};
