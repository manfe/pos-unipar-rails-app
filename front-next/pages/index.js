import Head from 'next/head'
import Image from 'next/image'
import Counter from '../src/components/Counter'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <>
      <h1 className={styles['title-red']}>Primeiro Projeto em Next.js</h1>
      <Counter />
    </>
  )
}
