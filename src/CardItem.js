import React from "react";
import "./CardItem.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding } from "@fortawesome/free-solid-svg-icons";
import "./FontAwesome.css";

const CardItem = ({ name, description, logo_url }) => {
  return (
    <div className="CardItem card text-center">
      <div className="card-body">
        <h6 className="card-title d-flex justify-content-between mb-4">
          <span className="text-capitalize">{name}</span>
          {!logo_url ? (
            <FontAwesomeIcon icon={faBuilding} size="2x" className="building" />
          ) : (
            <img src={logo_url} alt={`${name}} Logo`} />
          )}
        </h6>
        <p className="card-text text-left">{description}</p>
      </div>
    </div>
  );
};
export default CardItem;
