import Head from "next/head";
import Link from "next/link";

import styles from "../styles/Home.module.css";

export default function Login() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Login</title>
            </Head>

            <main>
                <h1>Login View</h1>

                <input placeholder="Username..." />
                <input placeholder="Password..." />

                <h1>SignUp View</h1>

                <input placeholder="Username..." />
                <input placeholder="Password..." />

                <Link href="/">Go Back</Link>
            </main>
        </div>
    );
}
