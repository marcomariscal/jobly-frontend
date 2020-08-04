import React from "react";
import CardItem from "./CardItem";
import "./CardList.css";

const CardList = ({ cards = [] }) => {
  return cards.length ? (
    <div className="CardList">
      {cards.map((cardData, idx) => (
        <CardItem item={cardData} key={idx} />
      ))}
    </div>
  ) : (
    <p>Sorry, no results found!</p>
  );
};

export default CardList;
