const hre = require("hardhat");
const LockContractJson = require("../artifacts/contracts/Lock.sol/Lock.json");
const { getWallet, getGoerliProvider } = require("../utils/utils");
require("dotenv").config({path: __dirname + '/../.env'});

const ONE_GWEI = 1_000_000_000;
const lockedAmount = ONE_GWEI;
const currentTimestampInSeconds = Math.round(Date.now() / 1000);
const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;

async function main() {
  const wallet = getWallet();
  const provider = getGoerliProvider();
  const signer = wallet.connect(provider);

  const contractFactory = await hre.ethers.getContractFactory("Lock");
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