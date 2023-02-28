import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import EditableText from "../components/generic/Input/EditableText";
import InputList from "../components/pages/home/InputList";

import styles from "../styles/Home.module.css";

export default function Home() {
  const [value, setValue] = useState("");

  return (
    <div className={styles.container}>
      <Head>
        <title>Journal App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <InputList />
      </main>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{"Asianpersonn"}
          <img src="/vercel.svg" alt="Vercel" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}
