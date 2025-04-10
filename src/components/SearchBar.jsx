import React from "react";
import { Form } from "react-bootstrap";

function SearchBar({ handleSearch }) {
  return (
    <div className="mb-4 mx-4 w-50 ">
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Search jobs, companies, location, categories..."
          onChange={handleSearch}
          className="shadow"
        />
      </Form.Group>
    </div>
  );
}

export default SearchBar;
