pragma solidity ^0.4.8;



// All the data you need to identify a pull request uniquel
contract GithubDetails {
	string public githubOwner;
	string public githubRepo;
	uint public pullRequest;
	string public pullRequestOpener;

	function GithubDetails(string _githubOwner, string _githubRepo, uint _pullRequest, string _pullRequestOpener) {
		githubOwner = _githubOwner;
		githubRepo = _githubRepo;
		pullRequest = _pullRequest;
		pullRequestOpener = _pullRequestOpener;
	}

	function stringsEqual(string storage _a, string memory _b) internal returns (bool) {
		bytes storage a = bytes(_a);
		bytes memory b = bytes(_b);
		if (a.length != b.length)
			return false;
		// @todo unroll this loop
		for (uint i = 0; i < a.length; i ++) {
			if (a[i] != b[i]) {
				return false;
            }
        }
		return true;
	}

	function isEquivalent(string _githubOwner, string _githubRepo, uint _pullRequest, string _pullRequestOpener) returns (bool equivalent) {
		return (
			stringsEqual(githubOwner, _githubOwner) && stringsEqual(githubRepo, _githubRepo) && pullRequest == _pullRequest && stringsEqual(pullRequestOpener, _pullRequestOpener)
			);
	}
}