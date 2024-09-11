import Head from "next/head";
import { createWallet } from "@/wallet";

export default function Home() {
  return (
    <>
      <Head>
        <title>Kalp App</title>
      </Head>
      <div id="app">
        <p>Hello from Kalp Wallet</p>
        <button onClick={() => createWallet()}>Create Wallet</button>
      </div>
    </>
  );
}
