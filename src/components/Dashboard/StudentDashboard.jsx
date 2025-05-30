import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  EditOutlined,
  SearchOutlined,
  BankOutlined,
  BookOutlined,
  CalendarOutlined,
  ToolOutlined,
  ClockCircleOutlined,
  RightOutlined,
  HourglassOutlined,
  EnvironmentOutlined,
  StarFilled,
  SendOutlined,
  EyeOutlined,
  FileTextOutlined,
  MessageOutlined,
  DashboardOutlined,
  LoadingOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';
import { Spin } from 'antd';
import './StudentDashboard.css';

const StudentDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [profileData] = useState({
    fullName: 'Alex Johnson',
    email: 'alex.johnson@university.edu',
    university: 'State University',
    major: 'Computer Science',
    graduationYear: '2024',
    skills: ['JavaScript', 'React', 'Python', 'Data Analysis']
  });

  const [applications] = useState([
    {
      id: 1,
      position: 'Frontend Developer Intern',
      company: 'Tech Solutions Inc.',
      status: 'Under Review',
      appliedDate: '2023-05-15',
      deadline: '2023-06-15'
    },
    {
      id: 2,
      position: 'Data Analyst',
      company: 'Data Insights LLC',
      status: 'Interview Scheduled',
      appliedDate: '2023-05-10',
      deadline: '2023-05-30'
    }
  ]);

  const [recommendedJobs] = useState([
    {
      id: 1,
      title: 'Software Engineering Intern',
      company: 'Innovate Tech',
      type: 'Internship',
      location: 'Remote',
      deadline: '2023-06-01',
      match: '92%'
    },
    {
      id: 2,
      title: 'UX Research Assistant',
      company: 'DesignHub',
      type: 'Part-time',
      location: 'New York, NY',
      deadline: '2023-06-10',
      match: '85%'
    }
  ]);

  const [upcomingDeadlines] = useState([
    {
      id: 1,
      title: 'Resume Submission',
      type: 'Scholarship',
      deadline: '2023-06-05'
    },
    {
      id: 2,
      title: 'Final Project Submission',
      type: 'Academic',
      deadline: '2023-05-25'
    }
  ]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="SD-loading-container">
        <Spin 
          indicator={<LoadingOutlined style={{ fontSize: 40 }} spin />}
          size="large"
        />
      </div>
    );
  }

  return (
    <div className="SD-student-dashboard">
      <section className="SD-student-hero">
        <div className="SD-dashboard-header">
          <h1>Welcome back, {profileData.fullName.split(' ')[0]}!</h1>
          <div className="SD-header-actions">
            <Link to="/student_profile" className="SD-edit-profile-btn">
              <EditOutlined /> Edit Profile
            </Link>
            <Link to="/jobs" className="SD-browse-jobs-btn">
              <SearchOutlined /> Browse Jobs
            </Link>
          </div>
        </div>
      </section>

      <div className="SD-dashboard-content">
        <div className="SD-left-column">
          <div className="SD-dashboard-card profile-summary">
            <h2><BankOutlined /> Profile Summary</h2>
            <div className="SD-profile-details">
              <div className="SD-detail-item">
                <BankOutlined className="SD-detail-icon" />
                <span className="SD-detail-value">{profileData.university}</span>
              </div>
              <div className="SD-detail-item">
                <BookOutlined className="SD-detail-icon" />
                <span className="SD-detail-value">{profileData.major}</span>
              </div>
              <div className="SD-detail-item">
                <CalendarOutlined className="SD-detail-icon" />
                <span className="SD-detail-value">Class of {profileData.graduationYear}</span>
              </div>
              <div className="SD-detail-item">
                <ToolOutlined className="SD-detail-icon" />
                <div className="SD-skills-container">
                  {profileData.skills.map((skill, index) => (
                    <span key={index} className="SD-skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
            </div>
            <Link to="/student_profile" className="SD-view-full-profile">
              View Full Profile <RightOutlined />
            </Link>
          </div>

          <div className="SD-dashboard-card deadlines">
            <h2><ClockCircleOutlined /> Upcoming Deadlines</h2>
            <div className="SD-deadlines-list">
              {upcomingDeadlines.map((item) => (
                <div key={item.id} className="SD-deadline-item">
                  <ClockCircleOutlined className="SD-deadline-icon" />
                  <div className="SD-deadline-info">
                    <h3>{item.title}</h3>
                    <p className="SD-deadline-type">{item.type}</p>
                  </div>
                  <div className="SD-deadline-date">
                    <span className="SD-date-value">{item.deadline}</span>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/student-company-deadline" className="SD-view-all-deadlines">
              View All <RightOutlined />
            </Link>
          </div>
        </div>

        <div className="SD-right-column">
          <div className="SD-dashboard-card applications">
            <div className="SD-card-header">
              <h2><FileTextOutlined /> Applications</h2>
              <span className="SD-applications-count">{applications.length} Active</span>
            </div>
            <div className="SD-applications-list">
              {applications.map((application) => (
                <div key={application.id} className="SD-application-item">
                  <div className="SD-application-main">
                    <h3>{application.position}</h3>
                    <p className="SD-company">{application.company}</p>
                    <div className="SD-application-dates">
                      <span>Applied: {application.appliedDate}</span>
                      <span>Deadline: {application.deadline}</span>
                    </div>
                  </div>
                  <div className={`SD-application-status ${application.status.toLowerCase().replace(' ', '-')}`}>
                    {application.status === 'Under Review' ? (
                      <HourglassOutlined /> 
                    ) : (
                      <CheckCircleOutlined />
                    )}
                    {application.status}
                  </div>
                </div>
              ))}
            </div>
            <Link to="/student-applications" className="SD-view-all-applications">
              View All <RightOutlined />
            </Link>
          </div>

          <div className="SD-dashboard-card recommendations">
            <div className="SD-card-header">
              <h2><StarFilled /> Recommendations</h2>
              <span className="SD-recommendations-count">{recommendedJobs.length} Matches</span>
            </div>
            <div className="SD-recommendations-list">
              {recommendedJobs.map((job) => (
                <div key={job.id} className="SD-recommendation-item">
                  <div className="SD-job-main">
                    <h3>{job.title}</h3>
                    <p className="SD-company">{job.company}</p>
                    <div className="SD-job-details">
                      <span className="SD-job-type"><ToolOutlined /> {job.type}</span>
                      <span className="SD-job-location"><EnvironmentOutlined /> {job.location}</span>
                    </div>
                  </div>
                  <div className="SD-job-actions">
                    <div className="SD-match-score">
                      <span className="SD-score">{job.match}</span>
                      <span className="SD-label">Match</span>
                    </div>
                    <button className="SD-apply-btn">
                      <SendOutlined /> Quick Apply
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/jobs" className="SD-browse-more-jobs">
              Browse More <RightOutlined />
            </Link>
          </div>
        </div>
      </div>

      <div className="SD-quick-stats">
        <div className="SD-stat-card">
          <EyeOutlined className="SD-stat-icon" />
          <div className="SD-stat-value">12</div>
          <div className="SD-stat-label">Jobs Viewed</div>
        </div>
        <div className="SD-stat-card">
          <FileTextOutlined className="SD-stat-icon" />
          <div className="SD-stat-value">{applications.length}</div>
          <div className="SD-stat-label">Applications</div>
        </div>
        <div className="SD-stat-card">
          <MessageOutlined className="SD-stat-icon" />
          <div className="SD-stat-value">3</div>
          <div className="SD-stat-label">Interviews</div>
        </div>
        <div className="SD-stat-card">
          <DashboardOutlined className="SD-stat-icon" />
          <div className="SD-stat-value">85%</div>
          <div className="SD-stat-label">Profile Strength</div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;