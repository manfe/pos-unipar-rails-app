import axiosInstance from "../utils/axios"

const ArticleService = {
  getAll: async () => {
    let response = await axiosInstance.get('/articles')
    return response.data
  },
  getById: async (id) => {
    if (!id) return

    let response = await axiosInstance.get(`/articles/${id}`)
    return response.data
  },
  create: async (article) => {
    if (!article) return

    let response = await axiosInstance.post(`/articles`, { article: article })
    return response.data
  },
  destroy: async (id) => {
    if (!id) return

    let response = await axiosInstance.delete(`/articles/${id}`)
    return response.data
  },
  update: async(id, article) => {
    if (!id && !article) return

    let response = await axiosInstance.put(`/articles/${id}`, { article: article })
    return response.data
  }

}

export default ArticleService