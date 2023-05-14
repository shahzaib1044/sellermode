import React, { useState, useEffect } from 'react';
import axios from 'axios';

const List = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get('/api/jobs');
      setJobs(response.data);
    } catch (error) {
      console.log(error);
      // Handle error
    }
  };

  const handleApplyJob = async (jobId) => {
    try {
      await axios.post(`/api/jobs/${jobId}/apply`);
      // Handle successful application
    } catch (error) {
      console.log(error);
      // Handle error
    }
  };

  return (
    <div>
      <h1>Job Listings</h1>
      <ul>
        {jobs.map((job) => (
          <li key={job.id}>
            <h3>{job.title}</h3>
            <p>{job.description}</p>
            <button onClick={() => handleApplyJob(job.id)}>Apply</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default List;
