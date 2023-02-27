import Head from "next/head";
import Link from "next/link";

export default function History() {
  return (
    <>
      <Head>
        <title>First Post</title>
      </Head>

      <h1>History View</h1>
      <Link href="/">Go Back</Link>
    </>
  );
}
