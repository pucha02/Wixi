import React, { useState } from "react";
import { Cart } from "../../atomic/templates/Cart/Cart";
import { Header } from "../../atomic/templates/Header/Header";
import { Footer } from "../../atomic/templates/Footer/Footer";
import { PromoModal } from "../../atomic/organisms/PromoModal/PromoModal";
import './Cart.css';

export const CartPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMobileFilter, setViewMobileFilter] = useState(false)
  const [promoModalOpen, setPromoModalOpen] = useState(false);
  return (
    <div className="cart-page">
      <Header viewMobileFilter={viewMobileFilter} setViewMobileFilter={setViewMobileFilter} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      <Cart />
      <Footer />
      <PromoModal promoModalOpen={promoModalOpen} setPromoModalOpen={setPromoModalOpen} />
    </div>

  );
};


