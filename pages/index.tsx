import styled from "styled-components";
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

                <FramingDiv>
                    <CenteredDiv>
                        <BoxShadow>
                            <FlexCol width="100%">
                                {journalPhase === JournalPhase.Unknown ? (
                                    <MyText>Loading</MyText>
                                ) : journalPhase ===
                                  JournalPhase.CreateJournal ? (
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
                    </CenteredDiv>
                </FramingDiv>
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

const FramingDiv = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
`;

const CenteredDiv = styled(FlexCol)`
    width: 70%;

    border-width: 5rem;
    border: solid black;
    border-radius: 0.4rem;
`;
