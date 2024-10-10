import Head from "next/head";
import { createWallet, getWallet } from "@/lib/wallet";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    window.createWallet = createWallet;
  }, []);
  useEffect(() => {
    window.getWallet = getWallet;
  }, []);
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
