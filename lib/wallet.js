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

  const keys = await getKeyPairFromSeedPhrase(seedPhrase);
  const pemPublicKey = keys.pemPublicKey;
  const pemPrivateKey = keys.pemPrivateKey;

  const enrollmentId = await getEnrollmentId(pemPublicKey);

  const csr = createCsr(enrollmentId, pemPrivateKey, pemPublicKey);

  const wallet = {
    seed_phrase: seedPhrase,
    enrollment_id: enrollmentId,
    pem_private_key: pemPrivateKey,
    pem_public_key: pemPublicKey,
    csr: csr,
  };
  console.log(JSON.stringify(wallet));
  return JSON.stringify(wallet);
}
