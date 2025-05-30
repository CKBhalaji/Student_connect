import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './CreateJobPage.css'; // Reusing the same CSS

const EditJobPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState({
    title: '',
    description: '',
    location: 'Remote',
    type: 'Full-time',
    salary: '',
    requirements: '',
    skills: [],
    newSkill: '',
    deadline: '',
    company: '',
    contactEmail: '',
    status: 'draft'
  });

  // Fetch job data when component mounts
  useEffect(() => {
    const fetchJob = async () => {
      try {
        // Simulate API call - in a real app this would fetch from your backend
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Mock data - replace with actual API call
        const mockJob = {
          id: id,
          title: 'Frontend Developer',
          description: 'We are looking for a skilled frontend developer to join our team...',
          location: 'Remote',
          type: 'Full-time',
          salary: '$90,000 - $120,000',
          requirements: '3+ years experience with React, JavaScript, and CSS...',
          skills: ['React', 'JavaScript', 'CSS', 'TypeScript'],
          deadline: '2023-12-31',
          company: 'TechCorp Inc.',
          contactEmail: 'careers@techcorp.com',
          status: 'active'
        };
        
        setJob({
          ...mockJob,
          newSkill: ''
        });
      } catch (error) {
        console.error('Error fetching job:', error);
        navigate('/recruiter-dashboard');
      }
    };

    fetchJob();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJob(prev => ({ ...prev, [name]: value }));
  };

  const handleSkillAdd = () => {
    if (job.newSkill.trim() && !job.skills.includes(job.newSkill.trim())) {
      setJob(prev => ({
        ...prev,
        skills: [...prev.skills, prev.newSkill.trim()],
        newSkill: ''
      }));
    }
  };

  const handleSkillRemove = (skillToRemove) => {
    setJob(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // API call would go here to update the job
    console.log('Updating job:', job);
    message.success('Job updated successfully!');
    navigate('/recruiter-manage-jobs');
  };

  const handleStatusChange = (newStatus) => {
    setJob(prev => ({ ...prev, status: newStatus }));
  };

  return (
    <div className="CJP-create-job-container">
      <div className="CJP-create-job-header">
        <h1>Edit Job Posting</h1>
        <p>Update the details of your job posting</p>
      </div>
      
      <form onSubmit={handleSubmit} className="CJP-job-form">
        <div className="CJP-form-section">
          <h2>Basic Information</h2>
          <div className="CJP-form-group">
            <label>Job Title*</label>
            <input 
              type="text" 
              name="title"
              value={job.title}
              onChange={handleChange}
              required
              placeholder="e.g. Frontend Developer"
            />
          </div>
          
          <div className="CJP-form-group">
            <label>Company Name*</label>
            <input 
              type="text" 
              name="company"
              value={job.company}
              onChange={handleChange}
              required
              placeholder="Your company name"
            />
          </div>

          <div className="CJP-form-row">
            <div className="CJP-form-group">
              <label>Job Type*</label>
              <select 
                name="type"
                value={job.type}
                onChange={handleChange}
                required
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
                <option value="Freelance">Freelance</option>
              </select>
            </div>
            
            <div className="CJP-form-group">
              <label>Location*</label>
              <select
                name="location"
                value={job.location}
                onChange={handleChange}
                required
              >
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
                <option value="New York, NY">New York, NY</option>
                <option value="San Francisco, CA">San Francisco, CA</option>
                <option value="Other">Other (specify in description)</option>
              </select>
            </div>
          </div>

          <div className="CJP-form-group">
            <label>Status</label>
            <div className="CJP-status-options">
              <button
                type="button"
                className={`status-btn ${job.status === 'draft' ? 'active' : ''}`}
                onClick={() => handleStatusChange('draft')}
              >
                Draft
              </button>
              <button
                type="button"
                className={`status-btn ${job.status === 'active' ? 'active' : ''}`}
                onClick={() => handleStatusChange('active')}
              >
                Active
              </button>
              <button
                type="button"
                className={`status-btn ${job.status === 'closed' ? 'active' : ''}`}
                onClick={() => handleStatusChange('closed')}
              >
                Closed
              </button>
            </div>
          </div>
        </div>

        <div className="CJP-form-section">
          <h2>Details</h2>
          <div className="CJP-form-group">
            <label>Job Description*</label>
            <textarea 
              name="description"
              value={job.description}
              onChange={handleChange}
              required
              rows={6}
              placeholder="Describe the role, responsibilities, and impact..."
            />
          </div>
          
          <div className="CJP-form-group">
            <label>Requirements*</label>
            <textarea 
              name="requirements"
              value={job.requirements}
              onChange={handleChange}
              required
              rows={4}
              placeholder="List required qualifications, skills, and experience..."
            />
          </div>

          <div className="CJP-form-group">
            <label>Key Skills</label>
            <div className="CJP-skills-input-container">
              <input 
                type="text" 
                value={job.newSkill}
                onChange={(e) => setJob(prev => ({ ...prev, newSkill: e.target.value }))}
                onKeyPress={(e) => e.key === 'Enter' && handleSkillAdd()}
                placeholder="Add a skill (press Enter)"
              />
              <button 
                type="button" 
                onClick={handleSkillAdd}
                className="CJP-add-skill-btn"
              >
                Add
              </button>
            </div>
            <div className="CJP-skills-tags">
              {job.skills.map((skill, index) => (
                <span key={index} className="CJP-skill-tag">
                  {skill}
                  <button 
                    type="button"
                    onClick={() => handleSkillRemove(skill)}
                    className="CJP-remove-skill"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="CJP-form-section">
          <h2>Logistics</h2>
          <div className="CJP-form-row">
            <div className="CJP-form-group">
              <label>Salary Range*</label>
              <input 
                type="text" 
                name="salary"
                value={job.salary}
                onChange={handleChange}
                required
                placeholder="e.g. $50,000 - $70,000 or Competitive"
              />
            </div>
            
            <div className="CJP-form-group">
              <label>Application Deadline*</label>
              <input 
                type="date" 
                name="deadline"
                value={job.deadline}
                onChange={handleChange}
                required
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>

          <div className="CJP-form-group">
            <label>Contact Email*</label>
            <input 
              type="email" 
              name="contactEmail"
              value={job.contactEmail}
              onChange={handleChange}
              required
              placeholder="For applicant questions"
            />
          </div>
        </div>

        <div className="CJP-form-actions">
          <button 
            type="button"
            className="CJP-btn btn-outline" 
            onClick={() => navigate('/recruiter-manage-jobs')}
          >
            Cancel
          </button>
          <button 
            type="submit"
            className="CJP-btn btn-primary" 
            disabled={!job.title || !job.description}
          >
            Update Job
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditJobPage;