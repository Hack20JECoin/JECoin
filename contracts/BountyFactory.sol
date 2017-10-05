pragma solidity ^0.4.8;

import './Bounty.sol';

contract BountyFactory {
	function newBounty(string githubOwner, string githubRepo, uint pullRequest, string pullRequestOpener) returns (address bountyAddress) {
		Bounty bounty = (new Bounty(githubOwner, githubRepo, pullRequest, pullRequestOpener));
		return address(bounty);
	}
}