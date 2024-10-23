import { useState } from "react";
import { PhoneLoginMolecule } from "../../molecules/ClientLoginForm/PhoneMolecule";
import { PasswordLoginMolecule } from "../../molecules/ClientLoginForm/PasswordMolecule";
import { LoginFormSubmitButtonAtom } from "../../atoms/ClientLoginForm/SubmitButton";
import { validateFields } from "../../../../utils/ValidateForm";
import { handleChangeInput } from "../../../../utils/handleChangeInput";


const ClientLoginForm = () => {
    const [userData, setUserData] = useState({
        number_phone: '',
        password: ''
    });

    const [validationErrors, setValidationErrors] = useState({});

    const handleSubmitLoginUser = async (e) => {
        e.preventDefault();
    
        const errors = validateFields(userData);
        if (errors.length > 0) {
            setValidationErrors(errors);
            return;
        }
    
        // try {
        //     const response = await fetch('http://localhost:5001/api/auth/login-user', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify(userData),
        //     });
    
        //     const data = await response.json();
    
        //     if (response.status === 400) {
        //         alert(data.message);
        //     }
    
        //     if (data.token) {
        //         localStorage.setItem('token', data.token);
        //         alert('Ви успішно увійшли до системи');
        //     } else {
        //         console.log('Помилка входу');
        //     }
        // } catch (error) {
        //     console.log('Помилка входу. Перевірте дані.');
        // }

        try {
            const response = await fetch('http://localhost:5001/api/auth/login-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
                credentials: 'include',
            });

            const data = await response.json();

            if (response.status === 400) {
                alert(data.message);
            }

            if (data.message) {
                alert(data.message);
            } else {
                console.log('Помилка входу');
            }
            console.log('Cookies после входа:', document.cookie);
        } catch (error) {
            console.log('Помилка входу. Перевірте дані.');
        }
    };

    return (
        <>
            <form onSubmit={handleSubmitLoginUser}>
                <PhoneLoginMolecule userData={userData} handleChange={(e) => handleChangeInput(e, setUserData, userData)} validationErrors={validationErrors} />
                <PasswordLoginMolecule userData={userData} handleChange={(e) => handleChangeInput(e, setUserData, userData)} validationErrors={validationErrors} />
                <LoginFormSubmitButtonAtom />
            </form>
        </>
    )
}

export default ClientLoginForm;