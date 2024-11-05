import { useHttp } from "../hooks/http.hook";

const useGetDataProduct = () => {
  const { request, clearError, process, setProcess } = useHttp();

  const _urlByCategory = 'http://localhost:5000/api/products/get-products-by-category';
  const _urlByAllProducts = 'http://localhost:5000/api/products/get-all-products'
  

  const getAllProductByCategory = async (category) => {
    const result = await request(`${_urlByCategory}?category=${encodeURIComponent(category)}`);
    console.log(result);
    return result;
  };

  const getProduct = async (title) => {
    const result = await request(`${_urlByCategory}?title=${encodeURIComponent(title)}`)
    console.log(result)
    return result
  }

  const getAllProduct = async () => {
    const result = await request(`${_urlByAllProducts}`);
    console.log(result);
    return result;
  };

  const getAllProductBySearch = async (searchQuery) => {
    const url = `${_urlByAllProducts}?search=${encodeURIComponent(searchQuery)}`;
    const result = await request(url);
    return result;
};

  return {
    getAllProductByCategory,
    process,
    setProcess,
    clearError,
    getProduct,
    getAllProduct,
    getAllProductBySearch
  };
};

export default useGetDataProduct;