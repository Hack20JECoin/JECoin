pragma solidity ^0.4.8;

import './JECoin.sol';
import './GithubDetails.sol';

contract Bounty {
	JECoin coin;
	address payee;
	uint creationTime = now;
	GithubDetails githubDetails;
	bool complete = false; // could be true if pr merged but payee not known

	function Bounty(GithubDetails _githubDetails) {
		coin = JECoin(JECoinAddress);
		githubDetails = _githubDetails;
	}

	function balance() returns (uint bountyBalance) {
		return coin.balanceOf(address(this));
	}

	function finish() {
		complete = true;
	}

	function kill(address payout) {
		selfdestruct(payout);
	}

	function() payable external returns (bool success) {
		// TODO  add funds to the bounty?
	}
}