import React from 'react'
import Category from './Category'
import JobType from './JobType'

function FilterSidebar({handleCategoryChange, handleJobTypeChange}) {
  return (
<div className="my-4 d-flex flex-col align-items-start">
  <h4 className="font-weight-bold mb-3 mt-2 mx-4">Filters</h4>
  <Category handleChange={handleCategoryChange} />
  <JobType handleChange={handleJobTypeChange} /></div>
  )
}

export default FilterSidebar