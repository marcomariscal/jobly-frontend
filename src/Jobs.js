import React, { useState, useEffect } from "react";
import JoblyApi from "./JoblyApi";
import Search from "./Search";
import Spinner from "./Spinner";
import CardList from "./CardList";

const Jobs = ({ companyJobs }) => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getJobs() {
      if (companyJobs && companyJobs.length !== 0) {
        setJobs(companyJobs);
      } else {
        const jobs = await JoblyApi.getJobs();
        setJobs(jobs);
      }
      setIsLoading(false);
    }
    getJobs();
  }, []);

  const searchFor = async (search) => {
    const jobs = await JoblyApi.getJobs(search);
    setJobs(jobs);
  };

  const render = (
    <div>
      <Search searchFor={searchFor} />
      <CardList cards={jobs} />
    </div>
  );

  return (
    <div className="Jobs col-md-8 offset-md-2">
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
