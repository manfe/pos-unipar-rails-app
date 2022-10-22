import { useEffect, useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0)

  const incrementar = () => {
    setCount(count + 1) // execução assícrona!
  }

  const decrementar = () => {
    setCount(count - 1) // execução assícrona!
  }

  useEffect(() => {
    console.log("count alterado:", count)
  }, [count])

  // SOMENTE NO PRIMEIRO RENDER
  useEffect(() => {
    console.log("FUNÇÕES A SEREM EXECUTADAS SOMENTE QUANDO O COMPONENTE É RENDERIZADO PELA PRIMEIRA VEZ!")
  }, [])

  return (
    <>
      <p>Contador: {count}</p>
      <button onClick={incrementar}>+1</button>
      <button onClick={decrementar}>-1</button>
    </>
  )
}