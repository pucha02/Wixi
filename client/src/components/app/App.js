import ClientRegistrationForm from "../atomic/organisms/ClientRegistrationForm/ClientRegistrationForm";
import ClientLoginForm from "../atomic/organisms/ClientLoginForm/ClientLoginForm";
import UserProfile from "../atomic/templates/UserProfile/UserProfile";
import { ProductPage } from "../pages/productPage/productPage";
import CategoryList from "../atomic/templates/categoryList/CategoryList";
import { CatalogPage } from "../pages/catalogPage/CatalogPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ProductItem } from "../atomic/organisms/productItem/ProductItem";
import { RegisterOrderPage } from "../pages/registerOrderPage/RegisterOrderPage";
import { CartPage } from "../pages/cartPage/CartPage";
import { TestButtonShowCart } from "../../TestButtonShowCart/TestButtonShowCart";
import { MainPage } from "../pages/mainPage/mainPage";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/cart/" element={<CartPage />} />
          <Route path="/category/" element={<CategoryList />} />
          <Route path="/register-order/" element={<RegisterOrderPage />} />
          <Route path="/category/productList/:id" element={<CatalogPage />} />
          <Route path="/category/productList/:id/:productName" element={<ProductPage />} />
          <Route path="/registration" element={<ClientRegistrationForm />} />
          <Route path="/login" element={<ClientLoginForm />} />
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
      </Router>
      <TestButtonShowCart />
    </div>
  );
};

export default App;
