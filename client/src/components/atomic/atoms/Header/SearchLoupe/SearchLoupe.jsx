export const SearchLoupe = ({
  src,
  setIsModalSearchOpen = null,
  setViewCategories = null,
}) => {
  return (
    <div className="search-loupe">
      <img
        onClick={() => {
          setIsModalSearchOpen(true);
          setViewCategories(false);
        }}
        src={src}
        alt=""
      />
    </div>
  );
};
