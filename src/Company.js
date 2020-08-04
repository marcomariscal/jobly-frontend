import React, { useState, useEffect } from "react";
import JoblyApi from "./JoblyApi";
import CardList from "./CardList";
import Spinner from "./Spinner";
import { useParams } from "react-router-dom";

const Company = () => {
  const [isLoading, setIsLoading] = useState(true);

  const { handle } = useParams();

  const [company, setCompany] = useState(null);
  const [companyJobs, setCompanyJobs] = useState(null);

  useEffect(() => {
    async function getCompanyAndJobs() {
      const company = await JoblyApi.getCompany(handle);
      const jobs = await JoblyApi.getJobs();
      const companyJobs = jobs.filter((job) => job.company_handle === handle);

      setCompany(company);
      setCompanyJobs(companyJobs);
      setIsLoading(false);
    }
    getCompanyAndJobs();
  }, [handle]);

  const render =
    company && companyJobs && !isLoading ? (
      <div className="col-md-8 offset-md-2">
        <h5 className="text-capitalize">{company.name}</h5>
        <p>{company.description}</p>
        <CardList cards={companyJobs} />
      </div>
    ) : (
      <Spinner />
    );

  return render;
};

export default Company;
