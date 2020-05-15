var fetch = require('node-fetch');
const redis = require("redis");
const client = redis.createClient();

const { promisify } = require("util");
//const getAsync = promisify(client.get).bind(client);
//getAsync.then(console.log).catch(console.error);

const setAsync = promisify(client.set).bind(client);
//setAsync.then(console.log).catch(console.error);


const baseURL = 'https://jobs.github.com/positions.json';

async function fetchGithub() {

    let resultCount = 1, onPage = 0;
    const allJobs = [];

    while (resultCount > 0) {
        const res = await fetch(`${baseURL}/?page=${onPage}`);
        //TODO: Handle Promise rejection.
        const jobs = await res.json();
        allJobs.push(...jobs);
        resultCount = jobs.length;
        console.log('get' + jobs.length + 'jobs');
        onPage++;
    }
    console.log('get' + allJobs.length + 'jobs');
    const success = await setAsync('github', JSON.stringify(allJobs));
    console.log({success});
}
module.exports = fetchGithub;