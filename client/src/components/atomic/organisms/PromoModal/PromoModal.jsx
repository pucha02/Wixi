import { Modal } from "../../../../common/Modal"

export const PromoModal = ({promoModalOpen, setPromoModalOpen}) => {
    return (
        <Modal isOpen={promoModalOpen} onClose={() => setPromoModalOpen(false)} className={'border'}>
            <div className="promo-modal">
                <div className="promo-modal-head">Даруємо знижку</div>
                <div className="promo-modal-sub-head">-10% на весь асортимент</div>
                <div className="promo-modal-promocode">з промокодом</div>
                <div className="promo-modal-promocode-name">
                    <p>shop10</p>
                </div>
                <div className="promo-modal-bottom">
                    <p>
                        для активації введіть промокод у відповідному полі під час оформлення замовлення*
                    </p>
                </div>
            </div>
        </Modal>
    )
}