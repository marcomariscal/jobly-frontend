import React, { useState, useEffect } from "react";
import Search from "./Search";
import JoblyApi from "./JoblyApi";
import Spinner from "./Spinner";
import CardList from "./CardList";

const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getCompanies() {
      const companies = await JoblyApi.getCompanies();
      setCompanies(companies);
      setIsLoading(false);
    }
    getCompanies();
  }, []);

  const searchFor = async (search) => {
    const companies = await JoblyApi.getCompanies(search);
    setCompanies(companies);
  };

  const render = (
    <div>
      <Search searchFor={searchFor} />
      <CardList cards={companies} />
    </div>
  );

  return (
    <div className="col-md-8 offset-md-2">
      {isLoading ? <Spinner /> : render}
    </div>
  );
};

export default Companies;
