import { useHttp } from "../hooks/http.hook";

const useGetDataCategories = () => {
  const { request, clearError, process, setProcess } = useHttp();

  const _url = 'http://16.171.32.44/api/categories/get-categories';

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