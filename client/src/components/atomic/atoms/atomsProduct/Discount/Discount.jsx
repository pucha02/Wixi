import './Discount.css'

export const ProductDiscount = ({ discount }) => {
    return (
      <div className="product-discount">
        -{discount}%
      </div>
    );
  };
  