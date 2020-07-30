import React from "react";
import { Link } from "react-router-dom";
import CardItem from "./CardItem";
import "./CompanyCard.css";

const CompanyCard = ({ handle, name, description, logo_url }) => {
  return (
    <div className="CompanyCard">
      <Link to={`/companies/${handle}`}>
        <CardItem name={name} description={description} logo_url={logo_url} />
      </Link>
    </div>
  );
};

export default CompanyCard;
