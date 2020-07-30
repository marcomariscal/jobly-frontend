import React, { useState, useEffect } from "react";
import JoblyApi from "./JoblyApi";
import Search from "./Search";
import Job from "./Job";
import Spinner from "./Spinner";
import AuthError from "./AuthError";

const Jobs = ({ companyJobs, currentUser }) => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getJobs() {
      if (companyJobs && companyJobs.length !== 0) {
        setJobs(companyJobs);
      } else {
        const { jobs } = await JoblyApi.getJobs();
        setJobs(jobs);
      }
      setIsLoading(false);
    }
    getJobs();
  }, []);

  const searchFor = async (search) => {
    const { jobs } = await JoblyApi.getJobs(search);
    setJobs(jobs);
  };

  const applyToJob = async (id, data) => {
    await JoblyApi.applyToJob(id, data);
  };

  const render = currentUser ? (
    <div>
      <Search searchFor={searchFor} />
      {jobs.length === 0 ? (
        <p className="lead">Sorry no jobs match that search...</p>
      ) : (
        jobs.map(({ id, title, equity, salary, state }) => (
          <Job
            key={id}
            id={id}
            title={title}
            equity={equity}
            salary={salary}
            state={state}
            applyToJob={applyToJob}
          />
        ))
      )}
    </div>
  ) : (
    <AuthError />
  );

  return (
    <div className="col-md-8 offset-md-2">
      {isLoading ? (
        <div>
          <Spinner />
        </div>
      ) : (
        render
      )}
    </div>
  );
};

export default Jobs;
