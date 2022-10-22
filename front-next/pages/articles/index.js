import { useEffect, useState } from "react";

// Next
import Link from "next/link";
import { useRouter } from "next/router";

// Libs
import { Button, Grid, Typography } from "@mui/material";
import { toast } from "react-toastify";

// Material Icons
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";

// Internals
import ROUTES from "../../src/config/routes";
import ArticleService from "../../src/services/ArticleService";
import { Container } from "@mui/system";

function ArticleList() {
  const { router } = useRouter();
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const deleteArticle = (article) => {
    var accepted = confirm(`Você realmente gostaria de deletar o artigo: ${article.title}`);
    if (!accepted) return;

    setIsLoading(true);
    ArticleService.destroy(article.id)
      .then((data) => {
        getArticles().then(() => {
          setIsLoading(false);
          toast.success("Article destroyed sucessfully!");
        });
      })
      .catch((e) => {
        setIsLoading(false);
        toast.error(`Erro when destroying article: ${e.message}`);
      });
  };

  const getArticles = async () => {
    let data = await ArticleService.getAll();
    console.log(data);
    setArticles(data);
  };

  useEffect(() => {
    getArticles().then(() => {
      setIsLoading(false);
    });
  }, []);

  if (isLoading) return <p>Carregando....</p>;

  return (
    <Container fluid>
      <Grid container mt={2}>
        <Grid xs={6}>
            <Typography variant="h4">Articles List</Typography>
        </Grid>
        <Grid xs={6}>
          <p>
            <Link
              href={{
                pathname: ROUTES.articles.new,
              }}
            >
              <Button variant="contained" color="success" size="small" startIcon={<DeleteForeverIcon fontSize="small" />}>
                New Article
              </Button>
            </Link>
          </p>
        </Grid>
        <Grid xs={12}>
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
                        <Button variant="contained" size="small">
                          <VisibilityIcon fontSize="small" />
                        </Button>
                      </Link>
                      <Link
                        href={{
                          pathname: ROUTES.articles.edit,
                          query: {
                            id: article.id,
                          },
                        }}
                      >
                        <Button variant="contained" color="warning" size="small">
                          <EditIcon fontSize="small" />
                        </Button>
                      </Link>
                      <Button variant="contained" color="error" size="small" onClick={() => deleteArticle(article)}>
                        <DeleteForeverIcon fontSize="small" />
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ArticleList;
