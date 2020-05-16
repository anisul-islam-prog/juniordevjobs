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
    console.log('Fetching github jobs');
    let resultCount = 1, onPage = 0;
    const allJobs = [];

    //get jobs from github
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
    //filter Algo
    const jrJobs = allJobs.filter(job => {
        const jobTitle = job.title.toLowerCase();
        let isJunior = true;

        //algo logic
        if (
            jobTitle.includes('senior') ||
            jobTitle.includes('manager') ||
            jobTitle.includes('sr') ||
            jobTitle.includes('architect')
        ) {
            return isJunior = false;
        }

        return isJunior;
    });
    
    console.log(`filter down to JrJobs ${jrJobs.length}`);


    //set in redis   
    const success = await setAsync('github', JSON.stringify(jrJobs));
    console.log({ success });
}
module.exports = fetchGithub;