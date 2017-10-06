pragma solidity ^0.4.8;

// All the data you need to identify a pull request uniquel
contract GithubDetails {
	string githubOwner;
	string githubRepo;
	uint pullRequest;
	string pullRequestOpener;

	function GithubDetails(string _githubOwner, string _githubRepo, uint _pullRequest, string _pullRequestOpener) {
		githubOwner = _githubOwner
		githubRepo = _githubRepo
		pullRequest = _pullRequest
		pullRequestOpener = _pullRequestOpener;
	}

	function match(GithubDetails githubDetails) {
		return githubOwner == githubDetails.githubOwner
			&& githubRepo == githubDetails.githubRepo
			&& pullRequest == githubDetails.pullRequest
			&& pullRequestOpener == githubDetails.pullRequestOpener;
	}
}