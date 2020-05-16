const express = require ('express');
const redis = require("redis");
const client = redis.createClient();

const { promisify } = require("util");
const getAsync = promisify(client.get).bind(client);


const app = express();
const port = 3001;

app.get('/jobs', async (req, res) => {
    const jobs = await getAsync('github');
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    console.log(JSON.parse(jobs).length);
    return res.send(jobs); 
});

app.listen(port, () => {
    console.log("Server listenting on port %d", port);
});