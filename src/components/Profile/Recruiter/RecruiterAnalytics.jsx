import { useState, useEffect } from 'react';
import { Card, Row, Col, DatePicker, Select, Divider } from 'antd';
import { 
  BarChartOutlined, 
  LineChartOutlined, 
  PieChartOutlined,
  TeamOutlined,
  ClockCircleOutlined,
  DollarOutlined,
  CheckCircleOutlined
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
  ResponsiveContainer
} from 'recharts';
import './RecruiterAnalytics.css';
import moment from 'moment';

const { RangePicker } = DatePicker;
const { Option } = Select;

const RecruiterAnalytics = () => {
  const [timeRange, setTimeRange] = useState(['2023-01-01', '2023-12-31']);
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [loading, setLoading] = useState(false);

  // Mock data - replace with API calls in a real application
  const [analyticsData, setAnalyticsData] = useState({
    applications: [],
    hires: [],
    sources: [],
    metrics: {},
    timeline: []
  });

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock data - replace with actual API response
        const mockData = {
          applications: [
            { name: 'Jan', value: 120 },
            { name: 'Feb', value: 150 },
            { name: 'Mar', value: 180 },
            { name: 'Apr', value: 210 },
            { name: 'May', value: 240 },
            { name: 'Jun', value: 320 },
            { name: 'Jul', value: 280 },
            { name: 'Aug', value: 310 },
            { name: 'Sep', value: 270 },
            { name: 'Oct', value: 290 },
            { name: 'Nov', value: 260 },
            { name: 'Dec', value: 230 }
          ],
          hires: [
            { name: 'Engineering', value: 24 },
            { name: 'Marketing', value: 12 },
            { name: 'Sales', value: 18 },
            { name: 'Design', value: 8 },
            { name: 'Operations', value: 6 }
          ],
          sources: [
            { name: 'Company Website', value: 35 },
            { name: 'LinkedIn', value: 28 },
            { name: 'Indeed', value: 15 },
            { name: 'Referrals', value: 12 },
            { name: 'Other', value: 10 }
          ],
          metrics: {
            totalApplicants: 2840,
            totalHires: 68,
            avgTimeToHire: 34,
            avgCostPerHire: 4200,
            offerAcceptanceRate: 78,
            diversityRate: 42
          },
          timeline: [
            { name: 'Jan', applicants: 120, interviews: 45, hires: 8 },
            { name: 'Feb', applicants: 150, interviews: 52, hires: 10 },
            { name: 'Mar', applicants: 180, interviews: 68, hires: 12 },
            { name: 'Apr', applicants: 210, interviews: 72, hires: 14 },
            { name: 'May', applicants: 240, interviews: 85, hires: 16 },
            { name: 'Jun', applicants: 320, interviews: 110, hires: 18 },
            { name: 'Jul', applicants: 280, interviews: 95, hires: 15 },
            { name: 'Aug', applicants: 310, interviews: 105, hires: 17 },
            { name: 'Sep', applicants: 270, interviews: 90, hires: 14 },
            { name: 'Oct', applicants: 290, interviews: 98, hires: 16 },
            { name: 'Nov', applicants: 260, interviews: 88, hires: 15 },
            { name: 'Dec', applicants: 230, interviews: 75, hires: 13 }
          ]
        };

        setAnalyticsData(mockData);
      } catch (error) {
        console.error('Error fetching analytics data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalyticsData();
  }, [timeRange, departmentFilter]);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  return (
    <div className="RA-recruiter-analytics">
      <div className="RA-analytics-header">
        <h1><BarChartOutlined /> Recruitment Analytics</h1>
        <p>Track and analyze your recruitment performance metrics</p>
        
        <div className="RA-analytics-filters">
          <RangePicker 
            defaultValue={[moment(timeRange[0]), moment(timeRange[1])]}
            onChange={(dates) => setTimeRange(dates.map(date => date.format('YYYY-MM-DD')))}
            className="RA-date-range-picker"
          />
          
          <Select
            defaultValue="all"
            onChange={setDepartmentFilter}
            className="RA-department-filter"
          >
            <Option value="all">All Departments</Option>
            <Option value="engineering">Engineering</Option>
            <Option value="marketing">Marketing</Option>
            <Option value="sales">Sales</Option>
            <Option value="design">Design</Option>
          </Select>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <Row gutter={16} className="RA-metrics-row">
        <Col xs={24} sm={12} md={8} lg={6} xl={4}>
          <Card className="RA-metric-card" loading={loading}>
            <div className="RA-metric-content">
              <TeamOutlined className="RA-metric-icon" />
              <div>
                <h3>Total Applicants</h3>
                <p className="RA-metric-value">{analyticsData.metrics.totalApplicants}</p>
              </div>
            </div>
          </Card>
        </Col>
        
        <Col xs={24} sm={12} md={8} lg={6} xl={4}>
          <Card className="RA-metric-card" loading={loading}>
            <div className="RA-metric-content">
              <CheckCircleOutlined className="RA-metric-icon" />
              <div>
                <h3>Total Hires</h3>
                <p className="RA-metric-value">{analyticsData.metrics.totalHires}</p>
              </div>
            </div>
          </Card>
        </Col>
        
        <Col xs={24} sm={12} md={8} lg={6} xl={4}>
          <Card className="RA-metric-card" loading={loading}>
            <div className="RA-metric-content">
              <ClockCircleOutlined className="RA-metric-icon" />
              <div>
                <h3>Avg Time to Hire</h3>
                <p className="RA-metric-value">{analyticsData.metrics.avgTimeToHire} days</p>
              </div>
            </div>
          </Card>
        </Col>
        
        <Col xs={24} sm={12} md={8} lg={6} xl={4}>
          <Card className="RA-metric-card" loading={loading}>
            <div className="RA-metric-content">
              <DollarOutlined className="RA-metric-icon" />
              <div>
                <h3>Avg Cost per Hire</h3>
                <p className="RA-metric-value">${analyticsData.metrics.avgCostPerHire?.toLocaleString() ?? 'N/A'}</p>
              </div>
            </div>
          </Card>
        </Col>
        
        <Col xs={24} sm={12} md={8} lg={6} xl={4}>
          <Card className="RA-metric-card" loading={loading}>
            <div className="RA-metric-content">
              <CheckCircleOutlined className="RA-metric-icon" />
              <div>
                <h3>Offer Acceptance</h3>
                <p className="RA-metric-value">{analyticsData.metrics.offerAcceptanceRate}%</p>
              </div>
            </div>
          </Card>
        </Col>
        
        <Col xs={24} sm={12} md={8} lg={6} xl={4}>
          <Card className="RA-metric-card" loading={loading}>
            <div className="RA-metric-content">
              <TeamOutlined className="RA-metric-icon" />
              <div>
                <h3>Diversity Rate</h3>
                <p className="RA-metric-value">{analyticsData.metrics.diversityRate}%</p>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Main Charts Section */}
      <Row gutter={[16, 16]} className="RA-charts-row">
        <Col xs={24} lg={12}>
          <Card 
            title={<><LineChartOutlined /> Applications Timeline</>}
            className="RA-chart-card"
            loading={loading}
          >
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={analyticsData.timeline}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="applicants" 
                  stroke="#8884d8" 
                  activeDot={{ r: 8 }} 
                  name="Applicants"
                />
                <Line 
                  type="monotone" 
                  dataKey="interviews" 
                  stroke="#82ca9d" 
                  name="Interviews"
                />
                <Line 
                  type="monotone" 
                  dataKey="hires" 
                  stroke="#ffc658" 
                  name="Hires"
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        
        <Col xs={24} lg={12}>
          <Card 
            title={<><BarChartOutlined /> Applications by Month</>}
            className="RA-chart-card"
            loading={loading}
          >
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analyticsData.applications}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" name="Applications" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        
        <Col xs={24} lg={12}>
          <Card 
            title={<><PieChartOutlined /> Hires by Department</>}
            className="RA-chart-card"
            loading={loading}
          >
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={analyticsData.hires}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {analyticsData.hires.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        
        <Col xs={24} lg={12}>
          <Card 
            title={<><PieChartOutlined /> Candidate Sources</>}
            className="RA-chart-card"
            loading={loading}
          >
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={analyticsData.sources}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {analyticsData.sources.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      {/* Additional Insights Section */}
      <Card 
        title="Recruitment Insights"
        className="RA-insights-card"
        loading={loading}
      >
        <div className="RA-insights-content">
          <div className="RA-insight-item">
            <h3>Top Performing Job</h3>
            <p>Senior Frontend Developer - 42 hires</p>
          </div>
          <div className="RA-insight-item">
            <h3>Most Efficient Source</h3>
            <p>Employee Referrals - 28% conversion rate</p>
          </div>
          <div className="RA-insight-item">
            <h3>Quickest to Hire</h3>
            <p>Sales Development Rep - Average 21 days</p>
          </div>
          <div className="RA-insight-item">
            <h3>Highest Offer Acceptance</h3>
            <p>Engineering roles - 92% acceptance rate</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default RecruiterAnalytics;