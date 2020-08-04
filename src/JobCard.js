import React, { useState } from "react";
import "./JobCard.css";
import { currencyFormat, formatPct } from "./helpers";
import JoblyApi from "./JoblyApi";

const JobCard = ({ item = {} }) => {
  const { id, title, equity, salary, state } = item;
  const [isApplied, setIsApplied] = useState(false);

  const applyToJob = async (id) => {
    await JoblyApi.applyToJob(id);
  };

  const handleClick = (e) => {
    const { value } = e.target;

    // value is the job id
    applyToJob(value);
    setIsApplied(true);
  };

  const buttonRender =
    state === "applied" || isApplied ? (
      <button
        type="button"
        className="JobCard btn btn-primary font-weight-bold text-uppercase float-right disabled"
        disabled
      >
        Applied
      </button>
    ) : (
      <button
        onClick={handleClick}
        type="button"
        className="JobCard btn btn-primary font-weight-bold text-uppercase float-right active"
        value={id}
      >
        Apply
      </button>
    );

  return (
    <div className="JobCard card">
      <div className="card-body">
        <h6 className="card-title d-flex justify-content-between mb-4">
          <span className="text-capitalize">{title}</span>
        </h6>
        <div className="card-text">Salary: {currencyFormat(salary)}</div>
        <div className="card-text">Equity: {formatPct(equity)}</div>
        {buttonRender}
      </div>
    </div>
  );
};

export default JobCard;
