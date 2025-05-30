import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateJobPage.css';
import {
  PlusOutlined,
  FileTextOutlined,
  EnvironmentOutlined,
  ScheduleOutlined,
  BankOutlined,
  TagOutlined,
  DollarOutlined,
  CalendarOutlined,
  MailOutlined,
  CloseOutlined,
  CheckOutlined,
  FormOutlined,
  BookOutlined,
  BarChartOutlined,
  DeleteColumnOutlined
} from '@ant-design/icons';

const CreateJobPage = () => {
  const navigate = useNavigate();
  const [newJob, setNewJob] = useState({
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
    contactEmail: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewJob(prev => ({ ...prev, [name]: value }));
  };

  const handleSkillAdd = () => {
    if (newJob.newSkill.trim() && !newJob.skills.includes(newJob.newSkill.trim())) {
      setNewJob(prev => ({
        ...prev,
        skills: [...prev.skills, prev.newSkill.trim()],
        newSkill: ''
      }));
    }
  };

  const handleSkillRemove = (skillToRemove) => {
    setNewJob(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // API call would go here
    console.log('Creating job:', newJob);
    navigate('/recruiter-dashboard');
  };

  return (
    <div className="CJP-create-job-container">
      <div className="CJP-create-job-header">
        <h1><FormOutlined /> Create New Job Posting</h1>
        <p>Fill in the details to list your opportunity</p>
      </div>

      <form onSubmit={handleSubmit} className="CJP-job-form">
        <div className="CJP-form-section">
          <h2><FormOutlined />Basic Information</h2>
          <div className="CJP-form-group">
            <label><FileTextOutlined/> Job Title*</label>
            <input
              type="text"
              name="title"
              value={newJob.title}
              onChange={handleChange}
              required
              placeholder="e.g. Frontend Developer"
            />
          </div>

          <div className="CJP-form-group">
            <label><BankOutlined /> Company Name*</label>
            <input
              type="text"
              name="company"
              value={newJob.company}
              onChange={handleChange}
              required
              placeholder="Your company name"
            />
          </div>

          <div className="CJP-form-row">
            <div className="CJP-form-group">
              <label><ScheduleOutlined /> Job Type*</label>
              <select
                name="type"
                value={newJob.type}
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
              <label><EnvironmentOutlined /> Location*</label>
              <select
                name="location"
                value={newJob.location}
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
        </div>

        <div className="CJP-form-section">
          <h2><BookOutlined /> Details</h2>
          <div className="CJP-form-group">
            <label><BookOutlined /> Job Description*</label>
            <textarea
              name="description"
              value={newJob.description}
              onChange={handleChange}
              required
              rows={6}
              placeholder="Describe the role, responsibilities, and impact..."
            />
          </div>

          <div className="CJP-form-group">
            <label><CheckOutlined /> Requirements*</label>
            <textarea
              name="requirements"
              value={newJob.requirements}
              onChange={handleChange}
              required
              rows={4}
              placeholder="List required qualifications, skills, and experience..."
            />
          </div>

          <div className="CJP-form-group">
            <label><TagOutlined /> Key Skills</label>
            <div className="CJP-skills-input-container">
              <input
                type="text"
                value={newJob.newSkill}
                onChange={(e) => setNewJob(prev => ({ ...prev, newSkill: e.target.value }))}
                onKeyPress={(e) => e.key === 'Enter' && handleSkillAdd()}
                placeholder="Add a skill (press Enter)"
              />
              <button
                type="button"
                onClick={handleSkillAdd}
                className="CJP-add-skill-btn"
              >
                <PlusOutlined />
              </button>
            </div>
            <div className="CJP-skills-tags">
              {newJob.skills.map((skill, index) => (
                <span key={index} className="CJP-skill-tag">
                  {skill}
                  <button
                    type="button"
                    onClick={() => handleSkillRemove(skill)}
                    className="CJP-remove-skill"
                  >
                    <CloseOutlined />
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="CJP-form-section">
          <h2><BarChartOutlined /> Logistics</h2>
          <div className="CJP-form-row">
            <div className="CJP-form-group">
              <label><DollarOutlined /> Salary Range*</label>
              <input
                type="text"
                name="salary"
                value={newJob.salary}
                onChange={handleChange}
                required
                placeholder="e.g. $50,000 - $70,000 or Competitive"
              />
            </div>

            <div className="CJP-form-group">
              <label><CalendarOutlined /> Application Deadline*</label>
              <input
                type="date"
                name="deadline"
                value={newJob.deadline}
                onChange={handleChange}
                required
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>

          <div className="CJP-form-group">
            <label><MailOutlined /> Contact Email*</label>
            <input
              type="email"
              name="contactEmail"
              value={newJob.contactEmail}
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
            onClick={() => navigate('/recruiter-dashboard')}
          >
            <DeleteColumnOutlined/> Cancel
          </button>
          <button
            type="submit"
            className="CJP-btn btn-primary"
            disabled={!newJob.title || !newJob.description}
          >
            <PlusOutlined /> Post Job
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateJobPage;