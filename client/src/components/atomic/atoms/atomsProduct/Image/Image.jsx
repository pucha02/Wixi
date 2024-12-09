import './Image.css'

export const ProductImage = ({ src, alt=null, className=null}) => {
    return (
      <div className={`product-image ${className}`}>
        <img src={src} alt={alt} className={className}/>
      </div>
    );
  };
  