import './ClientLoginForm.css';

export const LoginFormSubmitButtonAtom = ({
  text,
  type = 'submit',
  setIsModalOpenLogin = () => {},  // дефолтная функция
  setIsModalOpenReg = () => {}     // дефолтная функция
}) => {
  const handleClick = () => {
    if (setIsModalOpenLogin) {
      setIsModalOpenLogin(false);
    }
    if (setIsModalOpenReg) {
      setIsModalOpenReg(true);
    }
  };

  return (
    <button className='login-button' type={type} onClick={handleClick}>
      {text}
    </button>
  );
};
