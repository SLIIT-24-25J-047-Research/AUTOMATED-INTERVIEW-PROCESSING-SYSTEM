import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import updateIcon from "../../assets/icons/update-icon.svg";
import deleteIcon from "../../assets/icons/delete-icon.svg";

const JobsList = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/jobs/all");
        setJobs(response.data);
      } catch (error) {
        setError("Failed to fetch jobs");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const formatSalary = (salary: number | null | undefined): string => {
    return salary
      ? `LKR. ${salary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
      : "N/A";
  };

  const handleUpdate = (jobId: string) => {
    navigate(`/update-job/${jobId}`);
  };

  const handleDelete = async (jobId: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/api/jobs/${jobId}`);
        setJobs(jobs.filter((job) => job._id !== jobId));
      } catch (error) {
        setError("Failed to delete job");
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Jobs List</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && jobs.length === 0 && <p>No jobs available</p>}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 text-center">Job ID</th>
              <th className="py-2 px-4 text-center">Job Role</th>
              <th className="py-2 px-4 text-center">Description</th>
              <th className="py-2 px-4 text-center">Company</th>
              <th className="py-2 px-4 text-center">Location</th>
              <th className="py-2 px-4 text-center">Salary</th>
              <th className="py-2 px-4 text-center whitespace-nowrap">Job Type</th>
              <th className="py-2 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
             <tr key={job._id} className="hover:bg-gray-50">
             <td className="py-2 px-4 text-left">{job.jobID}</td>
             <td className="py-2 px-4 text-left whitespace-nowrap">{job.jobRole}</td>
             <td className="py-2 px-4 text-left">{job.description}</td>
             <td className="py-2 px-4 text-center whitespace-nowrap">{job.company}</td>
             <td className="py-2 px-4 text-center">{job.location}</td>
             <td className="py-2 px-4 text-right whitespace-nowrap">{formatSalary(job.salary)}</td>
             <td className="py-2 px-4 text-center whitespace-nowrap">{job.jobType}</td>
             <td className="py-2 px-4 flex items-center justify-center mt-7">
               {/* Update button */}
               <button
                 onClick={() => handleUpdate(job._id)}
                 className="text-blue-500 hover:underline flex items-center mr-3"
               >
                 <img src={updateIcon} alt="Update" className="w-5 h-5" />
               </button>
           
               {/* Delete button */}
               <button
                 onClick={() => handleDelete(job._id)}
                 className="text-red-500 hover:underline flex items-center"
               >
                 <img src={deleteIcon} alt="Delete" className="w-5 h-5" />
               </button>
             </td>
           </tr>
           
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JobsList;
