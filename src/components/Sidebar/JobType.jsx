import React from "react";
import InputField from "../InputField";

function JobType({ handleChange }) {
  return (
    <div>
      <div className="d-flex align-items-baseline mb-2 mx-4">
        <h5 className="font-weight-bold mb-0 mt-2">Job Type</h5>
      </div>
      <div className="d-flex flex-col align-items-baseline mx-4">
        <label className="sidebar-label-container ">
          <input
            type="radio"
            name="jobType"
            value=""
            onChange={handleChange}
          />
          <span className="checkmark"></span>
          All
        </label>

        <InputField
          handleChange={handleChange}
          value="full_time"
          title="Full-time"
          name="jobType"
        />

        <InputField
          handleChange={handleChange}
          value="freelance"
          title="Freelance"
          name="jobType"
        />
        <InputField
          handleChange={handleChange}
          value="contract"
          title="Contract"
          name="jobType"
        />
      </div>
    </div>
  );
}

export default JobType;
