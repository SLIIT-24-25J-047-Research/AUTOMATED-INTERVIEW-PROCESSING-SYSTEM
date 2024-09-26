import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateJob = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [job, setJob] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    jobRole: "software-engineer-intern", // Default value
    description: "",
    company: "",
    location: "",
    salary: "",
    jobType: "Full-time", // Default value
  });

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/jobs/${id}`);
        setJob(response.data);
        setFormData({
          ...response.data,
          jobRole: response.data.jobRole || "software-engineer-intern", // Set default if not provided
          jobType: response.data.jobType || "Full-time" // Set default if not provided
        });
      } catch (error) {
        setError("Failed to fetch job details");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/jobs/${id}`, formData);
      alert("Job updated successfully!");
      navigate("/jobs-list");
    } catch (error) {
      setError("Failed to update job");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Update Job</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {job && (
        <form onSubmit={handleSubmit}>
          <div>
            <label className="block mb-2">Job Role:</label>
            <select
              name="jobRole"
              value={formData.jobRole}
              onChange={handleChange}
              className="border border-gray-300 p-2 w-full mb-4"
              required
            >
              <option value="software-engineer-intern">Software Engineer Intern</option>
              <option value="software-engineer-associate">Software Engineer Associate</option>
              {/* Add more roles as needed */}
            </select>
          </div>
          <div>
            <label className="block mb-2">Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="border border-gray-300 p-2 w-full mb-4"
              required
            />
          </div>
          <div>
            <label className="block mb-2">Company:</label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="border border-gray-300 p-2 w-full mb-4"
              required
            />
          </div>
          <div>
            <label className="block mb-2">Location:</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="border border-gray-300 p-2 w-full mb-4"
              required
            />
          </div>
          <div>
            <label className="block mb-2">Salary:</label>
            <input
              type="number"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              className="border border-gray-300 p-2 w-full mb-4"
            />
          </div>
          <div>
            <label className="block mb-2">Job Type:</label>
            <select
              name="jobType"
              value={formData.jobType}
              onChange={handleChange}
              className="border border-gray-300 p-2 w-full mb-4"
              required
            >
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              {/* Add more job types as needed */}
            </select>
          </div>
          <button type="submit" className="bg-blue-500 text-white p-2">
            Update Job
          </button>
        </form>
      )}
    </div>
  );
};

export default UpdateJob;
