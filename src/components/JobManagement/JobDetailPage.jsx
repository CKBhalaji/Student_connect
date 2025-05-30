import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './JobDetailPage.css';

const JobDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch job details from API
    const fetchJob = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock data - in real app this would come from your API
        const mockJobs = [
          {
            id: '1',
            title: 'Frontend Developer Intern',
            company: 'TechCorp',
            type: 'Internship',
            location: 'Remote',
            salary: '$3,000 - $4,000/mo',
            posted: '2 days ago',
            deadline: '2023-06-30',
            description: 'Join our frontend team to build responsive web applications using modern technologies. You\'ll work with React, TypeScript, and our design system to create beautiful user interfaces.',
            requirements: '• Currently pursuing a degree in Computer Science or related field\n• Experience with React and JavaScript\n• Familiarity with CSS and responsive design\n• Strong problem-solving skills',
            skills: ['React', 'JavaScript', 'CSS', 'TypeScript'],
            contactEmail: 'careers@techcorp.com',
            recruiter: {
              name: 'Sarah Williams',
              position: 'Senior Talent Acquisition Specialist'
            }
          }
        ];
        
        const foundJob = mockJobs.find(job => job.id === id);
        if (foundJob) {
          setJob(foundJob);
        } else {
          navigate('/jobs');
        }
      } catch (error) {
        console.error('Error fetching job:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id, navigate]);

  if (loading) {
    return <div className="JDP-loading-spinner">Loading...</div>;
  }

  if (!job) {
    return <div className="JDP-not-found">Job not found</div>;
  }

  return (
    <div className="JDP-job-detail-container">
      <div className="JDP-job-header">
        <button 
          onClick={() => navigate(-1)} 
          className="JDP-back-button"
        >
          ← Back to Jobs
        </button>
        <h1>{job.title}</h1>
        <h2>{job.company}</h2>
        
        <div className="JDP-job-meta">
          <span className={`job-type ${job.type.toLowerCase()}`}>{job.type}</span>
          <span className="JDP-job-location">📍 {job.location}</span>
          <span className="JDP-job-salary">💵 {job.salary}</span>
        </div>
      </div>

      <div className="JDP-job-content">
        <div className="JDP-job-main">
          <div className="JDP-job-section">
            <h3>Job Description</h3>
            <p className="JDP-job-description">{job.description}</p>
          </div>

          <div className="JDP-job-section">
            <h3>Requirements</h3>
            <div className="JDP-requirements-list">
              {job.requirements.split('\n').map((item, index) => (
                <div key={index} className="JDP-requirement-item">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="JDP-job-section">
            <h3>Skills</h3>
            <div className="JDP-skills-container">
              {job.skills.map((skill, index) => (
                <span key={index} className="JDP-skill-tag">{skill}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="JDP-job-sidebar">
          <div className="JDP-sidebar-card">
            <h4>About {job.company}</h4>
            <p>TechCorp is a leading technology company specializing in enterprise software solutions and AI applications.</p>
          </div>

          <div className="JDP-sidebar-card">
            <h4>Application Details</h4>
            <div className="JDP-detail-item">
              <span className="JDP-detail-label">Posted:</span>
              <span>{job.posted}</span>
            </div>
            <div className="JDP-detail-item">
              <span className="JDP-detail-label">Deadline:</span>
              <span>{job.deadline}</span>
            </div>
            <div className="JDP-detail-item">
              <span className="JDP-detail-label">Contact:</span>
              <a href={`mailto:${job.contactEmail}`}>{job.contactEmail}</a>
            </div>
          </div>

          <div className="JDP-sidebar-card">
            <h4>Recruiter Info</h4>
            <div className="JDP-recruiter-info">
              <div className="JDP-recruiter-avatar">
                {job.recruiter.name.charAt(0)}
              </div>
              <div>
                <p className="JDP-recruiter-name">{job.recruiter.name}</p>
                <p className="JDP-recruiter-position">{job.recruiter.position}</p>
              </div>
            </div>
          </div>

          <button className="JDP-apply-button">
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobDetailPage;