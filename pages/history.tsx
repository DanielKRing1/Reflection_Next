import Head from "next/head";
import Link from "next/link";

import styles from "../styles/Home.module.css";

import HistoryList from "../components/pages/history";
import { HOME_PATH } from "../routing/paths";

export default function History() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Journal History</title>
            </Head>

            <main>
                <h1>History View</h1>

                <HistoryList />

                <Link href={HOME_PATH}>Go Back</Link>
            </main>
        </div>
    );
}
