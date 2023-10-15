import { HardhatUserConfig, task } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
// import "@nomiclabs/hardhat-web3"
import dotenv from 'dotenv'

//Configure dotenv
dotenv.config({ path: '.env' })

// task("web3_accounts", "Prints accounts", async (_, { web3 }) => {
//   console.log(await web3.eth.getAccounts());
// });

const QUICKNODE_HTTP_URL = process.env.RPC_URL
const PRIVATE_KEY = process.env.PRIVATE_KEY
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.18",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000000,
      },
    }
  },

  networks: {
    sepolia: {
      url: QUICKNODE_HTTP_URL,
      accounts: [PRIVATE_KEY!]
    }
    // polygon_mumbai: {
    //   url: providerUrl,
    //   accounts: {
    //     mnemonic: memonicPhrase
    //   }
    // }
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY
  }
};

export default config;
