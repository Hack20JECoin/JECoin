pragma solidity ^0.4.8;

contract Bounty {
	address public owner = msg.sender;
	address public payee;
	uint public creationTime = now;
	GithubDetails githubDetails;
	bool complete = false; // could be true if pr merged but payee not known

	struct GithubDetails {
		string githubOwner;
		string githubRepo;
		uint pullRequest;
		string pullRequestOpener;
	}

	function Bounty(string githubOwner, string githubRepo, uint pullRequest, string pullRequestOpener) {
		owner = msg.sender;
		githubDetails = GithubDetails(githubOwner, githubRepo, pullRequest, pullRequestOpener);
	}

	function fund() payable public returns (bool success) {
		// add funds to the bounty
	}

	function execute() {
		// send funds to payee
		// fail if payee address not known
		// remove self from Coordinator.bounties?
		// destroy self once completed succesfully:
		selfdestruct(owner);
	}
}