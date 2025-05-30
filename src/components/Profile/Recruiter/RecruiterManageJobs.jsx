import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Table, Tag, Button, Modal, Input, Select, DatePicker, Popconfirm, message } from 'antd';
import { 
  SearchOutlined, 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  FileTextOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ScheduleOutlined
} from '@ant-design/icons';
import moment from 'moment';
import './RecruiterManageJobs.css';

const { Search } = Input;
const { Option } = Select;

const RecruiterManageJobs = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  // Sample data - in a real app this would come from an API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const mockJobs = [
          {
            id: '1',
            title: 'Frontend Developer',
            department: 'Engineering',
            type: 'Full-time',
            location: 'Remote',
            applicants: 24,
            posted: '2023-05-10',
            deadline: '2023-06-15',
            status: 'active',
            salary: '$90,000 - $120,000'
          },
          {
            id: '2',
            title: 'UX Designer Intern',
            department: 'Design',
            type: 'Internship',
            location: 'New York, NY',
            applicants: 15,
            posted: '2023-05-15',
            deadline: '2023-06-01',
            status: 'active',
            salary: '$25 - $30/hr'
          },
          {
            id: '3',
            title: 'Senior Product Manager',
            department: 'Product',
            type: 'Full-time',
            location: 'San Francisco, CA',
            applicants: 42,
            posted: '2023-04-28',
            deadline: '2023-05-28',
            status: 'closed',
            salary: '$140,000 - $160,000'
          },
          {
            id: '4',
            title: 'DevOps Engineer',
            department: 'Engineering',
            type: 'Contract',
            location: 'Remote',
            applicants: 18,
            posted: '2023-05-20',
            deadline: '2023-06-30',
            status: 'draft',
            salary: '$70 - $90/hr'
          }
        ];
        
        setJobs(mockJobs);
        setFilteredJobs(mockJobs);
      } catch (error) {
        message.error('Failed to fetch jobs');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleSearch = (value) => {
    setSearchText(value);
    filterJobs(value, statusFilter);
  };

  const handleStatusFilter = (value) => {
    setStatusFilter(value);
    filterJobs(searchText, value);
  };

  const filterJobs = (search, status) => {
    let filtered = [...jobs];
    
    if (search) {
      filtered = filtered.filter(job => 
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.department.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    if (status !== 'all') {
      filtered = filtered.filter(job => job.status === status);
    }
    
    setFilteredJobs(filtered);
  };

  const getStatusTag = (status) => {
    let icon, color, text;
    
    switch (status) {
      case 'active':
        icon = <CheckCircleOutlined />;
        color = 'green';
        text = 'Active';
        break;
      case 'closed':
        icon = <CloseCircleOutlined />;
        color = 'red';
        text = 'Closed';
        break;
      case 'draft':
        icon = <ClockCircleOutlined />;
        color = 'orange';
        text = 'Draft';
        break;
      default:
        icon = <FileTextOutlined />;
        color = 'default';
        text = 'Unknown';
    }
    
    return (
      <Tag icon={icon} color={color}>
        {text}
      </Tag>
    );
  };

  const handleEditJob = (id) => {
    navigate(`/edit-job/${id}`);
  };

  const handleDeleteJob = (id) => {
    setJobs(jobs.filter(job => job.id !== id));
    setFilteredJobs(filteredJobs.filter(job => job.id !== id));
    message.success('Job posting deleted successfully');
  };

  const showJobDetails = (job) => {
    setSelectedJob(job);
    setIsModalVisible(true);
  };

  const columns = [
    {
      title: 'Job Title',
      dataIndex: 'title',
      key: 'title',
      responsive: ['md'],
      render: (text, record) => (
        <Button type="link" onClick={() => showJobDetails(record)}>
          {text}
        </Button>
      ),
      sorter: (a, b) => a.title.localeCompare(b.title)
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
      responsive: ['md'],
      sorter: (a, b) => a.department.localeCompare(b.department)
    },
    {
      title: 'Job Info',
      key: 'mobile-view',
      responsive: ['xs'],
      render: (_, record) => (
        <div className="RMJ-mobile-view">
          <div>
            <Button type="link" onClick={() => showJobDetails(record)}>
              {record.title}
            </Button>
          </div>
          <div className="RMJ-mobile-details">
            <span>{record.department}</span>
            <span>{record.type}</span>
            <span>{record.location}</span>
          </div>
          <div className="RMJ-mobile-status">{getStatusTag(record.status)}</div>
        </div>
      )
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      responsive: ['md'],
      sorter: (a, b) => a.type.localeCompare(b.type)
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
      sorter: (a, b) => a.location.localeCompare(b.location)
    },
    {
      title: 'Applicants',
      dataIndex: 'applicants',
      key: 'applicants',
      render: (applicants, record) => (
        <Link to={`/job/${record.id}/applicants`}>{applicants}</Link>
      ),
      sorter: (a, b) => a.applicants - b.applicants
    },
    {
      title: 'Posted Date',
      dataIndex: 'posted',
      key: 'posted',
      render: date => moment(date).format('MMM D, YYYY'),
      sorter: (a, b) => new Date(a.posted) - new Date(b.posted)
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: status => getStatusTag(status),
      filters: [
        { text: 'Active', value: 'active' },
        { text: 'Closed', value: 'closed' },
        { text: 'Draft', value: 'draft' }
      ],
      onFilter: (value, record) => record.status === value
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <div className="RMJ-action-buttons">
          <Button 
            icon={<EditOutlined />} 
            onClick={() => handleEditJob(record.id)}
            className="RMJ-edit-btn"
          />
          <Popconfirm
            title="Are you sure to delete this job posting?"
            onConfirm={() => handleDeleteJob(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button 
              icon={<DeleteOutlined />} 
              danger
              className="RMJ-delete-btn"
            />
          </Popconfirm>
        </div>
      )
    }
    
  ];

  return (
    <div className="RMJ-recruiter-manage-jobs">
      <div className="RMJ-page-header">
        <h1><ScheduleOutlined/> Manage Job Postings</h1>
        <div className="RMJ-header-actions">
          <Link to="/create-job" className="RMJ-create-job-btn">
            <PlusOutlined /> Post New Job
          </Link>
        </div>
      </div>

      <div className="RMJ-job-filters">
        <Search
          placeholder="Search jobs..."
          allowClear
          enterButton={<SearchOutlined />}
          size="large"
          onSearch={handleSearch}
          className="RMJ-search-input"
        />
        
        <Select
          defaultValue="all"
          onChange={handleStatusFilter}
          size="large"
          className="RMJ-status-filter"
        >
          <Option value="all">All Statuses</Option>
          <Option value="active">Active</Option>
          <Option value="closed">Closed</Option>
          <Option value="draft">Draft</Option>
        </Select>
      </div>

      <Table
        columns={columns}
        dataSource={filteredJobs}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10 }}
        className="RMJ-jobs-table"
      />

      <Modal
        title="Job Details"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setIsModalVisible(false)}>
            Close
          </Button>,
          <Button 
            key="applicants" 
            type="primary"
            onClick={() => {
              setIsModalVisible(false);
              navigate(`/job/${selectedJob?.id}/applicants`);
            }}
          >
            View Applicants
          </Button>
        ]}
        width={700}
      >
        {selectedJob && (
          <div className="RMJ-job-details">
            <div className="RMJ-detail-row">
              <span className="RMJ-detail-label">Job Title:</span>
              <span className="RMJ-detail-value">{selectedJob.title}</span>
            </div>
            <div className="RMJ-detail-row">
              <span className="RMJ-detail-label">Department:</span>
              <span className="RMJ-detail-value">{selectedJob.department}</span>
            </div>
            <div className="RMJ-detail-row">
              <span className="RMJ-detail-label">Job Type:</span>
              <span className="RMJ-detail-value">{selectedJob.type}</span>
            </div>
            <div className="RMJ-detail-row">
              <span className="RMJ-detail-label">Location:</span>
              <span className="RMJ-detail-value">{selectedJob.location}</span>
            </div>
            <div className="RMJ-detail-row">
              <span className="RMJ-detail-label">Salary Range:</span>
              <span className="RMJ-detail-value">{selectedJob.salary}</span>
            </div>
            <div className="RMJ-detail-row">
              <span className="RMJ-detail-label">Status:</span>
              <span className="RMJ-detail-value">{getStatusTag(selectedJob.status)}</span>
            </div>
            <div className="RMJ-detail-row">
              <span className="RMJ-detail-label">Posted Date:</span>
              <span className="RMJ-detail-value">
                {moment(selectedJob.posted).format('MMMM Do, YYYY')}
              </span>
            </div>
            <div className="RMJ-detail-row">
              <span className="RMJ-detail-label">Application Deadline:</span>
              <span className="RMJ-detail-value">
                {moment(selectedJob.deadline).format('MMMM Do, YYYY')}
              </span>
            </div>
            <div className="RMJ-detail-row">
              <span className="RMJ-detail-label">Total Applicants:</span>
              <span className="RMJ-detail-value">
                <Link to={`/job/${selectedJob.id}/applicants`}>
                  {selectedJob.applicants} applicants
                </Link>
              </span>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default RecruiterManageJobs;