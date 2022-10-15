import { useEffect, useState } from "react";
import axiosInstance from "../../src/utils/axios";

function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getArticles = async () => {
      let response = await axiosInstance.get('/articles')

      setArticles(response.data)
    }

    getArticles().then(() => {
      setIsLoading(false)
    })   
  }, [])

  if (isLoading) return <p>Carregando....</p>

  return (
    <>
      <p>Lista de Artigos:</p>
      <ul>
        {
          articles.map((article) => {
            return (
              <li key={article.id}>{article.id} - {article.title} - {article.body} - {article.created_at}</li>
            )
          })
        }
      </ul>
    </>
  )
}

export default ArticleList;