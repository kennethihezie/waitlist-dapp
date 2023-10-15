// import { web3 } from "hardhat";
// const { abi, bytecode } = require('../config')
// import assert from 'assert'


// let accounts: Array<string>
// let contract: any
// const MAX_WAITLIST = 10


// beforeEach(async () => {
//   accounts = await web3.eth.getAccounts()
//   contract = await new web3.eth.Contract(abi)
//   .deploy({ data: bytecode, arguments: [MAX_WAITLIST]})
//   .send({ from: accounts[0], gas: 1000000 })
// })


// describe('Waitlist Contract', async () => {
//   it('deploys contract', async () => {
//     assert.ok(contract.options.address)
//   })

//   it('Joins waitlist', async () => {
//     await contract.methods.joinWaitList().send({ from: accounts[1], gas: 100000 })
//     const getWaitListCount = await contract.methods.numAddressesWhitelisted().call({from: accounts[0] })
//     // console.log(getWaitListCount);
    
//     assert.notEqual(getWaitListCount, "0")
//   })

//   //This test should fail because it exceed the number of users for waitlist
//   it('Can\'t join waitlist', async () => {
//     for(var i = 0; i < 11; i++){
//       await contract.methods.joinWaitList().send({ from: accounts[i], gas: 100000 })
//     }

//     const getWaitListCount = await contract.methods.numAddressesWhitelisted().call({from: accounts[0] })
//     // console.log(getWaitListCount);
    
//     assert.equal(getWaitListCount, "10")
//   })

//   it('Leave waitlist', async () => {
//     await contract.methods.joinWaitList().send({ from: accounts[1], gas: 100000 })
//     const getWaitListCountInitial = await contract.methods.numAddressesWhitelisted().call({from: accounts[0] })
//     // console.log(getWaitListCountInitial);


//     await contract.methods.leaveWaitList().send({ from: accounts[1], gas: 100000 })
//     const getWaitListCount = await contract.methods.numAddressesWhitelisted().call({from: accounts[0] })
//     // console.log(getWaitListCount);

//     assert.notEqual(getWaitListCountInitial, getWaitListCount)
//   })
// })

