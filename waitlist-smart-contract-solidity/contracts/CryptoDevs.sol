// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./Waitlist.sol";

contract CryptoDevs is ERC721Enumerable, Ownable {
    //  _price is the price of one Crypto Dev NFT
    uint256 constant public _price = 0.01 ether;

    // Max number of CryptoDevs that can ever exist
    uint256 constant public _maxTokenIds = 20;

    // Waitlist contract instance
    Waitlist waitlist;

    // Number of tokens reserved for whitelisted members
    uint256 public reservedTokens;
    uint256 public reservedTokenClaimed = 0;

    /**
      * @dev ERC721 constructor takes in a `name` and a `symbol` to the token collection.
      * name in our case is `Crypto Devs` and symbol is `CD`.
      * Constructor for Crypto Devs takes in the baseURI to set _baseTokenURI for the collection.
      * It also initializes an instance of whitelist interface.
      */

     constructor(address waitlistCOntract) ERC721("Crypto Devs", "CD") {
        waitlist = Waitlist(waitlistCOntract);
        reservedTokens = waitlist.maxWaitListAddress();
     }

     modifier _reservedSpaceForWaitlist {
        // Make sure we always leave enough room for whitelist reservations
        require(totalSupply() + reservedTokens - reservedTokenClaimed < _maxTokenIds, "Exceed max supply");
        _;
     }

     modifier _isUserPartOfWaitlist {
        // If user is part of the whitelist, make sure there is still reserved tokens left
        if(waitlist.whitelistedAddresses(msg.sender) && msg.value < _price){
            // Make sure user doesn't already own an NFT
            require(balanceOf(msg.sender) == 0, "Already owned");
        } else {
           // If user is not part of the whitelist, make sure they have sent enough ETH
           require(msg.value >= _price, "Not enough ether");
        }
        _;
     }

     function mint() public payable _reservedSpaceForWaitlist _isUserPartOfWaitlist  {
        uint256 tokenId = totalSupply();
        _safeMint(msg.sender, tokenId);
     }

     /**
      * @dev withdraw sends all the ether in the contract
      * to the owner of the contract
      */
     function withdraw() public payable onlyOwner {
        address _owner = owner();
        uint256 amount = address(this).balance;
        (bool sent, ) = _owner.call{value: amount}("");
        require(sent, "Failed to send ether");
     }

}