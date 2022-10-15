import { useRouter } from "next/router";

function EditArticle() {
  const router = useRouter()
  const { id } = router.query

  return ( 
    <p>Página de Edição do artigo: {id}</p>
   );
}

export default EditArticle;