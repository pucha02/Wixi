export const ProductItemModal = ({ isOpen, onClose, setCartOpen }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div style={{ textAlign: "center" }} className="modal-content">
                <h2>Від 3-ох тисяч гривень доставка безкоштовна 🎁</h2>
                <p style={{ marginTop: "20px" }}>Бажаєте додати ще товари, чи оформити обрану модель?</p>
                <div className="product-modal-btns">
                    <div className="cart-button" onClick={onClose}>Продожити покупку</div>
                    <div className="cart-button tocart" onClick={()=>{setCartOpen(true); onClose()}}>Перейти до кошика</div>
                </div>
                <button className="modal-close" onClick={onClose}>
                    ✖
                </button>
            </div>
        </div>
    );
};