import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Skeleton, Card, Modal, Button, Tag, Divider, message } from 'antd';
import './RecruiterDashboard.css';
import { Dropdown, Menu } from 'antd';
import { 
  PlusOutlined,
  MailOutlined,
  FilePdfOutlined,
  TeamOutlined,
  ScheduleOutlined,
  FileTextOutlined,
  ArrowRightOutlined,
  UserOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  SyncOutlined,
  CloseCircleOutlined,
  RocketOutlined,
  TagOutlined,
  BookOutlined,
  CodeOutlined,
  ToolOutlined,
  DollarOutlined
} from '@ant-design/icons';

const RecruiterDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [activeJobs, setActiveJobs] = useState([]);
  const [recentApplications, setRecentApplications] = useState([]);
  const [analytics, setAnalytics] = useState({});
  const [quickActions] = useState([
    { id: 1, title: 'Post New Job', icon: <PlusOutlined className="RD-action-icon" />, link: '/create-job' },
    { id: 2, title: 'Review Applications', icon: <FileTextOutlined className="RD-action-icon" />, link: '/recruiter-student-applications' },
    { id: 3, title: 'Schedule Interview', icon: <ScheduleOutlined className="RD-action-icon" />, link: '/recruiter-schedule-interview' },
    // { id: 4, title: 'View Candidates', icon: '👥', link: '/candidates' }
  ]);
  const [isStatusDropdownVisible, setIsStatusDropdownVisible] = useState(false);

  const [selectedApplication, setSelectedApplication] = useState(null);
  const [isProfileModalVisible, setIsProfileModalVisible] = useState(false);
  const viewProfile = (application) => {
    setSelectedApplication(application);
    setIsProfileModalVisible(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Simulate API calls with delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Mock data - replace with actual API calls
        setActiveJobs([
          {
            id: 1,
            title: 'Frontend Developer',
            type: 'Full-time',
            applicants: 24,
            posted: '2023-05-10',
            deadline: '2023-06-15',
            status: 'Active'
          },
          {
            id: 2,
            title: 'UX Designer Intern',
            type: 'Internship',
            applicants: 15,
            posted: '2023-05-15',
            deadline: '2023-06-01',
            status: 'Active'
          }
        ]);

        setRecentApplications([
          {
            id: 1,
            name: 'Alex Johnson',
            position: 'Frontend Developer',
            status: 'New',
            applied: '2023-05-20',
            match: '92%'
          },
          {
            id: 2,
            name: 'Sarah Miller',
            position: 'UX Designer Intern',
            status: 'Interview Scheduled',
            applied: '2023-05-18',
            match: '88%'
          },
          {
            id: 3,
            name: 'Michael Chen',
            position: 'Frontend Developer',
            status: 'Rejected',
            applied: '2023-05-15',
            match: '76%'
          }
        ]);

        setAnalytics({
          totalJobs: 5,
          activeJobs: 2,
          totalApplicants: 42,
          interviewRate: '28%',
          hireRate: '12%'
        });

      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleStatusChange = (applicationId, newStatus) => {
    setRecentApplications(prev => prev.map(app =>
      app.id === applicationId ? { ...app, status: newStatus } : app
    ));
  };


  return (
    <div className="RD-recruiter-dashboard">
      {/* Header Section */}
      <div className="RD-dashboard-header">
        <h1><TeamOutlined/> Recruiter Dashboard</h1>
        <div className="RD-header-actions">
          <Link to="/create-job" className="RD-primary-btn">
          <PlusOutlined /> Post New Job
          </Link>
        </div>
      </div>

      {/* Quick Stats Section */}
      <div className="RD-quick-stats">
        {loading ? (
          <>
            {[...Array(5)].map((_, i) => (
              <Card key={i} className="RD-stat-card">
                <Skeleton active paragraph={{ rows: 0 }} />
              </Card>
            ))}
          </>
        ) : (
          <>
            <div className="RD-stat-card">
              <div className="RD-stat-value">{analytics.totalJobs}</div>
              <div className="RD-stat-label">Total Jobs</div>
            </div>
            <div className="RD-stat-card">
              <div className="RD-stat-value">{analytics.activeJobs}</div>
              <div className="RD-stat-label">Active Jobs</div>
            </div>
            <div className="RD-stat-card">
              <div className="RD-stat-value">{analytics.totalApplicants}</div>
              <div className="RD-stat-label">Total Applicants</div>
            </div>
            <div className="RD-stat-card">
              <div className="RD-stat-value">{analytics.interviewRate}</div>
              <div className="RD-stat-label">Interview Rate</div>
            </div>
            <div className="RD-stat-card">
              <div className="RD-stat-value">{analytics.hireRate}</div>
              <div className="RD-stat-label">Hire Rate</div>
            </div>
          </>
        )}
      </div>

      {/* Quick Actions */}
      <div className="RD-quick-actions">
        <h2>Quick Actions</h2>
        {loading ? (
          <div className="RD-actions-grid">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="RD-action-card">
                <Skeleton active paragraph={{ rows: 0 }} />
              </Card>
            ))}
          </div>
        ) : (
          <div className="RD-actions-grid">
            {quickActions.map(action => (
              <Link to={action.link} key={action.id} className="RD-action-card">
                <div className="RD-action-icon">{action.icon}</div>
                <div className="RD-action-title">{action.title}</div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="RD-dashboard-content">
        {/* Left Column - Active Jobs */}
        <div className="RD-left-column">
          <div className="RD-dashboard-card active-jobs">
            <div className="RD-card-header">
              <h2><ScheduleOutlined/> Your Active Job Postings</h2>
              {!loading && <span className="RD-jobs-count">{activeJobs.length} Active</span>}
            </div>
            {loading ? (
              <div className="RD-jobs-list">
                {[...Array(2)].map((_, i) => (
                  <Card key={i} className="RD-job-item">
                    <Skeleton active paragraph={{ rows: 3 }} />
                  </Card>
                ))}
              </div>
            ) : (
              <>
                <div className="RD-jobs-list">
                  {activeJobs.map(job => (
                    <div key={job.id} className="RD-job-item">
                      <div className="RD-job-main">
                        <h3>{job.title}</h3>
                        <div className="RD-job-details">
                          <span className="RD-job-type"><UserOutlined/> {job.type}</span>
                          <span className="RD-job-applicants"><TeamOutlined /> {job.applicants} applicants</span>
                        </div>
                        <div className="RD-job-dates">
                          <span>Posted: {job.posted}</span>
                          <span>Deadline: {job.deadline}</span>
                        </div>
                      </div>
                      <div className="RD-job-status">
                        <span className={`status-badge ${job.status.toLowerCase()}`}>
                          {job.status}
                        </span>
                        <Link to={`/recruiter-student-applications?position=${encodeURIComponent(job.title)}`} className="RD-view-applicants">
                          View Applicants
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
                <Link to="/recruiter-manage-jobs" className="RD-view-all-jobs">
                  View All Jobs <ArrowRightOutlined />
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Right Column - Recent Applications */}
        <div className="RD-right-column">
          <div className="RD-dashboard-card recent-applications">
            <div className="RD-card-header">
              <h2><FileTextOutlined/> Recent Applications</h2>
              {!loading && <span className="RD-applications-count">{recentApplications.length} New</span>}
            </div>
            {loading ? (
              <div className="RD-applications-list">
                {[...Array(3)].map((_, i) => (
                  <Card key={i} className="RD-application-item">
                    <Skeleton active avatar paragraph={{ rows: 2 }} />
                  </Card>
                ))}
              </div>
            ) : (
              <>
                <div className="RD-applications-list">
                  {recentApplications.map(application => (
                    <div key={application.id} className="RD-application-item">
                      <div className="RD-applicant-info">
                        <div className="RD-applicant-avatar">
                          {application.name.charAt(0)}
                        </div>
                        <div className="RD-applicant-details">
                          <h3>{application.name}</h3>
                          <p className="RD-position">{application.position}</p>
                          <p className="RD-applied-date"><ClockCircleOutlined /> Applied: {application.applied}</p>
                        </div>
                      </div>
                      <div className="RD-application-actions">
                        <div className="RD-match-score">
                        <RocketOutlined className="RD-score-icon" />
                          <span className="RD-score">{application.match}</span>
                          <span className="RD-label">Match</span>
                        </div>
                        <div className={`status ${application.status.toLowerCase().replace(' ', '-')}`}>
                          {application.status}
                        </div>
                        <div className="RD-action-buttons">
                          <button
                            className="RD-action-btn RD-view-profile"
                            onClick={() => viewProfile(application)}
                          >
                            Profile
                          </button>
                          <select
                            value={application.status}
                            onChange={(e) => handleStatusChange(application.id, e.target.value)}
                            className="RD-status-select"
                          >
                            <option value="New">New</option>
                            <option value="Reviewing">Reviewing</option>
                            <option value="Interview Scheduled">Interview</option>
                            <option value="Offer Sent">Offer</option>
                            <option value="Rejected">Reject</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Link to="/recruiter-student-applications" className="RD-view-all-applications">
                  View All Applications <ArrowRightOutlined/>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      {/* Student Profile Modal */}
      <Modal
        title={`${selectedApplication?.name}'s Profile`}
        visible={isProfileModalVisible}
        onCancel={() => setIsProfileModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setIsProfileModalVisible(false)}>
            Close
          </Button>,
          <Button
            key="contact"
            type="primary"
            icon={<MailOutlined />}
            onClick={() => {
              setIsProfileModalVisible(false);
              message.info(`Email sent to ${selectedApplication?.name}`);
            }}
          >
            Contact Applicant
          </Button>,
          <Dropdown
            key="status"
            overlay={
              <Menu onClick={({ key }) => {
                handleStatusUpdate(selectedApplication.id, key);
                message.success(`Status updated to ${key}`);
              }}>
                <Menu.Item key="Under Review"><SyncOutlined /> Under Review</Menu.Item>
                <Menu.Item key="Interview Scheduled"><CheckCircleOutlined /> Interview Scheduled</Menu.Item>
                <Menu.Item key="Offer Sent"><DollarOutlined /> Offer Sent</Menu.Item>
                <Menu.Item key="Rejected"><CloseCircleOutlined /> Rejected</Menu.Item>
              </Menu>
            }
            trigger={['click']}
          >
            <Button type="default">Change Status</Button>
          </Dropdown>
        ]}
        width={800}
        className="RD-student-profile-modal"
      >
        {selectedApplication && (
          <div className="RD-student-profile-view">
            {/* Personal Information Section */}
            <div className="RD-profile-section">
              <div className="RD-profile-header">
                <div className="RD-profile-avatar">
                  {selectedApplication.name.charAt(0)}
                </div>
                <div className="RD-profile-title">
                  <h2>{selectedApplication.name}</h2>
                  <p>Applied for: {selectedApplication.position}</p>
                  <div className="RD-profile-status">
                    <div className={`status ${selectedApplication.status.toLowerCase().replace(' ', '-')}`}>
                      {selectedApplication.status}
                    </div>
                    <span className="RD-match-score">
                      Match Score: <strong>{selectedApplication.match}</strong>
                    </span>
                  </div>
                </div>
              </div>

              <Divider />

              <div className="RD-personal-info-grid">
                <div className="RD-info-item">
                  <span className="RD-info-label">Email:</span>
                  <span className="RD-info-value">
                    <a href={`mailto:${selectedApplication.email || 'student@example.com'}`}>
                      {selectedApplication.email || 'student@example.com'}
                    </a>
                  </span>
                </div>
                <div className="RD-info-item">
                  <span className="RD-info-label">Phone:</span>
                  <span className="RD-info-value">{selectedApplication.phone || 'Not provided'}</span>
                </div>
                <div className="RD-info-item">
                  <span className="RD-info-label">University:</span>
                  <span className="RD-info-value">{selectedApplication.university || 'State University'}</span>
                </div>
                <div className="RD-info-item">
                  <span className="RD-info-label">Major:</span>
                  <span className="RD-info-value">{selectedApplication.major || 'Computer Science'}</span>
                </div>
                <div className="RD-info-item">
                  <span className="RD-info-label">Applied Date:</span>
                  <span className="RD-info-value">{selectedApplication.applied}</span>
                </div>
              </div>
            </div>

            {/* Skills Section */}
            <div className="RD-profile-section">
              <h3><ToolOutlined /> Skills</h3>
              <div className="RD-skills-container">
                {(selectedApplication.skills || ['JavaScript', 'React', 'CSS']).map((skill, index) => (
                  <Tag key={index} className="RD-skill-tag">{skill}</Tag>
                ))}
              </div>
            </div>

            {/* Education Section */}
            <div className="RD-profile-section">
              <h3><BookOutlined /> Education</h3>
              <div className="RD-education-item">
                <h4>{selectedApplication.education || 'BSc Computer Science, State University (2024)'}</h4>
                <p>GPA: {selectedApplication.gpa || '3.8'}</p>
              </div>
            </div>

            {/* Experience Section */}
            <div className="RD-profile-section">
              <h3><CodeOutlined /> Experience</h3>
              <div className="RD-experience-item">
                <h4>{selectedApplication.experience || 'Frontend Developer Intern, Tech Solutions Inc.'}</h4>
                <p>{selectedApplication.experienceDetails || 'Worked on developing responsive web applications using React and modern JavaScript.'}</p>
              </div>
            </div>

            {/* Resume Section */}
            {selectedApplication.resume && (
              <div className="RD-profile-section">
                <h3><FilePdfOutlined /> Resume</h3>
                <Button icon={<FilePdfOutlined />} type="primary">
                  View Resume
                </Button>
              </div>
            )}
          </div>
        )}
      </Modal>
      {/* Upcoming Interviews */}
      <div className="RD-upcoming-interviews">
        <h2><CodeOutlined/> Upcoming Interviews</h2>
        {loading ? (
          <Card className="RD-no-interviews">
            <Skeleton active paragraph={{ rows: 2 }} />
          </Card>
        ) : (
          <div className="RD-interviews-list">
            <div className="RD-no-interviews">
              <p>You have no upcoming interviews scheduled</p>
              <Link to="/recruiter-schedule-interview" className="RD-schedule-btn">
                <ClockCircleOutlined/> Schedule an Interview
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecruiterDashboard;