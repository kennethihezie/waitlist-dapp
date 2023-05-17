import { HardhatUserConfig, task } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-web3"
import dotenv from 'dotenv'

//Configure dotenv
dotenv.config({ path: '.env' })

task("web3_accounts", "Prints accounts", async (_, { web3 }) => {
  console.log(await web3.eth.getAccounts());
});

const memonicPhrase = process.env.MEMONIC
const providerUrl = process.env.PROVIDER_URL

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
    polygon_mumbai: {
      url: providerUrl,
      accounts: {
        mnemonic: memonicPhrase
      }
    }
  },
};

export default config;
