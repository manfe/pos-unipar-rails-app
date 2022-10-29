import Head from "next/head";
import Image from "next/image";
import Counter from "../src/components/Counter";
import styles from "../styles/Home.module.css";

import { signIn, signOut, useSession, newUser } from "next-auth/react";
import Link from "next/link";
import { Button } from "@mui/material";

export default function Home() {
  const { data: session }  = useSession();

  console.log(session);

  return (
    <>
      <h1 className={styles["title-red"]}>Primeiro Projeto em Next.js</h1>
      {/* <Counter /> */}

      <p>{JSON.stringify(session)}</p>

      {session ? (
        <>
          <Button
            variant="contained"
            color="warning"
            size="small"
            onClick={(e) => {
              e.preventDefault();
              signOut();
            }}
          >
            Sign Out
          </Button>
        </>
      ) : (
        <>
          <Button
            variant="contained"
            color="success"
            size="small"
            onClick={(e) => {
              e.preventDefault();
              signIn();
            }}
          >
            Sign In
          </Button>
          <Button
            variant="contained"
            color="success"
            size="small"
            onClick={(e) => {
              e.preventDefault();
              newUser();
            }}
          >
            Register
          </Button>
        </>
      )}
    </>
  );
}
