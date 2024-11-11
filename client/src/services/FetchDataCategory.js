import { useHttp } from "../hooks/http.hook";

const useGetDataCategories = () => {
  const { request, clearError, process, setProcess } = useHttp();

  const _url = 'http://localhost:5000/api/categories/get-categories';

  const getAllCategories = async () => {
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