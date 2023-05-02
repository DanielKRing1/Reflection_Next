import Head from "next/head";

import styles from "../styles/Home.module.css";
import Login from "../components/pages/login";

export default () => {
    return (
        <div className={styles.container}>
            <Head>
                <title>Login</title>
            </Head>

            <main>
                <Login />
            </main>
        </div>
    );
};
