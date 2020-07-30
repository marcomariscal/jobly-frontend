import React, { useState, useCallback } from "react";
import { InputGroup, InputGroupAddon, Input, Button, Label } from "reactstrap";
import "./Search.css";
import _ from "lodash";

const Search = ({ searchFor }) => {
  const [input, setInput] = useState({
    search: "",
  });

  // delay the searchFor func, which is run alongside user input into the search bar
  const delayedSearchFor = useCallback(
    _.debounce((input) => searchFor(input), 500),
    []
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    const input = { [name]: value };

    setInput((input) => input);

    delayedSearchFor(input);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="Search">
      <form onSubmit={handleSubmit}>
        <InputGroup size="lg">
          <Label htmlFor="search"></Label>
          <Input
            onChange={handleChange}
            name="search"
            placeholder="Enter search term..."
            value={input.value}
          />
          <InputGroupAddon addonType="append">
            <Button color="secondary">Search</Button>
          </InputGroupAddon>
        </InputGroup>
      </form>
    </div>
  );
};

export default Search;
