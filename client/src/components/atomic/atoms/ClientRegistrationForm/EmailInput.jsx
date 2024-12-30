export const RegistrationFormEmailInputAtom = ({ handleChange, userData }) => {
  return (
    <input
      className="login-input"
      type="email"
      name="email"
      placeholder="Email"
      value={userData.email}
      onChange={handleChange}
    />
  );
};
