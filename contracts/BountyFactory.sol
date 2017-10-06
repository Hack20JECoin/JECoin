pragma solidity ^0.4.8;

import './Bounty.sol';
import './GithubDetails.sol';

contract BountyFactory {
	address _coinAddress;
	function newBounty(address coinAddress, GithubDetails githubDetails) returns (address bountyAddress) {
		_coinAddress = coinAddress;
		Bounty bounty = (new Bounty(coinAddress, githubDetails));
		return address(bounty);
	}
}