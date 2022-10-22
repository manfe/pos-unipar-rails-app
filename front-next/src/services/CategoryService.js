import axiosInstance from "../utils/axios"

const CategoryService = {
  getAll: async () => {
    let response = await axiosInstance.get('/categories')
    return response.data
  }
}

export default CategoryService