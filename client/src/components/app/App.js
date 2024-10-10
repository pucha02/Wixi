import ClientRegistrationForm from "../atomic/organisms/ClientRegistrationForm/ClientRegistrationForm";
import ClientLoginForm from "../atomic/organisms/ClientLoginForm/ClientLoginForm";
import UserProfile from "../atomic/organisms/UserProfile/UserProfile";
import ProductList from "../atomic/templates/productList/productList";
import CategoryList from "../atomic/templates/categoryList/CategoryList";

const App = () => {
  return (
    <div className="App">
      <ClientRegistrationForm />
      <ClientLoginForm />
      <UserProfile />
      <ProductList />
      <CategoryList/>
    </div>
  );
};

export default App;
