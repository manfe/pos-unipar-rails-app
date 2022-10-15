import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ROUTES from "../../src/config/routes";
import ArticleService from "../../src/services/ArticleService";

function ArticleList() {
  const { router } = useRouter();
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const deleteArticle = (article) => {
    var accepted = confirm(`Você realmente gostaria de deletar o artigo: ${article.title}`);
    if (!accepted) return

    setIsLoading(true)
    ArticleService.destroy(article.id).then((data) => {
      getArticles().then(() => {
        setIsLoading(false);
        toast.success("Article destroyed sucessfully!")
      })
    }).catch((e) => {
      setIsLoading(false);
      toast.error(`Erro when destroying article: ${e.message}`)
    })
  }

  const getArticles = async () => {
    let data = await ArticleService.getAll()
    console.log(data)
    setArticles(data);
  };

  useEffect(() => {   
    getArticles().then(() => {
      setIsLoading(false);
    });
  }, []);

  if (isLoading) return <p>Carregando....</p>;

  return (
    <>
      <p>Lista de Artigos:</p>
      <p>
        <Link
          href={{
            pathname: ROUTES.articles.new,
          }}
        >
          <a>Criar Novo Artigo</a>
        </Link>
      </p>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Category</th>
            <th>Body</th>
            <th>Created At</th>
            <th>Published At</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article) => {
            return (
              <tr key={article.id}>
                <td>{article.id}</td>
                <td>{article.title}</td>
                <td>{article.author.name}</td>
                <td>{article.category.name}</td>
                <td>{article.body}</td>
                <td>{article.created_at}</td>
                <td>{article.published_at}</td>
                <td>
                  <Link
                    href={{
                      pathname: ROUTES.articles.show,
                      query: {
                        id: article.id,
                      },
                    }}
                  >
                    <a>Visualizar</a>
                  </Link>
                  <Link
                    href={{
                      pathname: ROUTES.articles.edit,
                      query: {
                        id: article.id,
                      },
                    }}
                  >
                    <a>Editar</a>
                  </Link>
                  <button onClick={() => deleteArticle(article)}>Deletar</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default ArticleList;
