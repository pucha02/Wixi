export const RegistrationFormPasswordInputAtom = ({
  handleChange,
  userData,
}) => {
  return (
    <input
      className="login-input"
      type="password"
      name="password"
      placeholder="Пароль"
      value={userData.password}
      onChange={handleChange}
    />
  );
};
