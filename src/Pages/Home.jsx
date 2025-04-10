import React, { useEffect, useState } from "react";
import axios from "axios";
import FilterSidebar from "../components/Sidebar/FilterSidebar";
import SearchBar from "../components/SearchBar";
import { Form } from "react-bootstrap";

const JOB_URL = "https://remotive.com/api/remote-jobs";

function Home() {
  const [showModal, setShowModal] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [customJobs, setCustomJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedJobType, setSelectedJobType] = useState("");
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [formIsVisible, setformIsVisible] = useState(false);
  const [title, setJobTitle] = useState("");
  const [description, setJobDescription] = useState("");
  const [job_type, setJobType] = useState("");
  const [category, setJobCategory] = useState("");
  const [company_name, setCompanyName] = useState("");
  const [candidate_required_location, setCandidateLocation] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(JOB_URL);
        setJobs(response.data.jobs);
        setFilteredJobs(response.data.jobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newJob = {
      id: Date.now(),
      url: undefined,
      title: title,
      category: category,
      company_name: company_name,
      company_logo: undefined,
      job_type: job_type,
      publication_date: new Date().toISOString(),
      candidate_required_location: candidate_required_location,
      salary: undefined,
      description: description,
    };

    setCustomJobs((prevJobs) => [...prevJobs, newJob]);

    console.log("New Job Added:", newJob);

    setJobTitle("");
    setJobDescription("");
    setJobType("");
    setJobCategory("");
    setCompanyName("");
    setCandidateLocation("");
    setformIsVisible(false);
  };

  useEffect(() => {
    // Reapply filters whenever search, category, or jobType change
    const allJobs = [...customJobs, ...jobs]; // includes appended jobs
    const filtered = allJobs.filter((job) => {
      const categoryMatch = selectedCategory
        ? job.category === selectedCategory
        : true;
      const jobTypeMatch = selectedJobType
        ? job.job_type === selectedJobType
        : true;
      const searchMatch = //filter for these fields
        job.title.toLowerCase().includes(searchQuery) ||
        job.company_name.toLowerCase().includes(searchQuery) ||
        job.category.toLowerCase().includes(searchQuery) ||
        job.candidate_required_location.toLowerCase().includes(searchQuery);
      return categoryMatch && jobTypeMatch && searchMatch;
    });

    setFilteredJobs(filtered);
  }, [searchQuery, selectedCategory, selectedJobType, customJobs, jobs]);

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleJobTypeChange = (event) => {
    setSelectedJobType(event.target.value);
  };

  const handleNewJobClick = () => {
    setformIsVisible(!formIsVisible);
  };

  return (
    <div className="home mx-auto">
      <div className="d-flex justify-content-between pt-2">
        <h2 className="text-2xl text-left">Mini Job Board</h2>
        <SearchBar handleSearch={handleSearch} />
        <button className="mx-4 mb-2 j-btn" onClick={handleNewJobClick}>
          New Job
        </button>
      </div>
      {formIsVisible && (
        <div className="overlay">
          <div className="form-container">
            <Form onSubmit={handleSubmit}>
              <div className="d-flex justify-content-between">
                <h3>Create New Job</h3>
                <button
                  type="button"
                  className="btn-close bg-white"
                  onClick={() => setformIsVisible(false)}
                ></button>
              </div>
              <Form.Group>
                <Form.Label>Job Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter job title"
                  value={title}
                  onChange={(e) => setJobTitle(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Job Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter job description"
                  value={description}
                  onChange={(e) => setJobDescription(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Job Type</Form.Label>
                <Form.Control
                  as="select"
                  value={job_type}
                  onChange={(e) => setJobType(e.target.value)}
                  required
                >
                  <option value="">Select a job type</option>
                  <option value="full_time">Full-time</option>
                  <option value="Contract">Contract</option>
                  <option value="freelance">Freelance</option>\{" "}
                </Form.Control>
              </Form.Group>

              <Form.Group>
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter job category"
                  value={category}
                  onChange={(e) => setJobCategory(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Company Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter company name"
                  value={company_name}
                  onChange={(e) => setCompanyName(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Candidate Required Location</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter candidate required location"
                  value={candidate_required_location}
                  onChange={(e) => setCandidateLocation(e.target.value)}
                  required
                />
              </Form.Group>

              <button type="submit" className="mt-3 form-btn">
                Add Job
              </button>
            </Form>
          </div>
        </div>
      )}

      <div className="d-flex" style={{ backgroundColor: "#dddada45" }}>
        <div className="sticky-top">
          <FilterSidebar
            handleCategoryChange={handleCategoryChange}
            handleJobTypeChange={handleJobTypeChange}
          />
        </div>

        {loading ? (
          <div className="d-flex flex-col justify-content-center  align-items-center mx-auto mt-5">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p>Loading jobs ...</p>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="text-center mt-5">
            <h4>No jobs found</h4>
            <p>Try adjusting your search or filters.</p>
          </div>
        ) : (
          <>
            {/* container with the job cards */}
            <div
              className="container my-4"
              style={{ overflowY: "scroll", maxHeight: "81vh" }}
            >
              {" "}
              {/* contained scroll for the cards */}
              <div className="row">
                {filteredJobs.map((job, index) => (
                  <div key={index} className="col-10 mb-4 mx-4">
                    <div className="card shadow">
                      <div className="card-body">
                        <h5 className="card-title">{job.title}</h5>
                        <h6 className="card-text">{job.company_name}</h6>
                        <ul className="list-unstyled d-flex flex-col align-items-start mx-4">
                          <li>
                            <strong>Candidate's Required Location:</strong>{" "}
                            {job.candidate_required_location}
                          </li>
                          <li>
                            <strong>Job Type:</strong>{" "}
                            {job.job_type.charAt(0).toUpperCase() +
                              job.job_type.slice(1).toLowerCase()}
                          </li>{" "}
                          {/* I am capitalizing the job type */}
                          <li>
                            <strong>Category:</strong> {job.category}
                          </li>
                        </ul>
                        <a
                          onClick={() => {
                            setSelectedJob(job);
                            setShowModal(true);
                          }}
                          className="btn text-white mx-4"
                          style={{ cursor: "pointer" }}
                        >
                          Learn More
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
      {/* Modal with specific job details/description*/}
      {showModal && selectedJob && (
        <div
          className="modal fade show d-block"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.65)" }}
        >
          <div className="modal-dialog modal-dialog-centered modal-lg text-white">
            <div className="modal-content text-white">
              <div className="modal-header d-flex align-items-start">
                <div>
                  <h5 className="modal-title text-lg mb-2">
                    {selectedJob.title} at{" "}
                    <span className="italic">{selectedJob.company_name}</span>
                  </h5>
                </div>
                <button
                  type="button"
                  className="btn-close bg-white"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body d-flex flex-col align-items-left">
                <div
                  className="job-description"
                  dangerouslySetInnerHTML={{ __html: selectedJob.description }}
                />
                <button className="apply-btn">Apply</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
