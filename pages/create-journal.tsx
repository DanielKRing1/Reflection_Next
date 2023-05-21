import Head from "next/head";

import styles from "../styles/Home.module.css";
import CreateJournal from "../components/pages/create-journal/CreateJournal";

export default function History() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Create Journal</title>
            </Head>

            <main>
                <CreateJournal />
            </main>
        </div>
    );
}
