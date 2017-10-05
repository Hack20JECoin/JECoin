const http = require('http');
const express = require('express')
const app = express()

const port = 3000;

const options = {
    treatRequest: function(event, repo, ref, data) {
        switch(event) {
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

    }

    console.log(data);
}

app.use('/webhook', require('express-github-hook')(options));

// Set up server options
// const serverOptions = {host: '127.0.0.1', path: '/webhook', port: 3000}
// const githubhookListener = require('githubhook')(serverOptions)

// Start server
// githubhookListener.listen()

// Listen for pull request events on the repo
// githubhookListener.on('pull_request:JECoin', (ref, data) => {
//
//     const action = data.action
//
//     // If PR is merged
//     if (action === 'closed' && data.pull_request.merged === true) {
//
//     }
//
//     console.log(data);
//
// });



app.get('/cheer', () => {
    console.log('cheer');
})

app.listen(port, () => {
    console.log('App is now listening on port 3000');
})
