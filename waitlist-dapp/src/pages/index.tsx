import { Component, ReactNode, useEffect, useRef, useState } from "react"
import Button from "../../components/button/button"
import Card from "../../components/card/card"
import Content from "../../components/content/content"
import CustomImage from "../../components/image/image"
import web3 from "../../web3/blockchains/ethereum"
import Web3Modal, { ICoreOptions } from "web3modal";
import { providers, Contract } from "ethers";
import { abi, WHITELIST_CONTRACT_ADDRESS } from "../../web3/abi/ethereum_abi"


interface IProps {
  waitListAddresses: string
}



export default function HomePage() {
    const [walletConnected, setWalletConnected] = useState(false)
    const [joinedWaitlist, setJoinedWaitlist] = useState(false)
    const [loading, setLoading] = useState(false)
    const [numberOfWhitelisted, setNumberOfWhitelisted] = useState(0)
    // Create a reference to the Web3 Modal (used for connecting 
    // to Metamask) which persists as long as the page is open
    const web3ModalRef = useRef(undefined)

    /**
   * Returns a Provider or Signer object representing the Ethereum RPC with or without the
   * signing capabilities of metamask attached
   *
   * A `Provider` is needed to interact with the blockchain - reading transactions, reading balances, reading state, etc.
   *
   * A `Signer` is a special type of Provider used in case a `write` transaction needs to be made to the blockchain, which involves the connected account
   * needing to make a digital signature to authorize the transaction being sent. Metamask exposes a Signer API to allow your website to
   * request signatures from the user using Signer functions.
   *
   * @param {*} needSigner - True if you need the signer, default false otherwise
   */

     const getProviderOrSigner = async (needSigner = false) => {
         // Connect to Metamask
         // Since we store `web3Modal` as a reference, we need to
         // access the `current` value to get access to the underlying
         // object

         //@ts-ignore
         const provider = await web3ModalRef.current.connect()
         const web3Provider = new providers.Web3Provider(provider)

        // If user is not connected to the Goerli network, let them know and throw an error
        // const { chainId } = await web3Provider.getNetwork();
        // if (chainId !== 5) {
        //  window.alert("Change the network to Goerli");
        //  throw new Error("Change network to Goerli");
        // }

        if(needSigner){
          const signer = web3Provider.getSigner()
          return signer
        }

        return web3Provider
     }

    /**
    * addAddressToWhitelist: Adds the current connected address to the whitelist
    */
    
    const addAddressToWhitelist = async () =>  {
      try{
          // We need a Signer here since this is a 'write' transaction.
          const signer = await getProviderOrSigner(true)
          // Create a new instance of the Contract with a Signer, which allows
          // update methods
          const whiteListContract = new Contract(WHITELIST_CONTRACT_ADDRESS, abi, signer)

          //call the joinWaitList from the contract
          const tx = await whiteListContract.joinWaitList()
          setLoading(true)
          //wait for the transaction to get mined
          await tx.wait()
          // get the updated number of addresses in the whitelist
          await getNumberOfWhitelisted()
          setJoinedWaitlist(true)
      } catch(err) {
        console.error(err);
      }
    }

    /**
   * getNumberOfWhitelisted:  gets the number of whitelisted addresses
   */
    const getNumberOfWhitelisted = async () => {
      try{
        // Get the provider from web3Modal, which in our case is MetaMask
        // No need for the Signer here, as we are only reading state from the blockchain
        const provider = await getProviderOrSigner()
        // We connect to the Contract using a Provider, so we will only
        // have read-only access to the Contract

        const whiteListContract = new Contract(WHITELIST_CONTRACT_ADDRESS, abi, provider)
        // call the numAddressesWhitelisted from the contract
        const _numberOfWhitelisted = await whiteListContract.numAddressesWhitelisted()
        setNumberOfWhitelisted(_numberOfWhitelisted)
      } catch(err) {
        console.error(err);
      }
    }

    /**
   * checkIfAddressInWhitelist: Checks if the address is in whitelist
   */
    const checkIfAddressInWhitelist = async () => {
      try {
        // We will need the signer later to get the user's address
        // Even though it is a read transaction, since Signers are just special kinds of Providers,
        // We can use it in it's place
        const signer = await getProviderOrSigner(true) as providers.JsonRpcSigner
        const whiteListContract = new Contract(WHITELIST_CONTRACT_ADDRESS, abi, signer)
        // Get the address associated to the signer which is connected to  MetaMask
        const address = await signer.getAddress()
        const _joinedWhiteList = await whiteListContract.whitelistedAddresses(address)
        setJoinedWaitlist(_joinedWhiteList)
      } catch (error) {
        console.error(error);
      }
    }

    /*
    connectWallet: Connects the MetaMask wallet
    */
   const connectWallet = async () => {
    try {
      // Get the provider from web3Modal, which in our case is MetaMask
      // When used for the first time, it prompts the user to connect their wallet
      await getProviderOrSigner()
      setWalletConnected(true)
      checkIfAddressInWhitelist()
      getNumberOfWhitelisted()
    } catch (error) {
      console.error(error);
    }
   }

   
      // useEffects are used to react to changes in state of the website
      // The array at the end of function call represents what state changes will trigger this effect
      // In this case, whenever the value of `walletConnected` changes - this effect will be called
      useEffect(() => {
          // if wallet is not connected, create a new instance of Web3Modal and connect the MetaMask wallet
          if(!walletConnected){
            // Assign the Web3Modal class to the reference object by setting it's `current` value
            // The `current` value is persisted throughout as long as this page is open
            // @ts-ignore
            web3ModalRef.current = new Web3Modal({
              network: 'mubai',
              providerOptions: {},
              disableInjectedProvider: false
            })

            connectWallet()
          }

      }, [walletConnected])

      return (
        <div className="flex flex-col space-y-8 items-center mt-16">
        <Card>
          <Content
            count={numberOfWhitelisted.toString()}
            title="Welcome to ethereum waitlist"
            subTitle="join now to claim amazing airdrop tokens"
            >

          <Button
            loading={loading}
            text={joinedWaitlist ? "Leave the ethereum waitlist" : "Join the ethereum waitlist"}
            onclick={connectWallet}/>

          </Content>

           <CustomImage
           path="images/crypto-devs.svg"/>
        </Card>

        {/* <Card>
          <Content
            count={waitListAddresses}
            title="Welcome to stacks waitlist   "
            subTitle="join now to claim amazing airdrop tokens"
            >

          <Button
            loading={stx_loading}
            text="Join the stacks waitlist"
            onclick={ this.joinStacksWaitList }/>

          </Content>

           <CustomImage
           path="images/crypto-devs.svg"/>
        </Card> */}
        </div>
      )
}

// Using getStaticProps method to preload our data. 
// If you want to know more please refer to your nextjs blog project. 
// export async function getStaticProps() {
//   const waitListAddresses = await ethereum_abi.methods.numAddressesWhitelisted().call()
//   return {
//     props: { waitListAddresses }
//   }
// }