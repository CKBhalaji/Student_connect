import { useState } from 'react';
import JobFilters from './JobFilters';
import JobCard from './JobCard';

const JobListing = () => {
  const [jobs, setJobs] = useState([
    { id: 1, title: 'Frontend Developer', company: 'Tech Corp', type: 'Full-time', location: 'New York' },
    { id: 2, title: 'Data Science Intern', company: 'Data Inc', type: 'Internship', location: 'Remote' },
    { id: 3, title: 'UX Designer', company: 'Design Hub', type: 'Contract', location: 'San Francisco' }
  ]);

  const [filters, setFilters] = useState({
    type: '',
    location: '',
    search: ''
  });

  const filteredJobs = jobs.filter(job => {
    return (
      (filters.type === '' || job.type === filters.type) &&
      (filters.location === '' || job.location.includes(filters.location)) &&
      (filters.search === '' || 
       job.title.toLowerCase().includes(filters.search.toLowerCase()) ||
       job.company.toLowerCase().includes(filters.search.toLowerCase()))
    );
  });

  return (
    <div className="job-listing">
      <h2>Job/Internship Opportunities</h2>
      
      <JobFilters filters={filters} setFilters={setFilters} />
      
      <div className="jobs-grid">
        {filteredJobs.map(job => (
          <JobCard 
            key={job.id}
            title={job.title}
            company={job.company}
            location={job.location}
            type={job.type}
          />
        ))}
      </div>
    </div>
  );
};

export default JobListing;