import React, { useState, useEffect } from "react";
import Jobs from "./Jobs";
import JoblyApi from "./JoblyApi";
import AuthError from "./AuthError";
import Spinner from "./Spinner";

const Company = ({ handle, currentUser }) => {
  const [company, setCompany] = useState({});
  const [companyJobs, setCompanyJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getCompany(handle) {
      const { company } = await JoblyApi.getCompany(handle);
      setCompany(company);
      setIsLoading(false);
    }
    getCompany(handle);
  }, [handle, setCompany]);

  useEffect(() => {
    async function getCompanyJobs(handle) {
      const { jobs } = await JoblyApi.getJobs();
      const companyJobs = jobs.filter((job) => job.company_handle === handle);
      setCompanyJobs(companyJobs);
      setIsLoading(false);
    }
    getCompanyJobs(handle);
  }, [handle, setCompany]);

  const render = currentUser ? (
    <>
      <h5 className="text-capitalize">{company.name}</h5>
      <p>{company.description}</p>
      <Jobs
        companyJobs={companyJobs}
        isLoading={isLoading}
        currentUser={currentUser}
      />
    </>
  ) : (
    <AuthError />
  );

  return isLoading ? <Spinner /> : render;
};

export default Company;
