import axiosInstance from "../utils/axios"

const AuthService = {
  signIn: async (email, password) => {
    let response = await axiosInstance.post('/auth/login', {email, password})

    if (response.data) {
      return response.data
    } else {
      return response.error
    }    
  }
}

export default AuthService