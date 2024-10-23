import { useHttp } from "../hooks/http.hook";

const useGetDataCategories = () => {
  const { request, clearError, process, setProcess } = useHttp();

  const _url = 'http://localhost:5001/api/categories/get-categories';

  const getAllCategories = async () => {
    // Формируем URL с query параметром category
    const result = await request(`${_url}`);
    
    return result;
  };

  return {
    getAllCategories,
    process,
    setProcess,
    clearError,
  };
};

export default useGetDataCategories;