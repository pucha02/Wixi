import ClientRegistrationForm from "../atomic/organisms/ClientRegistrationForm/ClientRegistrationForm";
import ClientLoginForm from "../atomic/organisms/ClientLoginForm/ClientLoginForm";
import UserProfile from "../atomic/organisms/UserProfile/UserProfile";
import ProductList from "../atomic/templates/productList/productList";

const App = () => {
  return (
    <div className="App">
      <ClientRegistrationForm />
      <ClientLoginForm />
      <UserProfile />
      <div>Hello World</div>
      <ProductList />
    </div>
  );
};

export default App;
