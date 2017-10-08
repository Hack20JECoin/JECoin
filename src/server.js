// Set up web3
var Web3 = require('web3');
var web3 = new Web3();
var provider = web3.setProvider(new Web3.providers.HttpProvider("http://localhost:8545"));
// web3.eth.defaultAccount=web3.eth.accounts[0]

const coordinatorAddress = '0xff87c1fb8008cff772ed0ecc561f3c56e1b8b086'

// Set up contracts
const TruffleContract = require('truffle-contract');

const CoordinatorContract = require('../build/contracts/Coordinator.json')
const JECoinContract = require('../build/contracts/JECoin.json')

const Coordinator = TruffleContract(CoordinatorContract);
const JECoin = TruffleContract(JECoinContract);

JECoin.setProvider(web3.currentProvider)
Coordinator.setProvider(web3.currentProvider)

web3.eth.defaultAccount = web3.eth.coinbase;

if (typeof JECoin.currentProvider.sendAsync !== "function") {
    JECoin.currentProvider.sendAsync = function() {
        return JECoin.currentProvider.send.apply(JECoin.currentProvider, arguments);
    };
}
if (typeof Coordinator.currentProvider.sendAsync !== "function") {
    Coordinator.currentProvider.sendAsync = function() {
        return Coordinator.currentProvider.send.apply(Coordinator.currentProvider, arguments);
    };
}

// Other dependencies
const http = require('http');
const express = require('express')
const cors = require('cors')
const app = express()

const port = 3000;

const options = {
    treatRequest: function(event, repo, ref, data) {
        switch (event) {
            case 'pull_request':
                processEvent(repo, ref, data);
                break;
        }
    }
}

function processEvent(repo, ref, data) {
    const action = data.action
    const repoName = data.repository.name
    const repoOwner = data.repository.owner.login
    const pullRequestNumber = data.pull_request.number
    const pullRequestAuthor = data.pull_request.user.login
    const isMerged = data.pull_request.merged

    console.log(repoName)
    console.log(repoOwner)
    console.log(pullRequestNumber)
    console.log(pullRequestAuthor)

    // If PR is merged
    if (action === 'closed' && isMerged === true) {

        // Get the relevant address for the PR, send the funds from it to the PR creator

    }

    if (action === 'opened' || action === 'reopened') {

        Coordinator.at(coordinatorAddress).then(coordinator => {
            coordinator.createBounty.call(repoOwner, repoName, pullRequestNumber, pullRequestAuthor)
            .then(() => console.log('Successfully created bounty'))
            .catch(err => console.log(`Error: ${err}`));
        })
        .catch(err => {
            console.log(err);
        });
    }

    // console.log(data);
}

app.use('/webhook', require('express-github-hook')(options));

app.get('/cheer', () => {
    console.log('cheer');
})

app.get('/prbounty', cors(), (req, res, next) => {
    const params = req.query;
    Coordinator.at(coordinatorAddress).then(coordinator => {
        coordinator.getBounty.call(params.org, params.repo, params.prno, params.author).then(bountyAddress => {
            JECoin.at('0x1bd22fde3ddd123e2f8b82a6b96f3f94bb1e1104').then(coinContract => {
                coinContract.balanceOf.call(bountyAddress).then(balance => {
                    res.json({amount: balance, address: bountyAddress})
                }).catch(err => {
                    console.log(err);
                    res.status(500).send({err: err})
                });
            }).catch(err => {
                console.log(err);
                res.status(500).send({err: err})
            });
        })

    }).catch(err => {
        console.log(err)
        res.status(500).send({err: err})
    });
})

app.listen(port, () => {
    console.log('App is now listening on port 3000');
})
