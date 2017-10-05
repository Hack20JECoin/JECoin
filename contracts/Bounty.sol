pragma solidity ^0.4.8;

import './JECoin.sol';

contract Bounty {
	JECoin coin;
	address owner = msg.sender;
	address payee;
	uint creationTime = now;
	GithubDetails githubDetails;
	bool complete = false; // could be true if pr merged but payee not known

	struct GithubDetails {
		string githubOwner;
		string githubRepo;
		uint pullRequest;
		string pullRequestOpener;
	}

	function Bounty(address JECoinAddress, string githubOwner, string githubRepo, uint pullRequest, string pullRequestOpener) {
		coin = JECoin(JECoinAddress);
		githubDetails = GithubDetails(githubOwner, githubRepo, pullRequest, pullRequestOpener);
	}

	function fund() payable external returns (bool success) {
		// add funds to the bounty
	}

	function finish() {
		complete = true;
	}

	function execute() returns (bool success) {
		if (!complete) {
			return false;
		}
		// send funds to payee
		// fail if payee address not known
		// remove self from Coordinator.bounties?
		// destroy self once completed succesfully:
		return true;
	}

	function kill() {
		selfdestruct(owner);
	}
}