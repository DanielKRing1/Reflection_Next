import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { useSelector } from "react-redux";
import MyText from "../components/generic/Text/MyText";
import InputList from "../components/pages/home/InputList";
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
          <MyText>Create Journal</MyText>
        ) : journalingPhase === JournalingPhase.Inkling ? (
          <InputList />
        ) : journalingPhase === JournalingPhase.Reflecting ? (
          <MyText>Reflecting</MyText>
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
