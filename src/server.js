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

app.get('/cheer', () => {
    console.log('cheer');
})

app.listen(port, () => {
    console.log('App is now listening on port 3000');
})
