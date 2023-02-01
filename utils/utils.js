const ethers =require("ethers");
require("dotenv").config();

const signerMnemonic = process.env.MNEMONIC;
const privateKey = process.env.PRIVATE_KEY;
const goerliUrl = process.env.INFURA_API_URL_BASE;

function getWallet() {
  if (signerMnemonic) {
    return ethers.Wallet.fromMnemonic(signerMnemonic);
  }
  if (privateKey) {
    return new ethers.Wallet(privateKey);
  }
  throw new Error(
    "MNEMONIC or PRIVATE_KEY environment variable must be set to initialize wallet"
  );
}

function getGoerliProvider() {
  if (goerliUrl) {
    return new ethers.providers.JsonRpcProvider(goerliUrl);
  }
  return ethers.providers.getDefaultProvider("goerli");
}

// export the functions
module.exports = { getWallet, getGoerliProvider };