export const ProductImage = ({
  src,
  alt = null,
  className = null,
  setHoveredItemId = null,
  item = null,
}) => {
  return (
    <div className={`product-image ${className}`}>
      <img
        src={src}
        alt={alt}
        className={className}
        {...(setHoveredItemId &&
          item && {
            onMouseEnter: () => setHoveredItemId(item._id),
            onMouseLeave: () => setHoveredItemId(null),
          })}
      />
    </div>
  );
};
