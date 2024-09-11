import Head from "next/head";
import { createWallet } from "@/wallet";

export default function Home() {
  return (
    <>
      <Head>
        <title>Kalp App</title>
      </Head>
      <button onClick={() => createWallet()}>Create Wallet</button>
    </>
  );
}
