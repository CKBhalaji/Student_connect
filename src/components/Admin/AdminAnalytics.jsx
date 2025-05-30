import React, { useState, useEffect } from 'react';
import { Card, Row, Col, DatePicker, Select, Tabs, Typography, Spin } from 'antd';
import {
  BarChartOutlined,
  LineChartOutlined,
  PieChartOutlined,
  UserOutlined,
  TeamOutlined,
  BankOutlined,
  DollarOutlined,
  ClockCircleOutlined,
  RiseOutlined,
  FallOutlined,
  FileOutlined
} from '@ant-design/icons';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import './AdminAnalytics.css';
import moment from 'moment';

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;
const { TabPane } = Tabs;

const AdminAnalytics = () => {
  const [timeRange, setTimeRange] = useState([moment().subtract(1, 'month'), moment()]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [analyticsData, setAnalyticsData] = useState({
    overview: {
      totalUsers: 0,
      activeJobs: 0,
      totalCompanies: 0,
      revenue: 0,
      userGrowth: 0,
      jobGrowth: 0,
      companyGrowth: 0,
      revenueGrowth: 0
    },
    users: [],
    jobs: [],
    companies: [],
    revenue: []
  });

  useEffect(() => {
    fetchAnalyticsData();
  }, [timeRange]);

  const fetchAnalyticsData = async () => {
    setLoading(true);
    try {
      // Replace with actual API call
      const response = await fetch('/api/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          startDate: timeRange[0].format('YYYY-MM-DD'),
          endDate: timeRange[1].format('YYYY-MM-DD')
        })
      });
      const data = await response.json();
      setAnalyticsData(data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderMetricCard = (icon, title, value = 0, growth = 0, isCurrency = false) => {
    const isPositive = growth >= 0;
    const displayValue = isCurrency
      ? `$${Number(value || 0).toLocaleString()}`
      : value || 0;

    return (
      <Card className="AA-metric-card" loading={loading}>
        <div className="AA-metric-content">
          <div className="AA-metric-icon" style={{ backgroundColor: isPositive ? '#e6f7ff' : '#fff1f0' }}>
            {React.cloneElement(icon, {
              style: { color: isPositive ? '#1890ff' : '#ff4d4f' }
            })}
          </div>
          <div>
            <Text type="secondary">{title}</Text>
            <Title level={3} className="AA-metric-value">
              {displayValue}
            </Title>
            <div className={`metric-growth ${isPositive ? 'positive' : 'negative'}`}>
              {isPositive ? <RiseOutlined /> : <FallOutlined />}
              {Math.abs(growth || 0)}% {isPositive ? 'increase' : 'decrease'} from last period
            </div>
          </div>
        </div>
      </Card>
    );
  };

  if (loading) {
    return (
      <div className="AA-admin-analytics loading">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="AA-admin-analytics">
      <div className="AA-analytics-header">
        <Title level={2} className="AA-page-title" style={{
          fontSize: '2.5rem',
          color: 'white',
          fontWeight: 700
        }}>
          <BarChartOutlined /> Platform Analytics
        </Title>
        <Text type="secondary" style={{
          fontSize: '1.2rem',
          color: 'white',
        }}>Comprehensive insights into platform performance</Text>

        <div className="AA-analytics-filters">
          <RangePicker
            value={timeRange}
            onChange={setTimeRange}
            className="AA-date-range-picker"
          />
          <Select
            defaultValue="all"
            className="AA-department-filter"
            onChange={() => { }}
          >
            <Option value="all">All Departments</Option>
            <Option value="tech">Technology</Option>
            <Option value="finance">Finance</Option>
          </Select>
        </div>
      </div>

      <Tabs activeKey={activeTab} onChange={setActiveTab} className="AA-analytics-tabs">
        <TabPane tab="Overview" key="overview">
          <Row gutter={16} className="AA-metrics-row">
            <Col xs={24} sm={12} md={8} lg={6}>
              {renderMetricCard(
                <UserOutlined />,
                'Total Users',
                analyticsData.overview.totalUsers,
                analyticsData.overview.userGrowth
              )}
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              {renderMetricCard(
                <FileOutlined />,
                'Active Jobs',
                analyticsData.overview.activeJobs,
                analyticsData.overview.jobGrowth
              )}
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              {renderMetricCard(
                <BankOutlined />,
                'Total Companies',
                analyticsData.overview.totalCompanies,
                analyticsData.overview.companyGrowth
              )}
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              {renderMetricCard(
                <DollarOutlined />,
                'Revenue',
                analyticsData.overview.revenue,
                analyticsData.overview.revenueGrowth,
                true
              )}
            </Col>
          </Row>

          <Row gutter={[16, 16]} className="AA-charts-row">
            <Col xs={24} lg={12}>
              <Card title={<><LineChartOutlined /> User Growth</>} className="AA-chart-card">
                <ResponsiveContainer width="100%" height={300}>
                  {analyticsData.users.length > 0 ? (
                    <AreaChart data={analyticsData.users}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.2} />
                    </AreaChart>
                  ) : (
                    <div className="AA-no-data">No user data available</div>
                  )}
                </ResponsiveContainer>
              </Card>
            </Col>
            <Col xs={24} lg={12}>
              <Card title={<><BarChartOutlined /> Job Performance</>} className="AA-chart-card">
                <ResponsiveContainer width="100%" height={300}>
                  {analyticsData.jobs.length > 0 ? (
                    <BarChart data={analyticsData.jobs}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="posted" fill="#8884d8" name="Posted" />
                      <Bar dataKey="filled" fill="#82ca9d" name="Filled" />
                    </BarChart>
                  ) : (
                    <div className="AA-no-data">No job data available</div>
                  )}
                </ResponsiveContainer>
              </Card>
            </Col>
          </Row>
        </TabPane>

        <TabPane tab="Users" key="users">
          <Card title={<><UserOutlined /> User Analytics</>} className="AA-chart-card">
            <ResponsiveContainer width="100%" height={400}>
              {analyticsData.users.length > 0 ? (
                <LineChart data={analyticsData.users}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
              ) : (
                <div className="AA-no-data">No user data available</div>
              )}
            </ResponsiveContainer>
          </Card>
        </TabPane>

        <TabPane tab="Revenue" key="revenue">
          <Card title={<><DollarOutlined /> Revenue Analytics</>} className="AA-chart-card">
            <ResponsiveContainer width="100%" height={400}>
              {analyticsData.revenue.length > 0 ? (
                <AreaChart data={analyticsData.revenue}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="revenue" stroke="#8884d8" fill="#8884d8" fillOpacity={0.2} />
                </AreaChart>
              ) : (
                <div className="AA-no-data">No revenue data available</div>
              )}
            </ResponsiveContainer>
          </Card>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default AdminAnalytics;