pragma solidity ^0.4.8;

import './Bounty.sol';
import './GithubDetails.sol';

contract BountyFactory {
	function newBounty(GithubDetails githubDetails) returns (address bountyAddress) {
		Bounty bounty = (new Bounty(githubDetails));
		return address(bounty);
	}
}