import ClientRegistrationForm from "../atomic/organisms/ClientRegistrationForm/ClientRegistrationForm";
import ClientLoginForm from "../atomic/organisms/ClientLoginForm/ClientLoginForm";
import { ProductPage } from "../pages/productPage/productPage";
import CategoryList from "../atomic/templates/categoryList/CategoryList";
import { CatalogPage } from "../pages/catalogPage/CatalogPage";
import { HashRouter  as Router, Route, Routes } from "react-router-dom";
import { RegisterOrderPage } from "../pages/registerOrderPage/RegisterOrderPage";
import { CartPage } from "../pages/cartPage/CartPage";
import { MainPage } from "../pages/mainPage/mainPage";
import { UserProfilePage } from "../pages/userProfilePage/userProfilePage";
import { WishListPage } from "../pages/wishListPage/wishListPage";
import { SearchedProductPage } from "../pages/searchedProductPage/searchedProductPage";
import { ConfPolicePage } from "../pages/confPolicePage/confPolicePage";

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
          <Route path="/profile" element={<UserProfilePage />} />
          <Route path="/wishlist" element={<WishListPage />} />
          <Route path="/searchedproducts" element={<SearchedProductPage />} />
          <Route path="/confpolice" element={<ConfPolicePage />} />
          {/* <Route path="/aboutus" element={} />
          <Route path="/exchangeandreturn" element={} /> */}
          <Route path="/privacypolicy" element={<ConfPolicePage/>} />
          {/* <Route path="/delivery" element={} />
          <Route path="/payment" element={} /> */}
        </Routes>
      </Router>
      {/* <TestButtonShowCart /> */}
    </div>
  );
};

export default App;
