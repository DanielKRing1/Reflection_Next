import Head from "next/head";
import Link from "next/link";

import styles from "../styles/Home.module.css";

import HistoryList from "../components/pages/history";

export default function History() {
  return (
    <div className={styles.container}>
      <Head>
        <title>First Post</title>
      </Head>

      <main>
        <h1>History View</h1>

        <HistoryList />

        <Link href="/">Go Back</Link>
      </main>
    </div>
  );
}
