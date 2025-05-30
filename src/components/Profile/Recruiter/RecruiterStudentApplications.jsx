import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Table, Tag, Button, Input, Select, DatePicker, Card, Avatar, Modal, message, Divider } from 'antd';
import {
  SearchOutlined,
  EyeOutlined,
  FilePdfOutlined,
  MailOutlined,
  ArrowLeftOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined
} from '@ant-design/icons';
import moment from 'moment';
import './RecruiterStudentApplications.css';
import { Dropdown, Menu } from 'antd';


const { Search } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;

// Add this import at the top with other imports
import { useLocation } from 'react-router-dom';

const RecruiterStudentApplications = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateRange, setDateRange] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isStatusDropdownVisible, setIsStatusDropdownVisible] = useState(false);

  useEffect(() => {
    // Parse query parameters to get position if available
    const queryParams = new URLSearchParams(location.search);
    const positionParam = queryParams.get('position');

    if (positionParam) {
      setSearchText(positionParam);
      // Don't call fetchApplications here, as it will be called in the next useEffect
    } else {
      fetchApplications();
    }
  }, [location.search]);

  // Add this new useEffect to respond to searchText changes
  useEffect(() => {
    if (searchText) {
      // Only refetch/filter if we have applications already loaded
      if (applications.length > 0) {
        filterApplications(searchText, statusFilter, dateRange);
      } else {
        fetchApplications();
      }
    }
  }, [searchText]);

  // Modify the fetchApplications function to apply the search filter immediately if searchText exists
  const fetchApplications = async () => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));

      // Mock data - replace with actual API call
      const mockApplications = [
        {
          id: '1',
          studentId: 's101',
          name: 'Alex Johnson',
          avatar: 'AJ',
          position: 'Frontend Developer',
          company: 'TechCorp',
          status: 'Under Review',
          appliedDate: '2023-05-15',
          matchScore: 92,
          resume: 'Alex_Johnson_Resume.pdf',
          coverLetter: 'Alex_Johnson_CoverLetter.pdf',
          skills: ['React', 'JavaScript', 'CSS', 'TypeScript'],
          education: [{
            institution: 'State University',
            degree: 'BSc',
            fieldOfStudy: 'Computer Science',
            startDate: '2020-09-01',
            endDate: '2024-05-30',
            description: 'Graduated with honors'
          }],
          experience: [{
            title: 'Frontend Developer',
            company: 'WebSolutions',
            location: 'Remote',
            startDate: '2021-06-01',
            endDate: '2023-06-01',
            description: 'Developed responsive web applications using React'
          }],
          notes: 'Strong portfolio with relevant projects'
        },
        {
          id: '2',
          studentId: 's102',
          name: 'Sarah Miller',
          avatar: 'SM',
          position: 'UX Designer Intern',
          company: 'TechCorp',
          status: 'Interview Scheduled',
          appliedDate: '2023-05-18',
          matchScore: 88,
          resume: 'Sarah_Miller_Resume.pdf',
          coverLetter: 'Sarah_Miller_CoverLetter.pdf',
          skills: ['Figma', 'UI/UX', 'User Research', 'Prototyping'],
          education: [{
            institution: 'State University',
            degree: 'BSc',
            fieldOfStudy: 'Computer Science',
            startDate: '2020-09-01',
            endDate: '2024-05-30',
            description: 'Graduated with honors'
          }],
          experience: [{
            title: 'Frontend Developer',
            company: 'WebSolutions',
            location: 'Remote',
            startDate: '2021-06-01',
            endDate: '2023-06-01',
            description: 'Developed responsive web applications using React'
          }],
          notes: 'Excellent design thinking skills'
        },
        {
          id: '3',
          studentId: 's103',
          name: 'Michael Chen',
          avatar: 'MC',
          position: 'Backend Engineer',
          company: 'TechCorp',
          status: 'Rejected',
          appliedDate: '2023-05-10',
          matchScore: 76,
          resume: 'Michael_Chen_Resume.pdf',
          coverLetter: 'Michael_Chen_CoverLetter.pdf',
          skills: ['Node.js', 'Python', 'SQL', 'AWS'],
          education: [{
            institution: 'State University',
            degree: 'BSc',
            fieldOfStudy: 'Computer Science',
            startDate: '2020-09-01',
            endDate: '2024-05-30',
            description: 'Graduated with honors'
          }],
          experience: [{
            title: 'Frontend Developer',
            company: 'WebSolutions',
            location: 'Remote',
            startDate: '2021-06-01',
            endDate: '2023-06-01',
            description: 'Developed responsive web applications using React'
          }],
          notes: 'Strong technical skills but not culture fit'
        },
        {
          id: '4',
          studentId: 's104',
          name: 'Emily Wilson',
          avatar: 'EW',
          position: 'Data Analyst',
          company: 'TechCorp',
          status: 'Offer Sent',
          appliedDate: '2023-05-22',
          matchScore: 95,
          resume: 'Emily_Wilson_Resume.pdf',
          coverLetter: 'Emily_Wilson_CoverLetter.pdf',
          skills: ['Python', 'SQL', 'Tableau', 'Machine Learning'],
          education: [{
            institution: 'State University',
            degree: 'BSc',
            fieldOfStudy: 'Computer Science',
            startDate: '2020-09-01',
            endDate: '2024-05-30',
            description: 'Graduated with honors'
          }],
          experience: [{
            title: 'Frontend Developer',
            company: 'WebSolutions',
            location: 'Remote',
            startDate: '2021-06-01',
            endDate: '2023-06-01',
            description: 'Developed responsive web applications using React'
          }],
          notes: 'Exceptional analytical skills, accepted offer'
        }
      ];

      setApplications(mockApplications);

      // Apply filters if searchText exists
      if (searchText) {
        const filtered = mockApplications.filter(app =>
          app.name.toLowerCase().includes(searchText.toLowerCase()) ||
          app.position.toLowerCase().includes(searchText.toLowerCase()) ||
          app.company.toLowerCase().includes(searchText.toLowerCase())
        );
        setFilteredApplications(filtered);
      } else {
        setFilteredApplications(mockApplications);
      }

      setLoading(false);
    } catch (error) {
      console.error('Error fetching applications:', error);
      setLoading(false);
    }
  };

  const handleSearch = (value) => {
    setSearchText(value);
    filterApplications(value, statusFilter, dateRange);
  };

  const handleStatusFilter = (value) => {
    setStatusFilter(value);
    filterApplications(searchText, value, dateRange);
  };

  const handleDateRange = (dates) => {
    setDateRange(dates);
    filterApplications(searchText, statusFilter, dates);
  };

  const filterApplications = (search, status, dates) => {
    let filtered = [...applications];

    // Filter by search text
    if (search) {
      filtered = filtered.filter(app =>
        app.name.toLowerCase().includes(search.toLowerCase()) ||
        app.position.toLowerCase().includes(search.toLowerCase()) ||
        app.company.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filter by status
    if (status && status !== 'all') {
      filtered = filtered.filter(app => app.status === status);
    }

    // Filter by date range
    if (dates && dates.length === 2) {
      const startDate = dates[0].startOf('day');
      const endDate = dates[1].endOf('day');
      filtered = filtered.filter(app => {
        const appDate = moment(app.appliedDate);
        return appDate.isBetween(startDate, endDate, null, '[]');
      });
    }

    setFilteredApplications(filtered);

    // Add this console log to debug
    console.log('Filtered applications:', filtered.length, 'Search text:', search);
  };

  const getStatusTag = (status) => {
    let icon, color;

    switch (status.toLowerCase()) {
      case 'under review':
        icon = <ClockCircleOutlined />;
        color = 'blue';
        break;
      case 'interview scheduled':
        icon = <CheckCircleOutlined />;
        color = 'purple';
        break;
      case 'offer sent':
        icon = <CheckCircleOutlined />;
        color = 'green';
        break;
      case 'rejected':
        icon = <CloseCircleOutlined />;
        color = 'red';
        break;
      default:
        icon = <ClockCircleOutlined />;
        color = 'default';
    }

    return (
      <Tag icon={icon} color={color}>
        {status.toUpperCase()}
      </Tag>
    );
  };

  const viewApplicationDetails = (application) => {
    setSelectedApplication(application);
    setIsModalVisible(true);
  };

  const handleStatusUpdate = (applicationId, newStatus) => {
    // Update the application status in the applications array
    const updatedApplications = applications.map(app =>
      app.id === applicationId ? { ...app, status: newStatus } : app
    );

    setApplications(updatedApplications);

    // Also update in filtered applications
    const updatedFilteredApplications = filteredApplications.map(app =>
      app.id === applicationId ? { ...app, status: newStatus } : app
    );

    setFilteredApplications(updatedFilteredApplications);

    // If the selected application is the one being updated, update it too
    if (selectedApplication && selectedApplication.id === applicationId) {
      setSelectedApplication({ ...selectedApplication, status: newStatus });
    }
  };

  const columns = [
    {
      title: 'Applicant',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <div className="RSA-applicant-cell">
          <Avatar size="large" className="RSA-applicant-avatar">
            {record.avatar}
          </Avatar>
          <div className="RSA-applicant-info">
            <strong>{text}</strong>
            <span>{record.position}</span>
          </div>
        </div>
      ),
      sorter: (a, b) => a.name.localeCompare(b.name)
    },
    {
      title: 'Applied Date',
      dataIndex: 'appliedDate',
      key: 'appliedDate',
      render: date => moment(date).format('MMM D, YYYY'),
      sorter: (a, b) => new Date(a.appliedDate) - new Date(b.appliedDate)
    },
    {
      title: 'Match Score',
      dataIndex: 'matchScore',
      key: 'matchScore',
      render: score => (
        <div className={`match-score ${score > 89 ? 'excellent' : score > 79 ? 'good' : 'fair'}`}>
          {score}%
        </div>
      ),
      sorter: (a, b) => a.matchScore - b.matchScore
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: status => getStatusTag(status),
      filters: [
        { text: 'Under Review', value: 'Under Review' },
        { text: 'Interview Scheduled', value: 'Interview Scheduled' },
        { text: 'Offer Sent', value: 'Offer Sent' },
        { text: 'Rejected', value: 'Rejected' }
      ],
      onFilter: (value, record) => record.status === value
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <div className="RSA-action-buttons">
          <Button
            icon={<EyeOutlined />}
            onClick={() => viewApplicationDetails(record)}
            className="RSA-view-btn"
          />
          <Button
            icon={<MailOutlined />}
            onClick={() => message.info(`Email sent to ${record.name}`)}
            className="RSA-email-btn"
          />
          <Select
            defaultValue={record.status}
            onChange={(value) => handleStatusUpdate(record.id, value)}
            className="RSA-status-select"
          >
            <Option value="Under Review">Under Review</Option>
            <Option value="Interview Scheduled">Interview</Option>
            <Option value="Offer Sent">Offer</Option>
            <Option value="Rejected">Reject</Option>
          </Select>
        </div>
      )
    }
  ];

  return (
    <div className="RSA-recruiter-student-applications">
      <div className="RSA-applications-header">
        {/* <Button
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate(-1)}
          className="RSA-back-button"
        >
          Back to Dashboard
        </Button> */}
        <h1>Student Applications</h1>
        <p>View and manage all applications for your company</p>
      </div>

      <div className="RSA-applications-filters">
        <Search
          placeholder="Search by name, position, or company"
          onSearch={handleSearch}
          onChange={(e) => handleSearch(e.target.value)}
          value={searchText}  // Make sure this line exists
          style={{ width: 300 }}
        />

        <Select
          defaultValue="all"
          onChange={handleStatusFilter}
          size="large"
          className="RSA-status-filter"
        >
          <Option value="all">All Statuses</Option>
          <Option value="Under Review">Under Review</Option>
          <Option value="Interview Scheduled">Interview Scheduled</Option>
          <Option value="Offer Sent">Offer Sent</Option>
          <Option value="Rejected">Rejected</Option>
        </Select>

        <RangePicker
          onChange={handleDateRange}
          size="large"
          className="RSA-date-range-picker"
        />
      </div>

      <Card className="RSA-applications-table-card">
        <Table
          columns={columns}
          dataSource={filteredApplications}
          rowKey="id"
          loading={loading}
          pagination={{ pageSize: 10 }}
          className="RSA-applications-table"
        />
      </Card>

      <Modal
        title={`${selectedApplication?.name}'s Profile`}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setIsModalVisible(false)}>
            Close
          </Button>,
          <Button
            key="contact"
            type="primary"
            icon={<MailOutlined />}
            onClick={() => {
              setIsModalVisible(false);
              message.info(`Email sent to ${selectedApplication?.name}`);
            }}
          >
            Contact Applicant
          </Button>,
          // Then in the modal footer array:
          <Dropdown
            key="status"
            overlay={
              <Menu onClick={({ key }) => {
                handleStatusUpdate(selectedApplication.id, key);
                message.success(`Status updated to ${key}`);
              }}>
                <Menu.Item key="Under Review">Under Review</Menu.Item>
                <Menu.Item key="Interview Scheduled">Interview Scheduled</Menu.Item>
                <Menu.Item key="Offer Sent">Offer Sent</Menu.Item>
                <Menu.Item key="Rejected">Rejected</Menu.Item>
              </Menu>
            }
            trigger={['click']}
          >
            <Button type="default">Change Status</Button>
          </Dropdown>
        ]}
        width={900}
        className="RSA-student-profile-modal"
      >
        {selectedApplication && (
          <div className="RSA-student-profile-view">
            {/* Personal Information Section */}
            <div className="RSA-profile-section">
              <div className="RSA-profile-header">
                <Avatar size={80} className="RSA-profile-avatar">
                  {selectedApplication.avatar}
                </Avatar>
                <div className="RSA-profile-title">
                  <h2>{selectedApplication.name}</h2>
                  <p>Applied for: {selectedApplication.position}</p>
                  <div className="RSA-profile-status">
                    {getStatusTag(selectedApplication.status)}
                    <span className="RSA-match-score">
                      Match Score: <strong>{selectedApplication.matchScore}%</strong>
                    </span>
                  </div>
                </div>
              </div>

              <Divider />

              <div className="RSA-personal-info-grid">
                <div className="RSA-info-item">
                  <span className="RSA-info-label">Email:</span>
                  <span className="RSA-info-value">
                    <a href={`mailto:${selectedApplication.email}`}>{selectedApplication.email}</a>
                  </span>
                </div>
                <div className="RSA-info-item">
                  <span className="RSA-info-label">Phone:</span>
                  <span className="RSA-info-value">{selectedApplication.phone || 'Not provided'}</span>
                </div>
                <div className="RSA-info-item">
                  <span className="RSA-info-label">University:</span>
                  <span className="RSA-info-value">{selectedApplication.university}</span>
                </div>
                <div className="RSA-info-item">
                  <span className="RSA-info-label">Major:</span>
                  <span className="RSA-info-value">{selectedApplication.major}</span>
                </div>
                <div className="RSA-info-item">
                  <span className="RSA-info-label">Graduation Year:</span>
                  <span className="RSA-info-value">{selectedApplication.graduationYear}</span>
                </div>
                <div className="RSA-info-item">
                  <span className="RSA-info-label">GPA:</span>
                  <span className="RSA-info-value">{selectedApplication.gpa}</span>
                </div>
              </div>
            </div>

            {/* Bio Section */}
            {selectedApplication.bio && (
              <div className="RSA-profile-section">
                <h3>About</h3>
                <p className="RSA-bio-content">{selectedApplication.bio}</p>
              </div>
            )}

            {/* Skills Section */}
            <div className="RSA-profile-section">
              <h3>Skills</h3>
              <div className="RSA-skills-container">
                {selectedApplication.skills.map((skill, index) => (
                  <Tag key={index} className="RSA-skill-tag">{skill}</Tag>
                ))}
              </div>
            </div>

            {/* Education Section */}
            <div className="RSA-profile-section">
              <h3>Education</h3>
              {Array.isArray(selectedApplication.education) ? (
                selectedApplication.education.map((edu, index) => (
                  <div key={index} className="RSA-education-item">
                    <h4>{edu.institution}</h4>
                    <p>{edu.degree} in {edu.fieldOfStudy}</p>
                    <p className="RSA-date-range">
                      {moment(edu.startDate).format('MMM YYYY')} - {moment(edu.endDate).format('MMM YYYY')}
                    </p>
                    {edu.description && <p className="RSA-description">{edu.description}</p>}
                  </div>
                ))
              ) : (
                <div className="RSA-education-item">
                  <p>{selectedApplication.education}</p>
                </div>
              )}
            </div>

            {/* Experience Section */}
            <div className="RSA-profile-section">
              <h3>Experience</h3>
              {Array.isArray(selectedApplication.experience) ? (
                selectedApplication.experience.map((exp, index) => (
                  <div key={index} className="RSA-experience-item">
                    <h4>{exp.title} at {exp.company}</h4>
                    <p className="RSA-location">{exp.location}</p>
                    <p className="RSA-date-range">
                      {moment(exp.startDate).format('MMM YYYY')} - {moment(exp.endDate).format('MMM YYYY')}
                    </p>
                    {exp.description && <p className="RSA-description">{exp.description}</p>}
                  </div>
                ))
              ) : (
                <div className="RSA-experience-item">
                  <p>{selectedApplication.experience}</p>
                </div>
              )}
            </div>

            {/* Resume Section - Add this section */}
            <div className="RSA-profile-section">
              <h3>Resume</h3>
              <div className="RSA-resume-box">
                <p><FilePdfOutlined /> {selectedApplication.resume}</p>
                <Button type="primary" size="small">
                  View Resume
                </Button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default RecruiterStudentApplications;
