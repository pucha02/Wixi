export const RegistrationFormFirstNameInputAtom = ({
  handleChange,
  userData,
}) => {
  return (
    <input
      className="login-input"
      type="firstname"
      name="firstname"
      placeholder="Ім'я"
      value={userData.firstname}
      onChange={handleChange}
    />
  );
};
