import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import JobFilters from './JobFilters';
import JobCard from './JobCard';
import {
  LoadingOutlined,
  SearchOutlined,
  BellOutlined,
  SaveOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
  DollarOutlined,
  FolderOpenOutlined,  // Replaced BriefcaseOutlined
  SortAscendingOutlined,
  FilterOutlined,
  SolutionOutlined      // Alternative to Briefcase
} from '@ant-design/icons';
import { Spin } from 'antd';
import './Jobs.css';

const Jobs = () => {
  const [isLoading, setIsLoading] = useState(true);
  // Expanded jobs data
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: 'Frontend Developer Intern',
      company: 'TechCorp',
      type: 'Internship',
      location: 'Remote',
      salary: '$3,000 - $4,000/mo',
      posted: '2 days ago',
      deadline: '2023-06-30',
      skills: ['React', 'JavaScript', 'CSS'],
      description: 'Join our frontend team to build responsive web applications using modern technologies.'
    },
    {
      id: 2,
      title: 'Data Science Fellow',
      company: 'DataInsights',
      type: 'Fellowship',
      location: 'New York, NY',
      salary: '$5,000 - $6,000/mo',
      posted: '1 week ago',
      deadline: '2023-07-15',
      skills: ['Python', 'Machine Learning', 'SQL'],
      description: 'Work on cutting-edge ML projects with our data science team.'
    },
    {
      id: 3,
      title: 'UX Design Assistant',
      company: 'CreativeMinds',
      type: 'Part-time',
      location: 'San Francisco, CA',
      salary: '$25 - $35/hr',
      posted: '3 days ago',
      deadline: '2023-06-25',
      skills: ['Figma', 'UI/UX', 'Prototyping'],
      description: 'Assist in designing intuitive user experiences for our clients.'
    },
    {
      id: 4,
      title: 'Backend Engineer',
      company: 'CloudSystems',
      type: 'Full-time',
      location: 'Remote',
      salary: '$6,500 - $8,000/mo',
      posted: '5 days ago',
      deadline: '2023-07-10',
      skills: ['Node.js', 'AWS', 'MongoDB'],
      description: 'Develop scalable backend services for our cloud platform.'
    },
    {
      id: 5,
      title: 'Marketing Intern',
      company: 'GrowthHack',
      type: 'Internship',
      location: 'Chicago, IL',
      salary: '$2,500 - $3,000/mo',
      posted: '1 day ago',
      deadline: '2023-06-20',
      skills: ['Social Media', 'Content Creation', 'SEO'],
      description: 'Support our marketing team with digital campaigns and analytics.'
    },
    {
      id: 6,
      title: 'DevOps Engineer',
      company: 'InfraTech',
      type: 'Contract',
      location: 'Boston, MA',
      salary: '$70 - $90/hr',
      posted: '2 weeks ago',
      deadline: '2023-07-05',
      skills: ['Docker', 'Kubernetes', 'CI/CD'],
      description: 'Implement and maintain our infrastructure and deployment pipelines.'
    }
  ]);

  const [filters, setFilters] = useState({
    type: '',
    location: '',
    salaryRange: '',
    search: '',
    sortBy: 'newest'
  });

  const [filteredJobs, setFilteredJobs] = useState([]);
  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Apply filters and sorting
  useEffect(() => {
    let results = jobs.filter(job => {
      return (
        (filters.type === '' || job.type === filters.type) &&
        (filters.location === '' || job.location.includes(filters.location)) &&
        (filters.salaryRange === '' ||
          (filters.salaryRange === 'under-3k' && job.salary.includes('$3,000')) ||
          (filters.salaryRange === '3k-5k' && job.salary.includes('$5,000')) ||
          (filters.salaryRange === 'over-5k' && !job.salary.includes('$3,000') && !job.salary.includes('$5,000'))
        ) &&
        (filters.search === '' ||
          job.title.toLowerCase().includes(filters.search.toLowerCase()) ||
          job.company.toLowerCase().includes(filters.search.toLowerCase()) ||
          job.skills.some(skill => skill.toLowerCase().includes(filters.search.toLowerCase())))
      );
    });

    // Apply sorting
    switch (filters.sortBy) {
      case 'newest':
        results.sort((a, b) => new Date(b.posted) - new Date(a.posted));
        break;
      case 'deadline':
        results.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
        break;
      case 'salary-high':
        results.sort((a, b) => parseFloat(b.salary.replace(/[^0-9.]/g, '')) - parseFloat(a.salary.replace(/[^0-9.]/g, '')));
        break;
      case 'salary-low':
        results.sort((a, b) => parseFloat(a.salary.replace(/[^0-9.]/g, '')) - parseFloat(b.salary.replace(/[^0-9.]/g, '')));
        break;
      default:
        break;
    }

    setFilteredJobs(results);
  }, [filters, jobs]);

  const handleSortChange = (e) => {
    setFilters({ ...filters, sortBy: e.target.value });
  };

  return (
    <div className="JO-jobs-page">
      {/* Hero Section */}
      <section className="JO-jobs-hero">
        <div className="JO-hero-content">
          <SolutionOutlined className="JO-hero-icon" /> {/* Changed icon */}
          <h1>Find Your Next Opportunity</h1>
          <p>Browse hundreds of internships and entry-level positions from top companies</p>
        </div>
      </section>

      {/* Main Content */}
      <div className="JO-jobs-container">
        {isLoading ? (
          <div className="JO-loading-container">
            <Spin
              indicator={<LoadingOutlined style={{ fontSize: 40 }} spin />}
              tip="Loading job opportunities..."
              size="large"
            />
          </div>
        ) : (
          <>
            {/* Filters Sidebar */}
            <aside className="JO-filters-sidebar">
              <div className="JO-sidebar-section">
                <h3><FilterOutlined /> Filter Jobs</h3>
                <JobFilters filters={filters} setFilters={setFilters} />
              </div>

              <div className="JO-sidebar-section">
                <h3><BellOutlined /> Job Alerts</h3>
                <p>Get notified about new jobs matching your criteria</p>
                <button className="JO-alert-btn">
                  <BellOutlined /> Set Up Job Alerts
                </button>
              </div>

              <div className="JO-sidebar-section">
                <h3><SaveOutlined /> Save Your Search</h3>
                <p>Save these filters for future use</p>
                <button className="JO-save-search-btn">
                  <SaveOutlined /> Save Search
                </button>
              </div>
            </aside>

            {/* Jobs List */}
            <main className="JO-jobs-list">
              <div className="JO-jobs-header">
                <h2>
                  <FolderOpenOutlined /> {filteredJobs.length} {filters.search ? 'Matching' : ''} Jobs Available
                  {filters.type && ` in ${filters.type}`}
                  {filters.location && ` near ${filters.location}`}
                </h2>

                <div className="JO-sort-options">
                  <SortAscendingOutlined className="JO-sort-icon" />
                  <select value={filters.sortBy} onChange={handleSortChange}>
                    <option value="newest">Newest First</option>
                    <option value="deadline">Application Deadline</option>
                    <option value="salary-high">Salary (High to Low)</option>
                    <option value="salary-low">Salary (Low to High)</option>
                  </select>
                </div>
              </div>

              {filteredJobs.length > 0 ? (
                <div className="JO-jobs-grid">
                  {filteredJobs.map(job => (
                    <JobCard
                      key={job.id}
                      id={job.id}
                      title={job.title}
                      company={job.company}
                      type={job.type}
                      location={job.location}
                      salary={job.salary}
                      posted={job.posted}
                      skills={job.skills}
                      description={job.description}
                    />
                  ))}
                </div>
              ) : (
                <div className="JO-no-results">
                  <SearchOutlined className="JO-no-results-icon" />
                  <h3>No jobs match your search criteria</h3>
                  <p>Try adjusting your filters or search for different keywords</p>
                  <button
                    className="JO-clear-filters-btn"
                    onClick={() => setFilters({
                      type: '',
                      location: '',
                      salaryRange: '',
                      search: '',
                      sortBy: 'newest'
                    })}
                  >
                    <FilterOutlined /> Clear All Filters
                  </button>
                </div>
              )}

              {/* Pagination */}
              {filteredJobs.length > 0 && (
                <div className="JO-pagination">
                  <button disabled>Previous</button>
                  <span className="JO-current-page">1</span>
                  <button>Next</button>
                </div>
              )}
            </main>
          </>
        )}
      </div>
    </div>
  );
};

export default Jobs;