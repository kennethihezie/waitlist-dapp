export const WHITELIST_CONTRACT_ADDRESS = "0xe7d4ce58daFA4B7e3De29D2355B2c99093156660"

export const abi  = [
    {
      "inputs": [
        {
          "internalType": "uint8",
          "name": "_maxWaitListAddress",
          "type": "uint8"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [],
      "name": "joinWaitList",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "leaveWaitList",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "maxWaitListAddress",
      "outputs": [
        {
          "internalType": "uint8",
          "name": "",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "numAddressesWhitelisted",
      "outputs": [
        {
          "internalType": "uint8",
          "name": "",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]