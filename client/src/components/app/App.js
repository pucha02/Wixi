import ClientRegistrationForm from "../atomic/organisms/ClientRegistrationForm/ClientRegistrationForm";
import ClientLoginForm from "../atomic/organisms/ClientLoginForm/ClientLoginForm";
import UserProfile from "../atomic/organisms/UserProfile/UserProfile";

const App = () => {
  return (
    <div className="App">
      <ClientRegistrationForm/>
      <ClientLoginForm/>
      <UserProfile/>
    </div>
  );
};

export default App;
