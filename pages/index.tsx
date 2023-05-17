import Head from "next/head";
import Link from "next/link";
import { useReactiveVar } from "@apollo/client";

import FlexCol from "../components/generic/Flex/FlexCol";
import MyText from "../components/generic/Text/MyText";
import Inkling from "../components/pages/home/Inkling";
import Reflecting from "../components/pages/home/Reflecting";

import styles from "../styles/Home.module.css";
import { JournalPhase } from "../utils_ui/journalPhase";
import CreateJournal from "../components/pages/home/CreateJournal";
import { journalPhaseVar } from "../graphql/apollo/local/state/journalPhase";
import BoxShadow from "../components/generic/BoxShadow";

export default function Home() {
    const journalPhase = useReactiveVar(journalPhaseVar);

    return (
        <div className={styles.container}>
            <Head>
                <title>Journal App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <Link href="./history">Go to History</Link>

                <FlexCol>
                    <BoxShadow>
                        <FlexCol
                            style={{
                                width: "70vw",
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
                    </BoxShadow>
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
