import React, { useState, useEffect } from 'react';
import { useAuth } from '../../config/AuthContext';
import {
  Card,
  Table,
  Tag,
  Space,
  Button,
  Modal,
  message,
  Input,
  Select,
  Statistic,
  Row,
  Col,
  Form,
  Upload,
  Avatar,
  Divider,
  Descriptions
} from 'antd';
import {
  UserOutlined,
  SolutionOutlined,
  BarChartOutlined,
  SettingOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  SearchOutlined,
  CameraOutlined,
  SaveOutlined,
  CloseOutlined
} from '@ant-design/icons';
import './AdminPanel.css';

const { Option } = Select;
const { Search } = Input;
const { Item } = Descriptions;

const AdminPanel = () => {
  const { userData, updateUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [isUserModalVisible, setIsUserModalVisible] = useState(false);
  const [isJobModalVisible, setIsJobModalVisible] = useState(false);
  const [isProfileEditMode, setIsProfileEditMode] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentJob, setCurrentJob] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeJobs: 0,
    totalApplications: 0,
    newUsersThisMonth: 0
  });
  const [profileForm] = Form.useForm();

  useEffect(() => {
    fetchDashboardData();
    if (userData) {
      profileForm.setFieldsValue({
        name: userData.name,
        email: userData.email,
        phone: userData.phone || '',
        position: userData.position || 'Administrator'
      });
    }
  }, [userData]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // Simulate API calls
      await new Promise(resolve => setTimeout(resolve, 800));

      // Mock data
      const mockUsers = [
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'student', status: 'active', createdAt: '2023-01-15' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'recruiter', status: 'active', createdAt: '2023-02-20' },
        { id: 3, name: 'Admin User', email: 'admin@example.com', role: 'admin', status: 'active', createdAt: '2023-01-10' },
        { id: 4, name: 'Mike Johnson', email: 'mike@example.com', role: 'student', status: 'inactive', createdAt: '2023-03-05' },
        { id: 5, name: 'Sarah Williams', email: 'sarah@example.com', role: 'recruiter', status: 'active', createdAt: '2023-03-15' },
      ];

      const mockJobs = [
        { id: 1, title: 'Frontend Developer', company: 'Tech Corp', status: 'active', applications: 24, createdAt: '2023-03-01' },
        { id: 2, title: 'Backend Engineer', company: 'Data Systems', status: 'active', applications: 18, createdAt: '2023-03-05' },
        { id: 3, title: 'UX Designer', company: 'Creative Solutions', status: 'closed', applications: 12, createdAt: '2023-02-15' },
        { id: 4, title: 'Data Scientist', company: 'Analytics Inc', status: 'active', applications: 32, createdAt: '2023-03-10' },
      ];

      setUsers(mockUsers);
      setJobs(mockJobs);
      setStats({
        totalUsers: mockUsers.length,
        activeJobs: mockJobs.filter(job => job.status === 'active').length,
        totalApplications: mockJobs.reduce((sum, job) => sum + job.applications, 0),
        newUsersThisMonth: mockUsers.filter(user => new Date(user.createdAt) > new Date('2023-03-01')).length
      });
    } catch (error) {
      message.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleProfileSave = async () => {
    try {
      const values = await profileForm.validateFields();
      // Simulate API call to update profile
      await new Promise(resolve => setTimeout(resolve, 500));
      updateUser(values);
      message.success('Profile updated successfully');
      setIsProfileEditMode(false);
    } catch (error) {
      message.error('Failed to update profile');
    }
  };

  const handleAvatarChange = (info) => {
    if (info.file.status === 'done') {
      message.success('Avatar updated successfully');
      // Update user context with new avatar URL
      updateUser({ ...userData, avatar: info.file.response.url });
    }
  };

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const handleUserEdit = (user) => {
    setCurrentUser(user);
    setIsUserModalVisible(true);
  };

  const handleJobEdit = (job) => {
    setCurrentJob(job);
    setIsJobModalVisible(true);
  };

  const handleDeleteUser = (id) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this user?',
      content: 'This action cannot be undone.',
      onOk: () => {
        setUsers(users.filter(user => user.id !== id));
        message.success('User deleted successfully');
      }
    });
  };

  const handleDeleteJob = (id) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this job?',
      content: 'All applications for this job will also be deleted.',
      onOk: () => {
        setJobs(jobs.filter(job => job.id !== id));
        message.success('Job deleted successfully');
      }
    });
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchText.toLowerCase()) ||
    user.email.toLowerCase().includes(searchText.toLowerCase())
  );

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchText.toLowerCase()) ||
    job.company.toLowerCase().includes(searchText.toLowerCase())
  );

  const userColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <div className="AP-user-cell">
          <div className="AP-user-avatar">
            <UserOutlined />
          </div>
          <div>
            <div className="AP-user-name">{text}</div>
            <div className="AP-user-email">{record.email}</div>
          </div>
        </div>
      ),
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role) => (
        <Tag color={role === 'admin' ? 'red' : role === 'recruiter' ? 'blue' : 'green'}>
          {role.toUpperCase()}
        </Tag>
      ),
      filters: [
        { text: 'Student', value: 'student' },
        { text: 'Recruiter', value: 'recruiter' },
        { text: 'Admin', value: 'admin' },
      ],
      onFilter: (value, record) => record.role === value,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'active' ? 'green' : 'orange'}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Joined',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => new Date(date).toLocaleDateString(),
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => handleUserEdit(record)}
          />
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteUser(record.id)}
          />
        </Space>
      ),
    },
  ];

  const jobColumns = [
    {
      title: 'Job Title',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => (
        <div>
          <div className="AP-job-title">{text}</div>
          <div className="AP-job-company">{record.company}</div>
        </div>
      ),
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'active' ? 'green' : 'red'}>
          {status.toUpperCase()}
        </Tag>
      ),
      filters: [
        { text: 'Active', value: 'active' },
        { text: 'Closed', value: 'closed' },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: 'Applications',
      dataIndex: 'applications',
      key: 'applications',
      sorter: (a, b) => a.applications - b.applications,
    },
    {
      title: 'Posted',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => new Date(date).toLocaleDateString(),
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => handleJobEdit(record)}
          />
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteJob(record.id)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="AP-admin-panel">
      <div className="AP-admin-header">
        <h1>Admin Dashboard</h1>
        <p>Welcome back, {userData?.name || 'Admin'}!</p>
      </div>

      <Row gutter={[16, 16]}>
        {/* Profile Section */}
        <Col xs={24} lg={8} >
          <Card
            title="Admin Profile"
            className="AP-profile-card"
            extra={
              isProfileEditMode ? (
                <Space>
                  <Button
                    icon={<CloseOutlined />}
                    onClick={() => setIsProfileEditMode(false)}
                  />
                  <Button
                    type="primary"
                    icon={<SaveOutlined />}
                    onClick={handleProfileSave}
                  />
                </Space>
              ) : (
                <Button
                  icon={<EditOutlined />}
                  onClick={() => setIsProfileEditMode(true)}
                />
              )
            }
          >
            <div className="AP-profile-content">
              <div className="AP-avatar-upload">
                <Avatar
                  size={128}
                  src={userData?.avatar || <UserOutlined />}
                  className="AP-profile-avatar"
                />
                {isProfileEditMode && (
                  <Upload
                    name="avatar"
                    action="/api/upload-avatar"
                    onChange={handleAvatarChange}
                    showUploadList={false}
                    className="AP-avatar-upload-btn"
                  >
                    <Button icon={<CameraOutlined />}>Change</Button>
                  </Upload>
                )}
              </div>

              {isProfileEditMode ? (
                <Form form={profileForm} layout="vertical">
                  <Form.Item name="name" label="Full Name" rules={[{ required: true }]}>
                    <Input />
                  </Form.Item>
                  <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
                    <Input />
                  </Form.Item>
                  <Form.Item name="phone" label="Phone Number">
                    <Input />
                  </Form.Item>
                  <Form.Item name="position" label="Position">
                    <Input />
                  </Form.Item>
                </Form>
              ) : (
                <Descriptions column={1} className="AP-profile-info">
                  <Item label="Name">{userData?.name}</Item>
                  <Item label="Email">{userData?.email}</Item>
                  <Item label="Phone">{userData?.phone || 'Not set'}</Item>
                  <Item label="Position">{userData?.position || 'Administrator'}</Item>
                  <Item label="Role">Admin</Item>
                  <Item label="Member Since">
                    {userData?.createdAt ? new Date(userData.createdAt).toLocaleDateString() : 'N/A'}
                  </Item>
                </Descriptions>
              )}
            </div>
          </Card>
        </Col>

        {/* Stats Overview */}
        <Col span={16}>
          <Row gutter={[16, 16]} className="AP-stats-row">
            <Col xs={24} lg={6}>
              <Card className="AP-stat-card">
                <Statistic
                  title="Total Users"
                  value={stats.totalUsers}
                  prefix={<UserOutlined />}
                />
              </Card>
            </Col>
            <Col xs={24} lg={6}>
              <Card className="AP-stat-card">
                <Statistic
                  title="Active Jobs"
                  value={stats.activeJobs}
                  prefix={<SolutionOutlined />}
                />
              </Card>
            </Col>
            <Col xs={24} lg={6}>
              <Card className="AP-stat-card">
                <Statistic
                  title="Total Applications"
                  value={stats.totalApplications}
                  prefix={<BarChartOutlined />}
                />
              </Card>
            </Col>
            <Col xs={24} lg={6}>
              <Card className="AP-stat-card">
                <Statistic
                  title="New Users (This Month)"
                  value={stats.newUsersThisMonth}
                  prefix={<UserOutlined />}
                />
              </Card>
            </Col>
          </Row>

          <Divider />

          {/* User Management */}
          <Card
            title={
              <div className="AP-section-header">
                <UserOutlined className="AP-section-icon" />
                <span>User Management</span>
                <div className="AP-section-actions">
                  <Search
                    placeholder="Search users..."
                    allowClear
                    enterButton={<SearchOutlined />}
                    onSearch={handleSearch}
                    className="AP-search-input"
                  />
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => {
                      setCurrentUser(null);
                      setIsUserModalVisible(true);
                    }}
                  >
                    Add User
                  </Button>
                </div>
              </div>
            }
            className="AP-management-card"
          >
            <Table
              className="AP-responsive-table"
              scroll={{ x: 'max-content' }}
              pagination={{ responsive: true }}
              columns={userColumns}
              dataSource={filteredUsers}
              rowKey="id"
              loading={loading}
            // pagination={{ pageSize: 5 }}
            />
          </Card>

          {/* Job Management */}
          <Card
            title={
              <div className="AP-section-header">
                <SolutionOutlined className="AP-section-icon" />
                <span>Job Management</span>
                <div className="AP-section-actions">
                  <Search
                    placeholder="Search jobs..."
                    allowClear
                    enterButton={<SearchOutlined />}
                    onSearch={handleSearch}
                    className="AP-search-input"
                  />
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => {
                      setCurrentJob(null);
                      setIsJobModalVisible(true);
                    }}
                  >
                    Add Job
                  </Button>
                </div>
              </div>
            }
            className="AP-management-card"
          >
            <Table
              className="AP-responsive-table"
              scroll={{ x: 'max-content' }}
              pagination={{ responsive: true }}
              columns={jobColumns}
              dataSource={filteredJobs}
              rowKey="id"
              loading={loading}
            // pagination={{ pageSize: 5 }}
            />
          </Card>
        </Col>
      </Row>

      {/* User Modal */}
      <Modal
        className="AP-responsive-modal"
        width={window.innerWidth > 768 ? 520 : '95%'}
        title={currentUser ? 'Edit User' : 'Add New User'}
        visible={isUserModalVisible}
        onCancel={() => setIsUserModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsUserModalVisible(false)}>
            Cancel
          </Button>,
          <Button key="submit" type="primary">
            {currentUser ? 'Update' : 'Create'}
          </Button>,
        ]}
      >
        <div className="AP-form-group">
          <label>Name</label>
          <Input defaultValue={currentUser?.name} />
        </div>
        <div className="AP-form-group">
          <label>Email</label>
          <Input defaultValue={currentUser?.email} />
        </div>
        <div className="AP-form-group">
          <label>Role</label>
          <Select defaultValue={currentUser?.role || 'student'} style={{ width: '100%' }}>
            <Option value="student">Student</Option>
            <Option value="recruiter">Recruiter</Option>
            <Option value="admin">Admin</Option>
          </Select>
        </div>
        <div className="AP-form-group">
          <label>Status</label>
          <Select defaultValue={currentUser?.status || 'active'} style={{ width: '100%' }}>
            <Option value="active">Active</Option>
            <Option value="inactive">Inactive</Option>
          </Select>
        </div>
      </Modal>

      {/* Job Modal */}
      <Modal
        className="responsive-modal"
        width={window.innerWidth > 768 ? 520 : '95%'}
        title={currentJob ? 'Edit Job' : 'Add New Job'}
        visible={isJobModalVisible}
        onCancel={() => setIsJobModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsJobModalVisible(false)}>
            Cancel
          </Button>,
          <Button key="submit" type="primary">
            {currentJob ? 'Update' : 'Create'}
          </Button>,
        ]}
      >
        <div className="AP-form-group">
          <label>Job Title</label>
          <Input defaultValue={currentJob?.title} />
        </div>
        <div className="AP-form-group">
          <label>Company</label>
          <Input defaultValue={currentJob?.company} />
        </div>
        <div className="AP-form-group">
          <label>Status</label>
          <Select defaultValue={currentJob?.status || 'active'} style={{ width: '100%' }}>
            <Option value="active">Active</Option>
            <Option value="closed">Closed</Option>
          </Select>
        </div>
      </Modal>
    </div>
  );
};

export default AdminPanel;
