import ClientRegistrationForm from "../atomic/organisms/ClientRegistrationForm/ClientRegistrationForm";
import ClientLoginForm from "../atomic/organisms/ClientLoginForm/ClientLoginForm";
import UserProfile from "../atomic/organisms/UserProfile/UserProfile";
import ProductList from "../atomic/templates/productList/productList";
import CategoryList from "../atomic/templates/categoryList/CategoryList";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ProductItem } from "../atomic/organisms/productItem/ProductItem";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/category/" element={<CategoryList />} />
          <Route path="/category/productList/:id" element={<ProductList/>} />
          <Route path="/category/productList/:id/:productName" element={<ProductItem/>} />
          <Route path="/registration" element={<ClientRegistrationForm />} />
          <Route path="/login" element={<ClientLoginForm />} />
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
