import { web3 } from "hardhat";
const { abi, bytecode } = require('../config')
const MAX_WAITLIST = 10


async function main() {
  const accounts = await web3.eth.getAccounts()
  
  const result = await new web3.eth.Contract(abi)
       .deploy({ data: bytecode, arguments: [MAX_WAITLIST] })
       .send({ gas: 10000000, from: accounts[0] })

       console.log('Contracts deployed at: ' + result.options.address);
}

//Contracts deployed at: 0xe7d4ce58daFA4B7e3De29D2355B2c99093156660

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
