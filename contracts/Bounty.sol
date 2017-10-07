pragma solidity ^0.4.8;

import './JECoin.sol';
import './GithubDetails.sol';

contract Bounty {
	JECoin coin;
	address public payee;
	uint creationTime = now;
	GithubDetails public githubDetails;
	bool public complete = false; // could be true if pr merged but payee not known

	function Bounty(address coinAddress, GithubDetails _githubDetails) {
		coin = JECoin(coinAddress);
		githubDetails = _githubDetails;
	}

	function bountyBalance() returns (uint _bountyBalance) {
		return coin.balanceOf(address(this));
	}

	function finish() {
		complete = true;
	}

	function kill(address payout) {
		selfdestruct(payout);
	}

	function setPayee(address newPayee) {
		payee = newPayee;
	}

	function setGithubDetails(GithubDetails newGithubDetails) {
		githubDetails = newGithubDetails;
	}
}
