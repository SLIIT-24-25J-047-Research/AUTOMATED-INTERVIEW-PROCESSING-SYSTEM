import React, { useState } from "react";
import axios from "axios";

const AddJobs: React.FC = () => {
  const [formData, setFormData] = useState({
    jobID: "",
    jobRole: "software-engineer-intern",
    description: "",
    company: "",
    location: "",
    salary: "",
    jobType: "Full-time",
  });

  const [alert, setAlert] = useState<{
    message: string;
    type: "success" | "error" | null;
  }>({
    message: "",
    type: null,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/jobs/add",
        formData
      );
      setAlert({ message: response.data.message, type: "success" });
      setFormData({
        jobID: "",
        jobRole: "software-engineer-intern",
        description: "",
        company: "",
        location: "",
        salary: "",
        jobType: "Full-time",
      });
    } catch (error) {
      const errorMessage =
        (error as any).response?.data.message || "Failed to create job";
      setAlert({ message: errorMessage, type: "error" });
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Add New Job</h2>

      {alert.message && (
        <div
          className={`mb-4 p-2 text-white rounded ${
            alert.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {alert.message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Job ID
          </label>
          <input
            type="text"
            name="jobID"
            value={formData.jobID}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Job Role
          </label>
          <select
            name="jobRole"
            value={formData.jobRole}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
          >
            <option value="software-engineer-intern">
              Software Engineer Intern
            </option>
            <option value="software-engineer-associate">
              Software Engineer Associate
            </option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Company
          </label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Location
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Salary
          </label>
          <input
            type="number"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Job Type
          </label>
          <select
            name="jobType"
            value={formData.jobType}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
          >
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full p-2 mt-4 text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none"
        >
          Create Job
        </button>
      </form>
    </div>
  );
};

export default AddJobs;
