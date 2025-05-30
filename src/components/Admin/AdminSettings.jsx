import { useState, useEffect } from 'react';
import { useAuth } from '../../config/AuthContext';
import {
  Table,
  Button,
  Space,
  Modal,
  message,
  Input,
  Select,
  Card,
  Row,
  Col,
  Typography,
  Tabs,
  Form,
  Switch,
  Tag,
  Upload
} from 'antd';
import {
  UserOutlined,
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SettingOutlined,
  TeamOutlined,
  UploadOutlined,
  SecurityScanOutlined
} from '@ant-design/icons';
import './AdminSettings.css';

const { Title, Text } = Typography;
const { Option } = Select;
const { TabPane } = Tabs;
const { Search } = Input;

const AdminSettings = () => {
  const { userData } = useAuth();
  const [activeTab, setActiveTab] = useState('admins');
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentAdmin, setCurrentAdmin] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [settings, setSettings] = useState({
    emailNotifications: true,
    autoApproveCompanies: false,
    maintenanceMode: false,
    maxFileSize: 10,
    allowedFileTypes: '.pdf,.doc,.docx',
    defaultPagination: 10
  });

  useEffect(() => {
    fetchAdmins();
    fetchSettings();
  }, []);

  const fetchAdmins = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));

      // Mock data - replace with actual API call
      const mockAdmins = [
        { id: 1, name: 'Super Admin', email: 'superadmin@example.com', role: 'super_admin', status: 'active', lastLogin: '2024-03-15T14:30:00Z' },
        { id: 2, name: 'Admin Manager', email: 'admin@example.com', role: 'admin', status: 'active', lastLogin: '2024-03-14T09:15:00Z' },
      ];

      setAdmins(mockAdmins);
    } catch (error) {
      message.error('Failed to fetch admins');
    } finally {
      setLoading(false);
    }
  };

  const fetchSettings = async () => {
    // Simulate API call - replace with actual API call
    await new Promise(resolve => setTimeout(resolve, 500));
  };

  const handleAddAdmin = () => {
    setCurrentAdmin(null);
    setIsModalVisible(true);
  };

  const handleEditAdmin = (admin) => {
    setCurrentAdmin(admin);
    setIsModalVisible(true);
  };

  const handleDeleteAdmin = async (adminId) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      message.success('Admin deleted successfully');
      fetchAdmins();
    } catch (error) {
      message.error('Failed to delete admin');
    }
  };

  const handleSaveAdmin = async (values) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      message.success(`Admin ${currentAdmin ? 'updated' : 'added'} successfully`);
      setIsModalVisible(false);
      fetchAdmins();
    } catch (error) {
      message.error(`Failed to ${currentAdmin ? 'update' : 'add'} admin`);
    }
  };

  const handleSaveSettings = async (values) => {
    try {
      setSettings({ ...settings, ...values });
      message.success('Settings updated successfully');
    } catch (error) {
      message.error('Failed to update settings');
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (text, record) => (
        <div className="AS-admin-cell">
          <UserOutlined className="AS-admin-icon" />
          <div>
            <div className="AS-admin-name">{text}</div>
            <div className="AS-admin-email">{record.email}</div>
          </div>
        </div>
      ),
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role) => (
        <Tag color={role === 'super_admin' ? 'gold' : 'blue'}>
          {role.replace('_', ' ').toUpperCase()}
        </Tag>
      ),
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
    },
    {
      title: 'Last Login',
      dataIndex: 'lastLogin',
      key: 'lastLogin',
      render: (date) => new Date(date).toLocaleString(),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => handleEditAdmin(record)}
          />
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteAdmin(record.id)}
            disabled={record.role === 'super_admin'}
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="AS-admin-settings">
      <div className="AS-settings-header">
        <Title level={2} className="AS-page-title" style={{
          fontSize: '2.5rem',
          color: 'white',
          fontWeight: 700,
        }}>
          <SettingOutlined /> Admin Settings
        </Title>
      </div>

      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <TabPane
          tab={
            <span>
              <TeamOutlined /> Admin Management
            </span>
          }
          key="admins"
        >
          <Card>
            <div className="AS-table-header" >
              <Search
                placeholder="Search admins..."
                allowClear
                className="AS-search-bar"
                onChange={(e) => setSearchText(e.target.value)}
              />
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={handleAddAdmin}
              >
                Add Admin
              </Button>
            </div>
            <Table
              columns={columns}
              dataSource={admins}
              loading={loading}
              rowKey="id"
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
              }}
            />
          </Card>
        </TabPane>

        <TabPane
          tab={
            <span>
              <SettingOutlined /> Project Settings
            </span>
          }
          key="settings"
        >
          <Card>
            <Form
              layout="vertical"
              initialValues={settings}
              onFinish={handleSaveSettings}
            >
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item
                    name="emailNotifications"
                    label="Email Notifications"
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>

                  <Form.Item
                    name="autoApproveCompanies"
                    label="Auto-approve Companies"
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>

                  <Form.Item
                    name="maintenanceMode"
                    label="Maintenance Mode"
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    name="maxFileSize"
                    label="Max File Size (MB)"
                    rules={[{ required: true }]}
                  >
                    <Input type="number" />
                  </Form.Item>

                  <Form.Item
                    name="allowedFileTypes"
                    label="Allowed File Types"
                    rules={[{ required: true }]}
                  >
                    <Input placeholder=".pdf,.doc,.docx" />
                  </Form.Item>

                  <Form.Item
                    name="defaultPagination"
                    label="Default Items Per Page"
                    rules={[{ required: true }]}
                  >
                    <Select>
                      <Option value={10}>10</Option>
                      <Option value={20}>20</Option>
                      <Option value={50}>50</Option>
                      <Option value={100}>100</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Save Settings
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </TabPane>
      </Tabs>

      <Modal
        title={currentAdmin ? 'Edit Admin' : 'Add Admin'}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form
          layout="vertical"
          initialValues={currentAdmin}
          onFinish={handleSaveAdmin}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please enter name' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: 'Please enter email' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="role"
            label="Role"
            rules={[{ required: true, message: 'Please select role' }]}
          >
            <Select>
              <Option value="admin">Admin</Option>
              <Option value="super_admin">Super Admin</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: 'Please select status' }]}
          >
            <Select>
              <Option value="active">Active</Option>
              <Option value="inactive">Inactive</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                {currentAdmin ? 'Update' : 'Add'}
              </Button>
              <Button onClick={() => setIsModalVisible(false)}>Cancel</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminSettings;