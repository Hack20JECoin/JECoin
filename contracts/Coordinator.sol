pragma solidity ^0.4.8;

import './JECoin.sol';
import './BountyFactory.sol';

contract Coordinator {
	BountyFactory bountyFactory;

	// All usernames known to the system, either with or without a wallet address
	struct Usernames {
		mapping(string => address) accounts;
		mapping(string => bool) registered;
	}
	Usernames private usernames;

	// Username => bounties that would pay them, including usernames whose address is unknown
	mapping(string => address[]) private bounties;

	// Inject the addresses of the deployed dependencies
	function Coordinator(address JECoinAddress, address bountyFactoryAddress) {
		coin = JECoin(JECoinAddress);
		bountyFactory = BountyFactory(bountyFactoryAddress);
	}

	// Associate a username with an address - user sends JECoin to this in order to register their git name
	function register(string username) payable external returns (bool success) { // does this need to be payable for users to send a tx to it?
		// can we get username from data instead?
		usernames.accounts[username] = msg.sender;
		usernames.registered[username] = true;
		executeUnpaidBounties(username);
		// return the money?

	}

	// Update a username
	function changeUsername(string oldUsername, string newUsername) payable external returns (bool success) {
		// msg.data?
		if (usernames.accounts[oldUsername] == address(0x0)) {
			return false;
		}
		usernames.accounts[newUsername] = usernames.accounts[oldUsername];
		usernames.accounts[oldUsername] = address(0x0);
		return true;
	}

	// Returns 0x0 if not registered
	function addressOf(string username) constant returns (address a) {
		return usernames.accounts[username];
	}

	// Disassociate an address to a username
	function remove(string username) external {
		usernames.accounts[username] = address(0x0);
		usernames.registered[username] = false;
	}

	// Called by the server when PR is created
	function createBounty() external {
		msg.data;
		string username = msg.data. ; // ?
		Bounty bounty = bountyFactory.newBounty(...)
		bounties[username] = bounty;
	}

	// Called by the server when PR is merged
	function executeBountyOnMerge() external {
		msg.data; // TODO determine which bounty we care about
		bounty.finish();
		executeBounty(bounty)
	}

	// When a username is registered, we should check if they have unpaid bounties to claim
	function executeUnpaidBounties(string username) {
		address[] bountyAddresses = bounties[username];
		for (uint i = 0; i < bountyAddresses.length; i++) {
			Bounty bounty = Bounty(bountyAddresses[i]);
			executeBounty(bounty);
		}
	}

	function executeBounty(Bounty bounty) returns (bool success) {
		bounty.execute();
		bounty.kill();
	}
}