import React from "react";
import InputField from "../InputField";

function Category({ handleChange }) {
  return (
    <div className="mb-2">
      <div className="d-flex align-items-baseline mb-2 mx-4">
        <h5 className="font-weight-bold mb-0 mt-2">Category</h5>
      </div>
      <div className="d-flex flex-col align-items-baseline mx-4">
        <label className="sidebar-label-container me-3">
          <input
            type="radio"
            name="category"
            value=""
            onChange={handleChange}
          />
          <span className="checkmark"></span>
          All
        </label>

        <InputField
          handleChange={handleChange}
          value="Design"
          title="Design"
          name="category"
        />

        <InputField
          handleChange={handleChange}
          value="Product"
          title="Product"
          name="category"
        />

        <InputField
          handleChange={handleChange}
          value="Marketing"
          title="Marketing"
          name="category"
        />
                <InputField
          handleChange={handleChange}
          value="Sales / Business"
          title="Sales"
          name="category"
        />
        
        <InputField
          handleChange={handleChange}
          value="Writing"
          title="Writing"
          name="category"
        />

      </div>
    </div>
  );
}

export default Category;
