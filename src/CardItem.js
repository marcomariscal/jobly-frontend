import React from "react";
import { Link } from "react-router-dom";
import CompanyCard from "./CompanyCard";
import JobCard from "./JobCard";

const CardItem = ({ item = {} }) => {
  if (item.handle) {
    return (
      <Link to={`/companies/${item.handle}`}>
        <CompanyCard item={item} />
      </Link>
    );
  } else {
    return <JobCard item={item} />;
  }
};

export default CardItem;
