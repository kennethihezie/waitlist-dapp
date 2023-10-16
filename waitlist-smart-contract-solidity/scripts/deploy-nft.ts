import { ethers } from "hardhat";
import hre from "hardhat"

const waitlistContractAddress = "0x4d6b94B3044E250679F39Ac3d42D8bAf861224Cc"


async function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
    /*
     DeployContract in ethers.js is an abstraction used to deploy new smart contracts,
     so waitList here is a factory for instances of our Whitelist contract.
     */ 
    // here we deploy the contract
    const nftContract = await ethers.deployContract("CryptoDevs", [waitlistContractAddress])
 
    // Resolve to this Contract once the bytecode has been deployed
    await nftContract.waitForDeployment()
 
    // print the address of the deployed contract
    console.log("Whitelist Contract Address:", nftContract.target);
 
    // Sleep for 30 seconds while Etherscan indexes the new contract deployment
    await sleep(30 * 1000) // 30s = 30 * 1000 milliseconds
 
    // Verify the contract on etherscan
    await hre.run("verify:verify", {
     address: nftContract.target,
     constructorArguments: [waitlistContractAddress]
    })
 }
 // npx hardhat run scripts/deploy-nft.ts --network sepolia
 // Waitlist Contract deployed at: 0x4d6b94B3044E250679F39Ac3d42D8bAf861224Cc
 // Nft contract deployed at: 0xA0b4b4a5f2a6fd79721b194728aDb2D5D50979B7
 
 // We recommend this pattern to be able to use async/await everywhere
 // and properly handle errors.
 main().catch((error) => {
   console.error(error);
   process.exitCode = 1;
 });

