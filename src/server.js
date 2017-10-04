const http = require('http');

// Set up server options
const serverOptions = {host: '127.0.0.1', path: '/webhook', port: 3000}
const githubhookListener = require('githubhook')(serverOptions)

// Start server
githubhookListener.listen()

// Listen for pull request events on the repo
githubhookListener.on('pull_request:JECoin', (ref, data) => {

    const action = data.action

    // If PR is merged
    if (action === 'closed' && data.pull_request.merged === true) {

    }

    console.log(data);

});
