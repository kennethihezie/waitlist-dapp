// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Waitlist {
    uint8 public maxWaitListAddress;
    uint8 public numAddressesWhitelisted;
    mapping (address => bool) whitelistedAddresses;

    constructor(uint8 _maxWaitListAddress) {
        maxWaitListAddress = _maxWaitListAddress;
    }

    modifier _checkIfAddressIsInWaitList() {
        require(!whitelistedAddresses[msg.sender], "Address is already in waitlist");
        _;
    }

    modifier _checkIfWaitListIsFull() {
        require(numAddressesWhitelisted < maxWaitListAddress, "WaitList is full");
        _;
    }

    function joinWaitList() public _checkIfWaitListIsFull _checkIfAddressIsInWaitList {
        whitelistedAddresses[msg.sender] = true;
        numAddressesWhitelisted++;
    }

    function leaveWaitList() public {
         whitelistedAddresses[msg.sender] = false;
         numAddressesWhitelisted--;
    }
}
