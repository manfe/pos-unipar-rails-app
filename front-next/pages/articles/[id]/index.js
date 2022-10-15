import { useRouter } from "next/router";
import { useEffect } from "react";

function ShowArticle() {
  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    console.log("ROUTE", router)
  }, [])

  return (
    <p>Exibindo o artigo: {id}</p>
  );
}

export default ShowArticle;