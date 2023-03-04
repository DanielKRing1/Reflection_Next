import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { useSelector } from "react-redux";
import MyText from "../components/generic/Text/MyText";
import CreateJournal from "../components/pages/home/CreateJournal";
import Inkling from "../components/pages/home/Inkling";
import InputList from "../components/pages/home/Inkling/InputForm";
import Reflecting from "../components/pages/home/Reflecting";
import { JournalingPhase } from "../redux/journalingPhaseSlice/types";
import { RootState } from "../redux/store";

import styles from "../styles/Home.module.css";

export default function Home() {
  const { journalingPhase } = useSelector(
    (state: RootState) => state.journalingPhaseSlice
  );

  return (
    <div className={styles.container}>
      <Head>
        <title>Journal App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Link href="./history">Go to History</Link>
        {journalingPhase === JournalingPhase.StartUp ||
        journalingPhase === JournalingPhase.Create_Journal ? (
          <CreateJournal />
        ) : journalingPhase === JournalingPhase.Inkling ? (
          <Inkling />
        ) : journalingPhase === JournalingPhase.Reflecting ? (
          <Reflecting />
        ) : (
          <MyText>Idk</MyText>
        )}
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
