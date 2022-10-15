import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ROUTES from "../../../src/config/routes";
import ArticleService from "../../../src/services/ArticleService";
import CategoryService from "../../../src/services/CategoryService";
import UserService from "../../../src/services/UserService";

function EditArticle() {
  const router = useRouter();
  const { id } = router.query;
  const [article, setArticle] = useState(null);
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    ArticleService.getById(id).then((data) => {
      setArticle(data)
    })
  }, [id])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const updateArticle = (article) => {
    ArticleService.update(id, article).then((data) => {
      router.push(ROUTES.articles.list)
      toast.success(`Article successfully updated!`)
    }).catch((e) => {
      toast.error(`Erro when updating article: ${e.message}`)
    })
  }

  useEffect(() => {
    CategoryService.getAll().then((data) => setCategories(data));
    UserService.getAll().then((data) => setUsers(data));
  }, []);

  if (!article || !categories.length || !users.length) return `Carregando...`

  console.log(article)

  return (
    <>
      <p>Página de Edição do artigo: {id}</p>
      <p>
        <Link
          href={{
            pathname: ROUTES.articles.list,
          }}
        >
          <a>Cancelar</a>
        </Link>
      </p>

      <form onSubmit={handleSubmit((data) => updateArticle(data))}>
        <div className="field">
          <label>Title</label>
          <input {...register("title", { required: true })} defaultValue={article.title} />
          {errors.title && <p>title is required.</p>}
        </div>

        <div className="field">
          <label>Body</label>
          <input {...register("body", { required: true })} defaultValue={article.body} />
          {errors.body && <p>body is required.</p>}
        </div>

        <div className="field">
          <label>Category</label>
          <select {...register("category_id", { pattern: /\d/ })} defaultValue={article.category_id}>
            <option>Select Category</option>
            {categories.map((category) => {
              return (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              );
            })}
          </select>
          {errors.category_id && <p>Category is required.</p>}
        </div>

        <div className="field">
          <label>Author</label>
          <select {...register("author_id", { pattern: /\d/ })} defaultValue={article.author_id}>
            <option>Select Author</option>
            {users.map((user) => {
              return (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              );
            })}
          </select>
          {errors.author_id && <p>Author is required.</p>}
        </div>

        <div className="field">
          <label>Published At</label>
          <input {...register("published_at", { required: true })} defaultValue={article.published_at} />
          {errors.published_at && <p>Published at is required.</p>}
        </div>

        <input type="submit" />
      </form>
    </>
  );
}

export default EditArticle;
