import Head from "next/head";
import Link from "next/link";
import { useReactiveVar } from "@apollo/client";

import MyText from "../components/generic/Text/MyText";
import Inkling from "../components/pages/home/Inkling";
import Reflecting from "../components/pages/home/Reflecting";

import styles from "../styles/Home.module.css";
import { JournalPhase } from "../utils_ui/journalPhase";
import { journalPhaseVar } from "../graphql/apollo/local/state/journalPhase";
import CenteredColumn from "../components/generic/Container/CenteredColumn";
import { useEffect } from "react";

import useProtectedRouter from "../hooks/useProtectedRouter";
import { CREATE_JOURNAL_PATH, HISTORY_PATH } from "../routing/paths";

export default function Home() {
    // ROUTER
    const router = useProtectedRouter();

    // LOCAL GQL
    const journalPhase = useReactiveVar(journalPhaseVar);

    useEffect(() => {
        if (journalPhase === JournalPhase.MustCreateJournal)
            router.push(CREATE_JOURNAL_PATH);
    }, [journalPhase]);

    return (
        <div className={styles.container}>
            <Head>
                <title>Journal App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <CenteredColumn>
                    {journalPhase === JournalPhase.Unknown ? (
                        <MyText>Loading</MyText>
                    ) : journalPhase === JournalPhase.Inklings ? (
                        <Inkling />
                    ) : journalPhase === JournalPhase.Reflection ? (
                        <Reflecting />
                    ) : (
                        <MyText>Idk</MyText>
                    )}
                </CenteredColumn>
            </main>

            <footer>
                <a
                    href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Powered by{"Asianpersonn"}
                    <img
                        src="/vercel.svg"
                        alt="Vercel"
                        className={styles.logo}
                    />
                </a>
            </footer>
        </div>
    );
}
