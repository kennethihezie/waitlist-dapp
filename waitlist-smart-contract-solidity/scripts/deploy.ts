import { ethers } from "hardhat";
import hre from "hardhat"

const MAX_WAITLIST = 10

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
   /*
    DeployContract in ethers.js is an abstraction used to deploy new smart contracts,
    so waitList here is a factory for instances of our Whitelist contract.
    */

   //Get signers
   const [deployer] = await ethers.getSigners()
   console.log("Deploying contracts with the account:", deployer.address);

   // here we deploy the contract
   const waitListContract = await ethers.deployContract("Waitlist", [MAX_WAITLIST])

   // Resolve to this Contract once the bytecode has been deployed
   await waitListContract.waitForDeployment()

   // print the address of the deployed contract
   console.log("Whitelist Contract Address:", waitListContract.target);

   // Sleep for 30 seconds while Etherscan indexes the new contract deployment
   await sleep(30 * 1000) // 30s = 30 * 1000 milliseconds

   // Verify the contract on etherscan
   await hre.run("verify:verify", {
    address: waitListContract.target,
    constructorArguments: [MAX_WAITLIST]
   })
}
// npx hardhat run scripts/deploy.ts --network sepolia
// Contracts deployed at: 0x4d6b94B3044E250679F39Ac3d42D8bAf861224Cc

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// continue from Adding users to the whitelist

