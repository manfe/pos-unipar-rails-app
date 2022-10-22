import axiosInstance from "../utils/axios"

const UserService = {
  getAll: async () => {
    let response = await axiosInstance.get('/users')
    return response.data
  }
}

export default UserService