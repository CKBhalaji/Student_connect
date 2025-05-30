import { useState, useEffect } from 'react';
import { useAuth } from '../../config/AuthContext';
import { Table, Button, Space, Modal, message, Input, Select, Tag, Card, Row, Col, Typography } from 'antd';
import {
  UserOutlined,
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  LockOutlined,
  UnlockOutlined,
  FilterOutlined
} from '@ant-design/icons';
import './AdminUserManagement.css';

const { Title, Text } = Typography;
const { Option } = Select;
const { Search } = Input;

const AdminUserManagement = () => {
  const { userData } = useAuth();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    filterUsers();
  }, [users, searchText]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));

      // Mock data - replace with actual API call
      const mockUsers = [
        { id: 1, name: 'Admin User', email: 'admin@example.com', role: 'admin', status: 'active', createdAt: '2023-01-10', lastLogin: '2023-06-15T14:30:00Z' },
        { id: 2, name: 'Recruiter One', email: 'recruiter1@example.com', role: 'recruiter', status: 'active', createdAt: '2023-02-15', lastLogin: '2023-06-14T09:15:00Z' },
        { id: 3, name: 'Student One', email: 'student1@example.com', role: 'student', status: 'active', createdAt: '2023-03-01', lastLogin: '2023-06-13T16:45:00Z' },
        { id: 4, name: 'Recruiter Two', email: 'recruiter2@example.com', role: 'recruiter', status: 'inactive', createdAt: '2023-03-10', lastLogin: '2023-05-20T11:20:00Z' },
        { id: 5, name: 'Student Two', email: 'student2@example.com', role: 'student', status: 'active', createdAt: '2023-04-05', lastLogin: '2023-06-12T08:30:00Z' },
        { id: 6, name: 'Student Three', email: 'student3@example.com', role: 'student', status: 'pending', createdAt: '2023-05-20', lastLogin: null },
        { id: 7, name: 'Recruiter Three', email: 'recruiter3@example.com', role: 'recruiter', status: 'active', createdAt: '2023-05-25', lastLogin: '2023-06-15T10:10:00Z' },
      ];

      setUsers(mockUsers);
      setFilteredUsers(mockUsers);
    } catch (error) {
      message.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const filterUsers = () => {
    const filtered = users.filter(user =>
      user.name.toLowerCase().includes(searchText.toLowerCase()) ||
      user.email.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const handleEdit = (user) => {
    setCurrentUser(user);
    setIsModalVisible(true);
  };

  const handleDelete = (id) => {
    if (id === userData.id) {
      message.error('You cannot delete your own account');
      return;
    }

    Modal.confirm({
      title: 'Confirm User Deletion',
      content: 'Are you sure you want to delete this user? This action cannot be undone.',
      okText: 'Delete',
      okType: 'danger',
      onOk: () => {
        setUsers(users.filter(user => user.id !== id));
        message.success('User deleted successfully');
      }
    });
  };

  const toggleUserStatus = (id) => {
    if (id === userData.id) {
      message.error('You cannot change your own status');
      return;
    }

    setUsers(users.map(user =>
      user.id === id
        ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
        : user
    ));
    message.success(`User status updated`);
  };

  const columns = [
    {
      title: 'User',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <div className="AUM-user-cell">
          <div className="AUM-user-avatar">
            <UserOutlined />
          </div>
          <div>
            <div className="AUM-user-name">{text}</div>
            <div className="AUM-user-email">{record.email}</div>
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
        <Tag color={role === 'admin' ? 'purple' : role === 'recruiter' ? 'blue' : 'green'}>
          {role.toUpperCase()}
        </Tag>
      ),
      filters: [
        { text: 'Admin', value: 'admin' },
        { text: 'Recruiter', value: 'recruiter' },
        { text: 'Student', value: 'student' },
      ],
      onFilter: (value, record) => record.role === value,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status, record) => (
        <Tag color={status === 'active' ? 'green' : status === 'pending' ? 'orange' : 'red'}>
          {status.toUpperCase()}
        </Tag>
      ),
      filters: [
        { text: 'Active', value: 'active' },
        { text: 'Inactive', value: 'inactive' },
        { text: 'Pending', value: 'pending' },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: 'Joined',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => new Date(date).toLocaleDateString(),
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    },
    {
      title: 'Last Login',
      dataIndex: 'lastLogin',
      key: 'lastLogin',
      render: (date) => date ? new Date(date).toLocaleString() : 'Never',
      sorter: (a, b) => new Date(a.lastLogin || 0) - new Date(b.lastLogin || 0),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            tooltip="Edit user"
          />
          <Button
            type="text"
            icon={record.status === 'active' ? <LockOutlined /> : <UnlockOutlined />}
            onClick={() => toggleUserStatus(record.id)}
            tooltip={record.status === 'active' ? 'Deactivate' : 'Activate'}
          />
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
            disabled={record.id === userData.id}
            tooltip="Delete user"
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="AUM-admin-user-management">
      <div className="AUM-user-management-header">
        {/* <Title level={3} className="AUM-page-title"> */}
          <h1><UserOutlined /> User Management</h1>
        {/* </Title> */}
        <div className="AUM-header-actions">
          <Search
            placeholder="Search users..."
            allowClear
            enterButton={<SearchOutlined />}
            size="large"
            onSearch={handleSearch}
            className="AUM-search-bar"
          />
          <Button
            className="AUM-add-user-button"
            type="primary"
            icon={<PlusOutlined />}
            size="large"
            onClick={() => {
              setCurrentUser(null);
              setIsModalVisible(true);
            }}
          >
            Add User
          </Button>
        </div>
      </div>
      <Card>
        <div className="AUM-table-container">
          <Table
            dataSource={filteredUsers}
            columns={columns}
            loading={loading}
            pagination={pagination}
            scroll={{ x: 'max-content' }}
            className="AUM-responsive-table"
          />
        </div>
      </Card>

      {/* User Edit/Create Modal */}
      <Modal
        title={currentUser ? 'Edit User' : 'Create New User'}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsModalVisible(false)}>
            Cancel
          </Button>,
          <Button key="submit" type="primary">
            {currentUser ? 'Update' : 'Create'}
          </Button>,
        ]}
        width={700}
      >
        <div className="AUM-user-form">
          <Row gutter={16}>
            <Col span={12}>
              <div className="AUM-form-group">
                <label>Full Name</label>
                <Input
                  defaultValue={currentUser?.name}
                  placeholder="Enter full name"
                />
              </div>
            </Col>
            <Col span={12}>
              <div className="AUM-form-group">
                <label>Email</label>
                <Input
                  defaultValue={currentUser?.email}
                  placeholder="Enter email address"
                  type="email"
                />
              </div>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <div className="AUM-form-group">
                <label>Role</label>
                <Select
                  defaultValue={currentUser?.role || 'student'}
                  style={{ width: '100%' }}
                  disabled={currentUser?.id === userData.id}
                >
                  <Option value="admin">Admin</Option>
                  <Option value="recruiter">Recruiter</Option>
                  <Option value="student">Student</Option>
                </Select>
              </div>
            </Col>
            <Col span={12}>
              <div className="AUM-form-group">
                <label>Status</label>
                <Select
                  defaultValue={currentUser?.status || 'active'}
                  style={{ width: '100%' }}
                  disabled={currentUser?.id === userData.id}
                >
                  <Option value="active">Active</Option>
                  <Option value="inactive">Inactive</Option>
                  <Option value="pending">Pending</Option>
                </Select>
              </div>
            </Col>
          </Row>

          {!currentUser && (
            <Row gutter={16}>
              <Col span={24}>
                <div className="AUM-form-group">
                  <label>Initial Password</label>
                  <Input.Password
                    placeholder="Set initial password"
                  />
                  <Text type="secondary">User will be required to change password on first login</Text>
                </div>
              </Col>
            </Row>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default AdminUserManagement;