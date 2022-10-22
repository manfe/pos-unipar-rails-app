import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ROUTES from "../../src/config/routes";
import ArticleService from "../../src/services/ArticleService";
import CategoryService from "../../src/services/CategoryService";
import UserService from "../../src/services/UserService";

function NewArticle() {
  const router = useRouter()
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const insertArticle = (article) => {
    ArticleService.create(article).then((data) => {
      router.push(ROUTES.articles.list)
      toast.success(`Article successfully created!`)
    }).catch((e) => console.error(e))
  }

  useEffect(() => {
    CategoryService.getAll().then((data) => setCategories(data))
    UserService.getAll().then((data) => setUsers(data))
  }, []);

  return (
    <>
      <p>Tela de Cadastro de Artigo</p>
      <p>
        <Link
          href={{
            pathname: ROUTES.articles.list,
          }}
        >
          <a>Cancelar</a>
        </Link>
      </p>

      <form onSubmit={handleSubmit((data) => insertArticle(data))}>
        <div className="field">
          <label>Title</label>
          <input {...register("title", { required: true })} />
          {errors.title && <p>title is required.</p>}
        </div>

        <div className="field">
          <label>Body</label>
          <input {...register("body", { required: true })} />
          {errors.body && <p>body is required.</p>}
        </div>

        <div className="field">
          <label>Category</label>
          <select {...register("category_id", { pattern: /\d/ })}>
          <option>Select Category</option>
            {
              categories.map((category) => {
                return <option key={category.id} value={category.id}>{category.name}</option>
              })
            }
          </select>
          {errors.category_id && <p>Category is required.</p>}
        </div>

        <div className="field">
          <label>Author</label>
          <select {...register("author_id", { pattern: /\d/ })}>
          <option>Select Author</option>
            {
              users.map((user) => {
                return <option key={user.id} value={user.id}>{user.name}</option>
              })
            }
          </select>
          {errors.author_id && <p>Author is required.</p>}
        </div>

        <div className="field">
          <label>Published At</label>
          <input {...register("published_at", { required: true })} />
          {errors.published_at && <p>Published at is required.</p>}
        </div>

        <input type="submit" />
      </form>
    </>
  );
}

export default NewArticle;
