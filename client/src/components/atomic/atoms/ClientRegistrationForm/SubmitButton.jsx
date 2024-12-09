import './ClientRegistrationForm.css';

export const RegistrationFormSubmitButtonAtom = ({
  text,
  type = 'submit',
  setIsModalOpenLogin = () => {},  // дефолтная пустая функция
  setIsModalOpenReg = () => {}     // дефолтная пустая функция
}) => {
  const handleClick = () => {
    setIsModalOpenLogin(true);
    setIsModalOpenReg(false);
  };

  return (
    <button className='login-button' type={type} onClick={handleClick}>
      {text}
    </button>
  );
};
