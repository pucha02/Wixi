import { useHttp } from "../hooks/http.hook";

const useGetDataProduct = () => {
  const { request, clearError, process, setProcess } = useHttp();

  const _url = 'http://localhost:3001/data'

  const getAllProduct = async () => {
    const result = await request(_url)
    console.log(result)
    return result
  }

  return {
    getAllProduct, 
    process,
    setProcess,
    clearError
  }
}

export default useGetDataProduct;