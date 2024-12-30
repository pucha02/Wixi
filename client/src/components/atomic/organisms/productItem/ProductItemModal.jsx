import { Link } from "react-router-dom";

export const ProductItemModal = ({ isOpen, onClose, setCartOpen }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div style={{ textAlign: "center" }} className="modal-content">
                <h2>Від 3-ох тисяч гривень доставка безкоштовна 🎁</h2>
                <p style={{ marginTop: "20px" }}>Бажаєте додати ще товари, чи оформити обрану модель?</p>
                <div className="product-modal-btns">
                    
                    <div className="cart-button" onClick={onClose}>Продожити покупку</div>
                    <Link to={'/cart'}><div className="cart-button tocart" onClick={()=>{onClose()}}>Перейти до кошика</div></Link>
                </div>
                <button className="modal-close" onClick={onClose}>
                    ✖
                </button>
            </div>
        </div>
    );
};