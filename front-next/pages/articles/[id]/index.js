import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ROUTES from "../../../src/config/routes";
import ArticleService from "../../../src/services/ArticleService";

function ShowArticle() {
  const router = useRouter()
  const { id } = router.query

  const [article, setArticle] = useState(null);

  useEffect(() => {
    ArticleService.getById(id).then((data) => {
      setArticle(data)
    })
  }, [id])

  if (!article) return `Carregando...`

  return (
    <>
      <p>Exibindo o artigo: {id}</p>

      <p>
        <Link
          href={{
            pathname: ROUTES.articles.list,
          }}
        >
          <a>Voltar</a>
        </Link>
      </p>

      <dl>
        <dt>ID</dt>
        <dd>{article.id}</dd>

        <dt>Title</dt>
        <dd>{article.title}</dd>

        <dt>Author</dt>
        <dd>{article.author.name}</dd>

        <dt>Category</dt>
        <dd>{article.category.name}</dd>

        <dt>Body</dt>
        <dd>{article.body}</dd>

        <dt>Created At</dt>
        <dd>{article.created_at}</dd>
      </dl>

    </>
  );
}

export default ShowArticle;