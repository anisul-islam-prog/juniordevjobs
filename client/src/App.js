import React from 'react';
import './App.css';
import Jobs from './components/Jobs';

const JOBS_API_URL = "http://localhost:3001/jobs"

async function fetchJobs(updateCb){
  const res = await fetch(JOBS_API_URL);
  const jobs= await res.json();
  updateCb(jobs);
}

function App() {

  const [jobList, updateJobs] = React.useState([])

  React.useEffect(()=>{
    fetchJobs(updateJobs);
  },[])

  return (
    <div className="App">
      <Jobs jobs = {jobList}/>
    </div>
  );
}

export default App;
