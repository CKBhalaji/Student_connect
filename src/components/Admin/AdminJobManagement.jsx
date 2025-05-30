import { useState, useEffect } from 'react';
import { useAuth } from '../../config/AuthContext';
import { Table, Button, Space, Modal, Input, Select, Card, Row, Col, Typography, Tabs, message } from 'antd';
import {
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  CheckOutlined,
  CloseOutlined,
  BankOutlined,
  FileOutlined
} from '@ant-design/icons';
import './AdminJobManagement.css';

const { Title } = Typography;
const { Option } = Select;
const { TabPane } = Tabs;
const { Search } = Input;

const AdminJobManagement = () => {
  const { userData } = useAuth();
  const [activeTab, setActiveTab] = useState('jobs');
  const [jobs, setJobs] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Replace with actual API calls
      const jobsResponse = await fetch('/api/admin/jobs');
      const companiesResponse = await fetch('/api/admin/companies');

      const jobsData = await jobsResponse.json();
      const companiesData = await companiesResponse.json();

      setJobs(jobsData);
      setCompanies(companiesData);
    } catch (error) {
      message.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const handleEdit = (item) => {
    setCurrentItem(item);
    setIsModalVisible(true);
  };

  const handleDelete = (id, type) => {
    Modal.confirm({
      title: `Confirm ${type} Deletion`,
      content: `Are you sure you want to delete this ${type}?`,
      okText: 'Delete',
      okType: 'danger',
      onOk: async () => {
        try {
          await fetch(`/api/admin/${type}s/${id}`, { method: 'DELETE' });
          message.success(`${type.charAt(0).toUpperCase() + type.slice(1)} deleted successfully`);
          fetchData();
        } catch (error) {
          message.error(`Failed to delete ${type}`);
        }
      }
    });
  };

  const updateCompanyStatus = async (id, status) => {
    try {
      await fetch(`/api/admin/companies/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      message.success(`Company status updated to ${status}`);
      fetchData();
    } catch (error) {
      message.error('Failed to update company status');
    }
  };

  const jobColumns = [
    {
      title: 'Job Title',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => (
        <div className="AJM-job-cell">
          <FileOutlined className="AJM-job-icon" />
          <div>
            <div className="AJM-job-title">{text}</div>
            <div className="AJM-job-company">{record.company}</div>
          </div>
        </div>
      ),
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'active' ? 'green' : status === 'pending' ? 'orange' : 'red'}>
          {status.toUpperCase()}
        </Tag>
      ),
      filters: [
        { text: 'Active', value: 'active' },
        { text: 'Closed', value: 'closed' },
        { text: 'Pending', value: 'pending' },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Button danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.id, 'job')} />
        </Space>
      ),
    },
  ];

  const companyColumns = [
    {
      title: 'Company',
      dataIndex: 'name',
      key: 'name',
      render: (text) => (
        <div className="AJM-company-cell">
          <BankOutlined className="AJM-company-icon" />
          <div className="AJM-company-name">{text}</div>
        </div>
      ),
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status, record) => (
        <Tag color={status === 'verified' ? 'green' : status === 'pending' ? 'orange' : 'red'}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          {record.status === 'pending' && (
            <>
              <Button
                icon={<CheckOutlined />}
                onClick={() => updateCompanyStatus(record.id, 'verified')}
                style={{ color: 'green' }}
              />
              <Button
                danger
                icon={<CloseOutlined />}
                onClick={() => updateCompanyStatus(record.id, 'rejected')}
              />
            </>
          )}
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Button danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.id, 'company')} />
        </Space>
      ),
    },
  ];

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchText.toLowerCase()) ||
    job.company.toLowerCase().includes(searchText.toLowerCase())
  );

  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="AJM-admin-job-management">
      <div className="AJM-management-header">
        <h1 style={{
          fontSize: '2.5rem',
          // marginBottom: '10px',
          fontWeight: 700
        }}>{activeTab === 'jobs' ? <FileOutlined /> : <BankOutlined />}{activeTab === 'jobs' ? ' Job Management' : ' Company Management'}</h1>
        <div className="AJM-header-actions">
          <Search
            placeholder={`Search ${activeTab === 'jobs' ? 'jobs' : 'companies'}...`}
            allowClear
            enterButton={<SearchOutlined />}
            size="large"
            onSearch={handleSearch}
            className="AJM-search-bar"
          />
          <Button
            className='AJM-add-button'
            type="primary"
            icon={<PlusOutlined />}
            size="large"
            onClick={() => {
              setCurrentItem(null);
              setIsModalVisible(true);
            }}
          >
            Add {activeTab === 'jobs' ? 'Job' : 'Company'}
          </Button>
        </div>
      </div>
      <Card>
        <Tabs activeKey={activeTab} onChange={setActiveTab} className="AJM-management-tabs">
          <TabPane tab={<span><FileOutlined /> Jobs</span>} key="jobs">
            <Table
              columns={jobColumns}
              dataSource={filteredJobs}
              rowKey="id"
              loading={loading}
              className="AJM-data-table"
            />
          </TabPane>
          <TabPane tab={<span><BankOutlined /> Companies</span>} key="companies">
            <Table
              columns={companyColumns}
              dataSource={filteredCompanies}
              rowKey="id"
              loading={loading}
              className="AJM-data-table"
            />
          </TabPane>
        </Tabs>
      </Card>

      <Modal
        title={`${currentItem ? 'Edit' : 'Add New'} ${activeTab === 'jobs' ? 'Job' : 'Company'}`}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsModalVisible(false)}>
            Cancel
          </Button>,
          <Button key="submit" type="primary">
            {currentItem ? 'Update' : 'Create'}
          </Button>,
        ]}
        width={700}
      >
        {/* Form content would go here */}
        <p>Form to {currentItem ? 'edit' : 'create'} {activeTab} would appear here</p>
      </Modal>
    </div>
  );
};

export default AdminJobManagement;