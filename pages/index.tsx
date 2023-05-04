import Head from "next/head";
import Link from "next/link";
import { useQuery } from "@apollo/client";

import FlexCol from "../components/generic/Flex/FlexCol";
import MyText from "../components/generic/Text/MyText";
import Inkling from "../components/pages/home/Inkling";
import Reflecting from "../components/pages/home/Reflecting";

import styles from "../styles/Home.module.css";
import { GET_JOURNAL_PHASE } from "../graphql/apollo/local/gql/journalPhase";
import { JournalPhase } from "../utils_ui/journalPhase";
import CreateJournal from "../components/pages/home/CreateJournal";

export default function Home() {
    const {
        data: { journalPhase },
    } = useQuery(GET_JOURNAL_PHASE);

    return (
        <div className={styles.container}>
            <Head>
                <title>Journal App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <Link href="./history">Go to History</Link>

                <FlexCol>
                    <FlexCol
                        style={{
                            width: "70vw",
                            borderWidth: "5rem",
                            border: "solid black",
                            borderRadius: "0.4rem",
                            boxShadow:
                                "inset 0 -3em 3em rgb(0 0 0 / 10%), 0.5em 0.5em 2em rgb(0 0 0 / 30%)",
                        }}
                    >
                        {journalPhase === JournalPhase.Unknown ? (
                            <MyText>Loading</MyText>
                        ) : journalPhase === JournalPhase.CreateJournal ? (
                            <CreateJournal />
                        ) : journalPhase === JournalPhase.Inklings ? (
                            <Inkling />
                        ) : journalPhase === JournalPhase.Reflection ? (
                            <Reflecting />
                        ) : (
                            <MyText>Idk</MyText>
                        )}
                    </FlexCol>
                </FlexCol>
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
