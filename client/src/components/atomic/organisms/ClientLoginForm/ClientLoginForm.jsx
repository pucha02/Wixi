import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PhoneLoginMolecule } from "../../molecules/ClientLoginForm/PhoneMolecule";
import { PasswordLoginMolecule } from "../../molecules/ClientLoginForm/PasswordMolecule";
import { LoginFormSubmitButtonAtom } from "../../atoms/ClientLoginForm/SubmitButton";
import { validateFields } from "../../../../utils/ValidateForm";
import { handleChangeInput } from "../../../../utils/handleChangeInput";
import { Modal } from "../../../../common/Modal";
import './ClientLoginForm.css'


const ClientLoginForm = ({ isModalOpen, setIsModalOpen, setIsModalOpenLogin, setIsModalOpenReg }) => {
    const [userData, setUserData] = useState({
        number_phone: '',
        password: ''
    });

    const [validationErrors, setValidationErrors] = useState({});
    const navigate = useNavigate();
    const handleSubmitLoginUser = async (e) => {
        e.preventDefault();

        const errors = validateFields(userData);
        if (errors.length > 0) {
            setValidationErrors(errors);
            return;
        }

        try {
            const response = await fetch('http://16.171.32.44/api/auth/login-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            const data = await response.json();

            if (response.status === 400) {
                alert(data.message);
            }

            if (data.token) {
                console.log(data.id)
                localStorage.setItem('token', data.token);
                localStorage.setItem('userid', data.id)
                alert('Ви успішно увійшли до системи');
                navigate('/profile');
            } else {
                console.log('Помилка входу');
            }
        } catch (error) {
            console.log('Помилка входу. Перевірте дані.');
        }
    };

    return (
        <div className="login-form-modal">
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div className="login-form-head">ВХІД ДО ОСОБИСТОГО КАБІНЕТУ</div>
                <form className="login-form" onSubmit={handleSubmitLoginUser}>
                    <PhoneLoginMolecule userData={userData} handleChange={(e) => handleChangeInput(e, setUserData, userData)} validationErrors={validationErrors} />
                    <PasswordLoginMolecule userData={userData} handleChange={(e) => handleChangeInput(e, setUserData, userData)} validationErrors={validationErrors} />
                    <div className="login-form-btns">
                        <LoginFormSubmitButtonAtom text={"УВІЙТИ"} />
                        <LoginFormSubmitButtonAtom text={"ЗАРЕЄСТРУВАТИСЯ"} type="button" setIsModalOpenLogin={setIsModalOpenLogin} setIsModalOpenReg={setIsModalOpenReg}/>
                    </div>
                </form>
                <div className="login-form-info">
                    Здійснюючи реєстрацію або вхід з використанням cвого профілю в соціальній мережі, я тим самим даю згоду на зв'язування мого аккаунта відповідно до положень Політики конфіденційності
                </div>
            </Modal>
        </div>
    )
}

export default ClientLoginForm;