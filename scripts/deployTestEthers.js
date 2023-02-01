
/*
This script uses the raw ethers library directly i.e. it does NOT use the Hardhat Runtime Environment version of ethers. THis means you 
can NOT execute it with:
"npx hardhat run <script name> --network <network name>"

You must execute it with:
"node <script name>"
*/

const ethers = require("ethers"); // note this is the RAW ethers library, not the one in HRE
const LockContractJson = require("../artifacts/contracts/Lock.sol/Lock.json");
const { getWallet } = require("../utils/utils");
require("dotenv").config({path: __dirname + '/../.env'});

const ONE_GWEI = 1_000_000_000;
const lockedAmount = ONE_GWEI;
const currentTimestampInSeconds = Math.round(Date.now() / 1000);
const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;
const goerliUrl = process.env.GOERLI_URL;

function getGoerliProvider() {
    if (goerliUrl) {
      return new ethers.providers.JsonRpcProvider(goerliUrl);
    }
    return ethers.providers.getDefaultProvider("goerli");
  }

async function main() {
  const wallet = getWallet();
  const provider = getGoerliProvider();
  console.log(`provider: ${provider}`)
  const signer = wallet.connect(provider);

  const contractFactory = await new ethers.ContractFactory(LockContractJson.abi, LockContractJson.bytecode, signer);
  const LockContract = await contractFactory.deploy(unlockTime, { value: lockedAmount });
  await LockContract.deployed();

  console.log(`Contract deployed with address: ${LockContract.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});