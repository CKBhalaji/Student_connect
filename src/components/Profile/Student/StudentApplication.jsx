import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Table, Input, Button, Space, Tag, DatePicker,
  Modal, Tabs, Timeline, Card, Avatar, Tooltip,
  Divider, Badge, Empty, Spin
} from 'antd';
import {
  SearchOutlined, FilterOutlined, CalendarOutlined,
  FileTextOutlined, MailOutlined, EyeOutlined,
  CheckCircleOutlined, CloseCircleOutlined, ClockCircleOutlined,
  UserOutlined, BuildOutlined, EnvironmentOutlined, DollarOutlined
} from '@ant-design/icons';
import './StudentApplication.css';

const { RangePicker } = DatePicker;
const { TabPane } = Tabs;

const StudentApplication = () => {
  // State variables
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [dateRange, setDateRange] = useState(null);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('1');

  // Fetch applications data
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockApplications = [
        {
          id: 1,
          position: 'Frontend Developer Intern',
          company: 'Tech Solutions Inc.',
          companyLogo: 'https://randomuser.me/api/portraits/men/1.jpg',
          status: 'Under Review',
          appliedDate: '2023-05-15',
          deadline: '2023-06-15',
          location: 'San Francisco, CA',
          jobType: 'Internship',
          salary: '$25-30/hr',
          description: 'Looking for a passionate frontend developer intern to join our team...',
          requirements: [
            'Proficiency in JavaScript, HTML, CSS',
            'Experience with React or similar frameworks',
            'Understanding of responsive design principles'
          ],
          timeline: [
            { date: '2023-05-15', status: 'Application Submitted', description: 'Your application was received.' },
            { date: '2023-05-18', status: 'Under Review', description: 'Your application is being reviewed by the hiring team.' }
          ],
          notes: 'Follow up with HR next week if no response.'
        },
        {
          id: 2,
          position: 'Data Analyst',
          company: 'Data Insights LLC',
          companyLogo: 'https://randomuser.me/api/portraits/women/2.jpg',
          status: 'Interview Scheduled',
          appliedDate: '2023-05-10',
          deadline: '2023-05-30',
          location: 'Remote',
          jobType: 'Full-time',
          salary: '$70,000-85,000/year',
          description: 'Seeking a data analyst to help interpret complex datasets...',
          requirements: [
            'Strong SQL and database knowledge',
            'Experience with data visualization tools',
            'Statistical analysis skills'
          ],
          timeline: [
            { date: '2023-05-10', status: 'Application Submitted', description: 'Your application was received.' },
            { date: '2023-05-12', status: 'Under Review', description: 'Your application is being reviewed by the hiring team.' },
            { date: '2023-05-17', status: 'Interview Scheduled', description: 'You have been selected for an interview on May 25th.' }
          ],
          notes: 'Prepare case study presentation for the interview.'
        },
        {
          id: 3,
          position: 'Software Engineer',
          company: 'Innovate Systems',
          companyLogo: 'https://randomuser.me/api/portraits/men/3.jpg',
          status: 'Offer Received',
          appliedDate: '2023-04-20',
          deadline: '2023-05-10',
          location: 'Boston, MA',
          jobType: 'Full-time',
          salary: '$90,000-110,000/year',
          description: 'Join our engineering team to build scalable software solutions...',
          requirements: [
            'Bachelors degree in Computer Science or related field',
            '2+ years of software development experience',
            'Proficiency in Java or Python'
          ],
          timeline: [
            { date: '2023-04-20', status: 'Application Submitted', description: 'Your application was received.' },
            { date: '2023-04-25', status: 'Under Review', description: 'Your application is being reviewed by the hiring team.' },
            { date: '2023-05-02', status: 'Interview Scheduled', description: 'You have been selected for an interview.' },
            { date: '2023-05-10', status: 'Technical Assessment', description: 'Completed technical assessment.' },
            { date: '2023-05-15', status: 'Final Interview', description: 'Completed final round interview with the team.' },
            { date: '2023-05-20', status: 'Offer Received', description: 'Received job offer.' }
          ],
          notes: 'Need to respond to offer by June 1st.'
        },
        {
          id: 4,
          position: 'UX/UI Designer',
          company: 'Creative Digital',
          companyLogo: 'https://randomuser.me/api/portraits/women/4.jpg',
          status: 'Rejected',
          appliedDate: '2023-04-15',
          deadline: '2023-05-05',
          location: 'Chicago, IL',
          jobType: 'Contract',
          salary: '$40-50/hr',
          description: 'Looking for a creative UX/UI designer to improve our product experience...',
          requirements: [
            'Portfolio demonstrating UX/UI design skills',
            'Experience with Figma or Adobe XD',
            'Understanding of user-centered design principles'
          ],
          timeline: [
            { date: '2023-04-15', status: 'Application Submitted', description: 'Your application was received.' },
            { date: '2023-04-20', status: 'Under Review', description: 'Your application is being reviewed by the hiring team.' },
            { date: '2023-05-01', status: 'Rejected', description: 'Unfortunately, we have decided to move forward with other candidates.' }
          ],
          notes: 'Received feedback on portfolio - need to improve mobile design examples.'
        }
      ];

      setApplications(mockApplications);
      setFilteredApplications(mockApplications);
      setLoading(false);
    }, 1500);
  }, []);

  // Filter applications based on search text, status, and date range
  useEffect(() => {
    filterApplications();
  }, [searchText, statusFilter, dateRange, applications]);

  const filterApplications = () => {
    let filtered = [...applications];

    // Filter by search text
    if (searchText) {
      filtered = filtered.filter(app =>
        app.position.toLowerCase().includes(searchText.toLowerCase()) ||
        app.company.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter !== 'All') {
      filtered = filtered.filter(app => app.status === statusFilter);
    }

    // Filter by date range
    if (dateRange) {
      const [start, end] = dateRange;
      filtered = filtered.filter(app => {
        const appDate = new Date(app.appliedDate);
        return appDate >= start && appDate <= end;
      });
    }

    setFilteredApplications(filtered);
  };

  // View application details
  const viewApplicationDetails = (application) => {
    setSelectedApplication(application);
    setIsModalVisible(true);
  };

  // Get status tag color
  const getStatusColor = (status) => {
    switch (status) {
      case 'Under Review':
        return 'processing';
      case 'Interview Scheduled':
        return 'warning';
      case 'Offer Received':
        return 'success';
      case 'Rejected':
        return 'error';
      default:
        return 'default';
    }
  };

  // Get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case 'Under Review':
        return <ClockCircleOutlined />;
      case 'Interview Scheduled':
        return <CalendarOutlined />;
      case 'Offer Received':
        return <CheckCircleOutlined />;
      case 'Rejected':
        return <CloseCircleOutlined />;
      default:
        return null;
    }
  };

  // Table columns
  const columns = [
    {
      title: 'Position',
      dataIndex: 'position',
      key: 'position',
      render: (text, record) => (
        <div className="SA-position-cell">
          <Avatar 
            src={record.companyLogo} 
            icon={<BuildOutlined />} 
            size={40} 
          />
          <div className="SA-position-info">
            <div className="SA-position-title">{text}</div>
            <div className="SA-company-name">{record.company}</div>
          </div>
        </div>
      ),
      responsive: ['xs', 'sm', 'md', 'lg', 'xl']
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
      render: location => (
        <span>
          <EnvironmentOutlined /> {location}
        </span>
      ),
      responsive: ['md', 'lg', 'xl']
    },
    {
      title: 'Job Type',
      dataIndex: 'jobType',
      key: 'jobType',
      render: type => (
        <Tag color="blue">{type}</Tag>
      ),
      responsive: ['md', 'lg', 'xl']
    },
    {
      title: 'Applied Date',
      dataIndex: 'appliedDate',
      key: 'appliedDate',
      sorter: (a, b) => new Date(a.appliedDate) - new Date(b.appliedDate),
      responsive: ['md', 'lg', 'xl']
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: status => (
        <Tag className="SA-status-tag" icon={getStatusIcon(status)} color={getStatusColor(status)}>
          {status}
        </Tag>
      ),
      responsive: ['xs', 'sm', 'md', 'lg', 'xl']
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle" className="SA-action-buttons">
          <Button 
            type="primary" 
            icon={<EyeOutlined />} 
            onClick={() => viewApplicationDetails(record)}
          >
            View
          </Button>
          <Button 
            icon={<MailOutlined />} 
            onClick={() => console.log('Follow up email')}
          >
            Follow Up
          </Button>
        </Space>
      ),
      responsive: ['sm', 'md', 'lg', 'xl']
    },
  ];

  return (
    <div className="SA-student-applications-container">
      {/* <div className="SA-page-header"> */}
      <section className="SA-studentap-hero">
        <div className="SA-student-content">
          <h1>My Applications</h1>
          <p>Track and manage all your job applications</p>
        </div>
      </section>
      {/* </div> */}

      <Card className="SA-filter-card">
        <div className="SA-filters-container">
          <Input
            placeholder="Search by position or company"
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            className="SA-search-input"
            allowClear
          />

          <div className="SA-status-filter">
            <span className="SA-filter-label"><FilterOutlined /> Status:</span>
            <div className="SA-status-buttons">
              {['All', 'Under Review', 'Interview Scheduled', 'Offer Received', 'Rejected'].map(status => (
                <Button
                  key={status}
                  type={statusFilter === status ? 'primary' : 'default'}
                  onClick={() => setStatusFilter(status)}
                  className="SA-status-button"
                >
                  {status}
                </Button>
              ))}
            </div>
          </div>

          <div className="SA-date-filter">
            <span className="SA-filter-label"><CalendarOutlined /> Applied Date:</span>
            <RangePicker
              onChange={(dates) => setDateRange(dates)}
              className="SA-date-picker"
            />
          </div>
        </div>
      </Card>

      <div className="SA-applications-stats">
        <Card className="SA-stat-card">
          <div className="SA-stat-value">{applications.length}</div>
          <div className="SA-stat-label">Total Applications</div>
        </Card>
        <Card className="SA-stat-card">
          <div className="SA-stat-value">
            {applications.filter(app => app.status === 'Under Review').length}
          </div>
          <div className="SA-stat-label">Under Review</div>
        </Card>
        <Card className="SA-stat-card">
          <div className="SA-stat-value">
            {applications.filter(app => app.status === 'Interview Scheduled').length}
          </div>
          <div className="SA-stat-label">Interviews</div>
        </Card>
        <Card className="SA-stat-card">
          <div className="SA-stat-value">
            {applications.filter(app => app.status === 'Offer Received').length}
          </div>
          <div className="SA-stat-label">Offers</div>
        </Card>
      </div>

      <Card className="SA-applications-table-card">
        {loading ? (
          <div className="SA-loading-container">
            <Spin size="large" />
            <p>Loading your applications...</p>
          </div>
        ) : filteredApplications.length > 0 ? (
          <Table 
            columns={columns} 
            dataSource={filteredApplications}
            rowKey="id"
            pagination={{ pageSize: 10 }}
            className="SA-applications-table"
            scroll={{ x: true }}
            responsive
          />
        ) : (
          <Empty
            description={
              <span>
                No applications match your filters.
                <Link to="/jobs">Browse jobs</Link> to apply.
              </span>
            }
          />
        )}
      </Card>

      {/* Application Details Modal */}
      <Modal
        title={selectedApplication?.position}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        width={800}
        footer={[
          <Button key="close" onClick={() => setIsModalVisible(false)}>
            Close
          </Button>,
          <Button
            key="followUp"
            type="primary"
            icon={<MailOutlined />}
            onClick={() => {
              setIsModalVisible(false);
              console.log('Follow up email');
            }}
          >
            Follow Up
          </Button>
        ]}
      >
        {selectedApplication && (
          <div className="SA-application-details">
            <div className="SA-company-header">
              <Avatar
                src={selectedApplication.companyLogo}
                icon={<BuildOutlined />}
                size={64}
              />
              <div className="SA-company-info">
                <h2>{selectedApplication.company}</h2>
                <div className="SA-job-meta">
                  <span><EnvironmentOutlined /> {selectedApplication.location}</span>
                  <span><DollarOutlined /> {selectedApplication.salary}</span>
                  <Tag color="blue">{selectedApplication.jobType}</Tag>
                </div>
              </div>
              <div className="SA-application-status">
                <Badge
                  status={getStatusColor(selectedApplication.status)}
                  text={selectedApplication.status}
                />
              </div>
            </div>

            <Divider />

            <Tabs activeKey={activeTab} onChange={setActiveTab}>
              <TabPane tab="Job Details" key="1">
                <div className="SA-job-details">
                  <h3>Job Description</h3>
                  <p>{selectedApplication.description}</p>

                  <h3>Requirements</h3>
                  <ul>
                    {selectedApplication.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>

                  <div className="SA-application-dates">
                    <div className="SA-date-item">
                      <span className="SA-date-label">Applied On:</span>
                      <span className="SA-date-value">{selectedApplication.appliedDate}</span>
                    </div>
                    <div className="SA-date-item">
                      <span className="SA-date-label">Deadline:</span>
                      <span className="SA-date-value">{selectedApplication.deadline}</span>
                    </div>
                  </div>
                </div>
              </TabPane>

              <TabPane tab="Application Timeline" key="2">
                <Timeline mode="left">
                  {selectedApplication.timeline.map((item, index) => (
                    <Timeline.Item
                      key={index}
                      color={getStatusColor(item.status)}
                      label={item.date}
                    >
                      <div className="SA-timeline-item">
                        <h4>{item.status}</h4>
                        <p>{item.description}</p>
                      </div>
                    </Timeline.Item>
                  ))}
                </Timeline>
              </TabPane>

              <TabPane tab="Notes" key="3">
                <div className="SA-notes-section">
                  <p>{selectedApplication.notes || 'No notes added yet.'}</p>
                  <Input.TextArea
                    rows={4}
                    placeholder="Add notes about this application..."
                    defaultValue={selectedApplication.notes}
                  />
                  <Button
                    type="primary"
                    style={{ marginTop: 16 }}
                    onClick={() => console.log('Save notes')}
                  >
                    Save Notes
                  </Button>
                </div>
              </TabPane>
            </Tabs>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default StudentApplication;