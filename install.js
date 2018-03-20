const fs = require('fs');
const path = require('path');
const { exec, spawn } = require('child_process');
const simpleGit = require('simple-git/promise');

const BASE_URL = 'https://github.com/PresenceBot';

const REPOS = [
    'presence-bot-web-app',
    'presence-bot-rest-api',
    'presence_bot_etl',
    'presence-bot-user'
];

REPOS.forEach(repo => {
    const cwd = path.join(__dirname, '..', repo);
    fs.stat(cwd, (err, stats) => {
        if(err) {
            simpleGit('..').clone(`${BASE_URL}/${repo}.git`)
                .then(() => {
                    exec('yarn install', { cwd });
                });
        } else {
            const git = simpleGit(cwd);
            git.pull();
        }
    });
});