export const RegistrationFormLastNameInputAtom = ({
  handleChange,
  userData,
}) => {
  return (
    <input
      className="login-input"
      type="lastname"
      name="lastname"
      placeholder="Прізвище"
      value={userData.lastname}
      onChange={handleChange}
    />
  );
};
