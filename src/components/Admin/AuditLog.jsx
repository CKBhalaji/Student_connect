import { useState, useMemo } from 'react';
import moment from 'moment';
import {
    SearchOutlined,
    FilterOutlined,
    ReloadOutlined,
    FileExcelOutlined,
    FilePdfOutlined,
    PrinterOutlined,
    UserOutlined,
    SafetyOutlined,
    BookOutlined,
    ClockCircleOutlined,
    WarningOutlined,
    InfoCircleOutlined,
    SettingOutlined
} from '@ant-design/icons';
import {
    Button,
    Card,
    Col,
    DatePicker,
    Divider,
    Dropdown,
    Input,
    Menu,
    Row,
    Select,
    Space,
    Table,
    Tag,
    Typography,
    Badge,
    Tabs,
    message
} from 'antd';
import './AuditLog.css';

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;
const { TabPane } = Tabs;
const { Search } = Input;


const AuditLog = () => {
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchText, setSearchText] = useState('');
    const [actionTypeFilter, setActionTypeFilter] = useState('all');
    const [userTypeFilter, setUserTypeFilter] = useState('all');
    const [dateRange, setDateRange] = useState([]);
    const [activeTab, setActiveTab] = useState('all');
    // Utility function to export as CSV
    const exportToCSV = (data, filename) => {
        const headers = Object.keys(data[0]).join(',');
        const rows = data.map(item =>
            Object.values(item).map(val =>
                typeof val === 'object' ? JSON.stringify(val) : val
            ).join(',')
        ).join('\n');

        const csvContent = `${headers}\n${rows}`;
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${filename}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Utility function to export as PDF (using jsPDF)
    const exportToPDF = (data, filename) => {
        import('jspdf').then(({ jsPDF }) => {
            import('jspdf-autotable').then(() => {
                const doc = new jsPDF();
                doc.text('Audit Log Report', 14, 16);

                const columns = [
                    { title: "Action", dataKey: "action" },
                    { title: "User", dataKey: "user.name" },
                    { title: "Date", dataKey: "timestamp" },
                    { title: "IP", dataKey: "ipAddress" },
                    { title: "Status", dataKey: "status" }
                ];

                const rows = data.map(item => ({
                    ...item,
                    timestamp: moment(item.timestamp).format('lll'),
                    user: item.user.name
                }));

                doc.autoTable({
                    head: [columns.map(col => col.title)],
                    body: rows.map(row => columns.map(col => {
                        const keys = col.dataKey.split('.');
                        return keys.reduce((acc, key) => acc[key], row);
                    })),
                    startY: 20
                });

                doc.save(`${filename}.pdf`);
            });
        });
    };

    const exportMenu = (
        <Menu
            onClick={({ key }) => {
                const filename = `audit_logs_${moment().format('YYYYMMDD_HHmmss')}`;

                switch (key) {
                    case 'export-excel':
                        exportToCSV(filteredLogs, filename);
                        break;
                    case 'export-pdf':
                        exportToPDF(filteredLogs, filename);
                        break;
                    case 'print':
                        window.print();
                        break;
                    default:
                        break;
                }
            }}
        >
            <Menu.Item key="export-excel" icon={<FileExcelOutlined />}>
                Export to Excel (CSV)
            </Menu.Item>
            <Menu.Item key="export-pdf" icon={<FilePdfOutlined />}>
                Export to PDF
            </Menu.Item>
            <Menu.Item key="print" icon={<PrinterOutlined />}>
                Print
            </Menu.Item>
        </Menu>
    );
    // Mock data - replace with API calls
    const [logs] = useState([
        {
            id: 'log-001',
            timestamp: '2023-05-15T09:30:45Z',
            action: 'user_login',
            description: 'User logged in successfully',
            user: {
                id: 'user-001',
                name: 'John Doe',
                email: 'john@example.com',
                type: 'admin'
            },
            ipAddress: '192.168.1.100',
            status: 'success'
        },
        {
            id: 'log-002',
            timestamp: '2023-05-15T10:15:22Z',
            action: 'job_created',
            description: 'Created new job posting: Senior Developer',
            user: {
                id: 'user-002',
                name: 'Jane Smith',
                email: 'jane@example.com',
                type: 'recruiter'
            },
            ipAddress: '203.0.113.42',
            status: 'success'
        },
        {
            id: 'log-003',
            timestamp: '2023-05-14T14:45:10Z',
            action: 'user_suspended',
            description: 'Suspended user account: bob@example.com',
            user: {
                id: 'user-001',
                name: 'John Doe',
                email: 'john@example.com',
                type: 'admin'
            },
            ipAddress: '192.168.1.100',
            status: 'success'
        },
        {
            id: 'log-004',
            timestamp: '2023-05-14T11:20:33Z',
            action: 'failed_login',
            description: 'Failed login attempt for user: admin@example.com',
            user: {
                id: 'unknown',
                name: 'Unknown',
                email: 'unknown',
                type: 'unknown'
            },
            ipAddress: '104.28.244.56',
            status: 'failed'
        },
        {
            id: 'log-005',
            timestamp: '2023-05-13T16:05:18Z',
            action: 'settings_updated',
            description: 'Updated system security settings',
            user: {
                id: 'user-003',
                name: 'Admin User',
                email: 'admin@example.com',
                type: 'admin'
            },
            ipAddress: '192.168.1.101',
            status: 'success'
        }
    ]);

    const actionTypes = [
        { value: 'user_login', label: 'User Login' },
        { value: 'failed_login', label: 'Failed Login' },
        { value: 'job_created', label: 'Job Created' },
        { value: 'job_updated', label: 'Job Updated' },
        { value: 'user_suspended', label: 'User Suspended' },
        { value: 'settings_updated', label: 'Settings Updated' },
        { value: 'data_export', label: 'Data Export' },
        { value: 'permission_denied', label: 'Permission Denied' }
    ];

    const userTypes = [
        { value: 'admin', label: 'Admin' },
        { value: 'recruiter', label: 'Recruiter' },
        { value: 'student', label: 'Student' },
        { value: 'unknown', label: 'Unknown' }
    ];

    const filteredLogs = useMemo(() => {
        return logs.filter(log => {
            // Apply search filter
            const matchesSearch = log.description.toLowerCase().includes(searchText.toLowerCase()) ||
                log.user.name.toLowerCase().includes(searchText.toLowerCase()) ||
                log.user.email.toLowerCase().includes(searchText.toLowerCase());

            // Apply action type filter
            const matchesActionType = actionTypeFilter === 'all' || log.action === actionTypeFilter;

            // Apply user type filter
            const matchesUserType = userTypeFilter === 'all' || log.user.type === userTypeFilter;

            // Apply date range filter
            let matchesDate = true;
            if (dateRange && dateRange.length === 2) {
                const start = dateRange[0].startOf('day');
                const end = dateRange[1].endOf('day');
                const logDate = moment(log.timestamp);
                matchesDate = logDate.isBetween(start, end, null, '[]');
            }

            // Apply tab filter
            let matchesTab = true;
            if (activeTab === 'security') {
                matchesTab = ['user_login', 'failed_login', 'user_suspended', 'permission_denied'].includes(log.action);
            } else if (activeTab === 'admin') {
                matchesTab = log.user.type === 'admin';
            } else if (activeTab === 'failed') {
                matchesTab = log.status === 'failed';
            }

            return matchesSearch && matchesActionType && matchesUserType && matchesDate && matchesTab;
        });
    }, [logs, searchText, actionTypeFilter, userTypeFilter, dateRange, activeTab]);

    const refreshLogs = async () => {
        setLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            message.success('Audit logs refreshed successfully');
        } catch (error) {
            message.error('Failed to refresh audit logs');
        } finally {
            setLoading(false);
        }
    };

    const getActionIcon = (action) => {
        switch (action) {
            case 'user_login':
            case 'failed_login':
                return <UserOutlined />;
            case 'job_created':
            case 'job_updated':
                return <BookOutlined />;
            case 'user_suspended':
                return <SafetyOutlined />;
            case 'settings_updated':
                return <SettingOutlined />;
            case 'data_export':
                return <FileExcelOutlined />;
            case 'permission_denied':
                return <WarningOutlined />;
            default:
                return <InfoCircleOutlined />;
        }
    };

    const columns = [
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (action, record) => (
                <div className="AL-action-cell">
                    <div className="AL-action-icon">
                        {getActionIcon(action)}
                    </div>
                    <div>
                        <div className="AL-action-type">
                            {actionTypes.find(a => a.value === action)?.label || action}
                        </div>
                        <div className="AL-action-description">
                            {record.description}
                        </div>
                    </div>
                </div>
            ),
            sorter: (a, b) => a.action.localeCompare(b.action)
        },
        {
            title: 'User',
            dataIndex: 'user',
            key: 'user',
            render: (user) => (
                <div className="AL-user-cell">
                    <div className="AL-user-name">{user.name}</div>
                    <div className="AL-user-email">{user.email}</div>
                    <Tag color={user.type === 'admin' ? 'red' : user.type === 'recruiter' ? 'blue' : 'green'}>
                        {user.type.toUpperCase()}
                    </Tag>
                </div>
            ),
            sorter: (a, b) => a.user.name.localeCompare(b.user.name)
        },
        {
            title: 'Date & Time',
            dataIndex: 'timestamp',
            key: 'timestamp',
            render: (timestamp) => (
                <div className="AL-timestamp-cell">
                    <ClockCircleOutlined style={{ marginRight: 8 }} />
                    {moment(timestamp).format('lll')}
                </div>
            ),
            sorter: (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
        },
        {
            title: 'IP Address',
            dataIndex: 'ipAddress',
            key: 'ipAddress',
            render: (ip) => <Tag>{ip}</Tag>
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Badge
                    status={status === 'success' ? 'success' : 'error'}
                    text={status.toUpperCase()}
                />
            ),
            filters: [
                { text: 'Success', value: 'success' },
                { text: 'Failed', value: 'failed' }
            ],
            onFilter: (value, record) => record.status === value
        }
    ];


    return (
        <div className="AL-audit-log">
            <div className="AL-audit-header">
                <Title level={3} className="AL-page-title" style={{
                    fontSize: '2.5rem',
                    color: 'white',
                    fontWeight: 700
                }}>
                    Audit Log
                </Title>
                <Text type="secondary" style={{
                    fontSize: '1.2rem',
                    color: 'white',
                }}>
                    Track all system activities and user actions
                </Text>
            </div>
            <Card>
                <Tabs
                    activeKey={activeTab}
                    onChange={setActiveTab}
                    className="AL-audit-tabs"
                >
                    <TabPane tab="All Activities" key="all" />
                    <TabPane tab="Security Events" key="security" />
                    <TabPane tab="Admin Actions" key="admin" />
                    <TabPane tab="Failed Attempts" key="failed" />
                </Tabs>

                <div className="AL-audit-filters">
                    <Row gutter={[16, 16]} align="middle">
                        <Col xs={24} sm={12} md={8} lg={6}>
                            <Search
                                placeholder="Search logs..."
                                allowClear
                                enterButton={<SearchOutlined />}
                                size="large"
                                value={searchText}
                                onChange={e => setSearchText(e.target.value)}
                            />
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={6}>
                            <Select
                                placeholder="Filter by action type"
                                style={{ width: '100%' }}
                                size="large"
                                value={actionTypeFilter}
                                onChange={setActionTypeFilter}
                            >
                                <Option value="all">All Action Types</Option>
                                {actionTypes.map(type => (
                                    <Option key={type.value} value={type.value}>
                                        {type.label}
                                    </Option>
                                ))}
                            </Select>
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={6}>
                            <Select
                                placeholder="Filter by user type"
                                style={{ width: '100%' }}
                                size="large"
                                value={userTypeFilter}
                                onChange={setUserTypeFilter}
                            >
                                <Option value="all">All User Types</Option>
                                {userTypes.map(type => (
                                    <Option key={type.value} value={type.value}>
                                        {type.label}
                                    </Option>
                                ))}
                            </Select>
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={6}>
                            <RangePicker
                                style={{ width: '100%' }}
                                size="large"
                                onChange={setDateRange}
                                showTime={{ format: 'HH:mm' }}
                                format="YYYY-MM-DD HH:mm"
                            />
                        </Col>
                    </Row>
                </div>

                <Divider />

                <div className="AL-audit-actions">
                    <Row justify="space-between" align="middle">
                        <Col>
                            <Text strong>
                                {filteredLogs.length} log entries found
                            </Text>
                        </Col>
                        <Col>
                            <Space>
                                <Button
                                    icon={<ReloadOutlined />}
                                    onClick={refreshLogs}
                                    loading={loading}
                                >
                                    Refresh
                                </Button>
                                <Dropdown overlay={exportMenu}>
                                    <Button icon={<FilterOutlined />}>
                                        Export
                                    </Button>
                                </Dropdown>
                            </Space>
                        </Col>
                    </Row>
                </div>

                <Table
                    columns={columns}
                    dataSource={filteredLogs}
                    rowKey="id"
                    loading={loading}
                    pagination={{
                        current: currentPage,
                        onChange: setCurrentPage,
                        pageSize: 10,
                        showSizeChanger: true,
                        showTotal: (total, range) => (
                            `${range[0]}-${range[1]} of ${total} entries`
                        )
                    }}
                    scroll={{ x: true }}
                    className="AL-audit-table"
                />
            </Card>
        </div>
    );
};

export default AuditLog;