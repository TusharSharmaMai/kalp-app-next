import {
  getSeedPhrase,
  getKeyPairFromSeedPhrase,
  getEnrollmentId,
  createCsr,
} from "kalp-wallet-ts";

export async function createWallet(seeds) {
  var seedPhrase;
  if (seeds) {
    seedPhrase = seeds;
  } else {
    seedPhrase = await getSeedPhrase();
  }
  // console.log("seedPhrase -> ", seedPhrase);

  const keys = await getKeyPairFromSeedPhrase(seedPhrase);
  const pemPublicKey = keys.pemPublicKey;
  const pemPrivateKey = keys.pemPrivateKey;
  // console.log(pemPrivateKey);
  // console.log(pemPublicKey);

  const enrollmentId = await getEnrollmentId(pemPublicKey);
  // console.log("enrollmentId -> ", enrollmentId, "\n");

  const csr = createCsr(enrollmentId, pemPrivateKey, pemPublicKey);
  // console.log(csr);

  const wallet = {
    seed_phrase: seedPhrase,
    enrollment_id: enrollmentId,
    pem_private_key: pemPrivateKey,
    pem_public_key: pemPublicKey,
    csr: csr,
  };
  // console.log(JSON.stringify(wallet));
  return JSON.stringify(wallet);
}

const getWalletChannel = new MessageChannel();
const { port1, port2 } = getWalletChannel;

port1.onmessage = (event) => {
  console.log("Received message:", event.data);
};

export async function getWallet(seeds) {
  const result = await createWallet(seeds);
  port2.postMessage(result);
}

getWallet();
