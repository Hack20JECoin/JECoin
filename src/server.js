// Set up web3
var Web3 = require('web3');
var web3 = new Web3();
var provider = web3.setProvider(new Web3.providers.HttpProvider("http://localhost:8545"));
// web3.eth.defaultAccount=web3.eth.accounts[0]

// Set up contracts
const TruffleContract = require('truffle-contract');

const CoordinatorContract = require('../build/contracts/Coordinator.json')
const JECoinContract = require('../build/contracts/JECoin.json')

const Coordinator = TruffleContract(CoordinatorContract);
const JECoin = TruffleContract(JECoinContract);

JECoin.setProvider(web3.currentProvider)
Coordinator.setProvider(web3.currentProvider)

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

// Coordinator.currentProvider.sendAsync = function () {
//     return Coordinator.currentProvider.send.apply(Coordinator.currentProvider, arguments);
// };
//
// JECoin.currentProvider.sendAsync = function () {
//     return JECoin.currentProvider.send.apply(JECoin.currentProvider, arguments);
// };

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

    // If PR is merged
    if (action === 'closed' && data.pull_request.merged === true) {

        // Get the relevant address for the PR, send the funds from it to the PR creator

    }

    if (action === 'opened') {

        // Get new instance of Cheer from deployed CheerFactory

    }

    console.log(data);
}

app.use('/webhook', require('express-github-hook')(options));

app.get('/cheer', () => {
    console.log('cheer');
})

app.get('/prbounty', cors(), (req, res, next) => {
    const params = req.query;
    Coordinator.at('0x742e82e5cc14ed9813513f1357cbe047acca4f71').then(coordinator => {
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
