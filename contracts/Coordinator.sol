pragma solidity ^0.4.8;
import './JECoin.sol';

contract Coordinator {

	// All usernames known to the system, either with or without a wallet address
	struct Usernames {
		mapping(string => address) accounts;
		mapping(string => bool) registered;
	}
	Usernames private usernames;

	// Username => bounties that would pay them, including usernames whose address is unknown
	mapping(string => address[]) private bounties;

	// Associate a username with an address
	function register(string username) payable external returns (bool success) { // does this need to be payable for users to send a tx to it?
		// can we get username from data instead?
		usernames.accounts[username] = msg.sender;
		usernames.registered[username] = true;
		// return the money?

	}

	// Returns 0x0 if not registered
	function addressOf(string username) constant external returns (address a) {
		return usernames.accounts[username];
	}

	// Update a username
	function change(string oldUsername, string newUsername) external returns (bool success) {
		if (usernames.accounts[oldUsername] == address(0x0)) {
			return false;
		}
		usernames.accounts[newUsername] = usernames.accounts[oldUsername];
		usernames.accounts[oldUsername] = address(0x0);
		return true;
	}

	// Disassociate an address to a username
	function remove(string username) external {
		usernames.accounts[username] = address(0x0);
		usernames.registered[username] = false;
	}

	function executeUnpaidBounties(string username) {
		address[] bountyAddresses = bounties[username];
		for (uint i = 0; i < bountyAddresses.length; i++) {
			address bounty = bountyAddresses[i];
			// access the bounty at this address
			// check if it has completed
		}
	}

}