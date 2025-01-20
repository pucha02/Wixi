import { useHttp } from "../hooks/http.hook";

const useGetDataProduct = () => {
  const { request, clearError, process, setProcess } = useHttp();

  const _urlByCategory = 'http://16.171.32.44/api/products/get-products-by-category';
  const _urlByProductTitle = 'http://16.171.32.44/api/products/get-products-by-title';
  const _urlByProductType = 'http://16.171.32.44/api/products/get-products-by-type';
  const _urlByAllProducts = 'http://16.171.32.44/api/products/get-all-products'
  const _urlByAllColors = 'http://16.171.32.44/api/colors/get-colors'
  const _urlAddToCart = 'http://16.171.32.44/api/cart/add-to-cart'
  const _urlRemoveFromCart = 'http://16.171.32.44/api/cart/remove-from-cart'
  const _urlPromocodeByCode = 'http://16.171.32.44/api/promocode/get-promocode-by-code'
  const _urlByProductsPagination = 'http://16.171.32.44/api/products/get-all-products-with-pag'


  const getAllProductByCategory = async (category) => {
    const result = await request(`${_urlByCategory}?category=${encodeURIComponent(category)}`);
    console.log(result);
    return result;
  };

  const getPaginatedProducts = async (page, limit) => {
    const response = await fetch(`${_urlByProductsPagination}?page=${page}&limit=${limit}`);
    if (!response.ok) {
      throw new Error("Ошибка при получении данных");
    }
    return await response.json();
  };

  const getProduct = async (title) => {
    const result = await request(`${_urlByProductTitle}?title=${encodeURIComponent(title)}`)
    console.log(result)
    return result
  }

  const getPromocode = async (title) => {
    const result = await request(`${_urlPromocodeByCode}?code=${encodeURIComponent(title)}`)
    console.log(result)
    return result
  }

  const getProductByType = async (type) => {
    const result = await request(`${_urlByProductType}?type=${encodeURIComponent(type)}`)
    console.log(result)
    return result
  }

  const getAllProduct = async () => {
    const result = await request(`${_urlByAllProducts}`);
    console.log(result);
    return result;
  };

  const getAllColors = async () => {
    const result = await request(`${_urlByAllColors}`);
    console.log(result);
    return result;
  };

  const getAllProductBySearch = async (searchQuery) => {
    const url = `${_urlByAllProducts}?search=${encodeURIComponent(searchQuery)}`;
    const result = await request(url);
    return result;
  };

  const addToCart = async (userId, product) => {
    const result = await request(_urlAddToCart, 'POST', { userId, product })
    return result
  };

  const removeFromCart = async (userId, product) => {
    const result = await request(_urlRemoveFromCart, 'POST', { userId, product })
    return result
  };

  return {
    getAllProductByCategory,
    process,
    setProcess,
    clearError,
    getProduct,
    getPromocode,
    getAllProduct,
    getAllProductBySearch,
    addToCart,
    removeFromCart,
    getProductByType,
    getPaginatedProducts,
    getAllColors
  };
};

export default useGetDataProduct;