import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Table, Button, Form, Input, Select, DatePicker, TimePicker, Modal, message, Spin, Tag } from 'antd';
import { 
  CalendarOutlined, 
  ClockCircleOutlined, 
  UserOutlined, 
  TeamOutlined,
  VideoCameraOutlined,
  EnvironmentOutlined,
  ArrowLeftOutlined,
  PlusOutlined,
  SearchOutlined
} from '@ant-design/icons';
import moment from 'moment';
import './RecruiterScheduleInterview.css';

const { Option } = Select;
const { RangePicker } = DatePicker;

const RecruiterScheduleInterview = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [candidates, setCandidates] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState('');
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const [scheduledInterviews, setScheduledInterviews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock data for candidates
        const mockCandidates = [
          {
            id: 1,
            name: 'Alex Johnson',
            email: 'alex.johnson@example.com',
            position: 'Frontend Developer',
            status: 'Application Reviewed',
            matchScore: 92,
            appliedDate: '2023-05-15'
          },
          {
            id: 2,
            name: 'Sarah Miller',
            email: 'sarah.miller@example.com',
            position: 'UX Designer Intern',
            status: 'Shortlisted',
            matchScore: 88,
            appliedDate: '2023-05-18'
          },
          {
            id: 3,
            name: 'Michael Chen',
            email: 'michael.chen@example.com',
            position: 'Backend Engineer',
            status: 'Application Reviewed',
            matchScore: 76,
            appliedDate: '2023-05-10'
          },
          {
            id: 4,
            name: 'Emily Wilson',
            email: 'emily.wilson@example.com',
            position: 'Data Analyst',
            status: 'Shortlisted',
            matchScore: 95,
            appliedDate: '2023-05-22'
          }
        ];
        
        // Mock data for jobs
        const mockJobs = [
          { id: 1, title: 'Frontend Developer' },
          { id: 2, title: 'UX Designer Intern' },
          { id: 3, title: 'Backend Engineer' },
          { id: 4, title: 'Data Analyst' }
        ];
        
        // Mock data for scheduled interviews
        const mockInterviews = [
          {
            id: 1,
            candidateName: 'Alex Johnson',
            position: 'Frontend Developer',
            date: '2023-06-15',
            time: '10:00 AM',
            type: 'Video Call',
            status: 'Scheduled'
          },
          {
            id: 2,
            candidateName: 'Sarah Miller',
            position: 'UX Designer Intern',
            date: '2023-06-16',
            time: '2:00 PM',
            type: 'In-person',
            status: 'Scheduled'
          }
        ];
        
        setCandidates(mockCandidates);
        setFilteredCandidates(mockCandidates);
        setJobs(mockJobs);
        setScheduledInterviews(mockInterviews);
      } catch (error) {
        console.error('Error fetching data:', error);
        message.error('Failed to load data');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  const handleSearch = (value) => {
    setSearchText(value);
    const filtered = candidates.filter(candidate => 
      candidate.name.toLowerCase().includes(value.toLowerCase()) ||
      candidate.position.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredCandidates(filtered);
  };
  
  const showScheduleModal = (candidate) => {
    setSelectedCandidate(candidate);
    form.setFieldsValue({
      candidateId: candidate.id,
      candidateName: candidate.name,
      position: candidate.position,
      date: null,
      time: null,
      duration: 30,
      type: 'Video Call',
      location: '',
      notes: ''
    });
    setModalVisible(true);
  };
  
  // Add these new state variables at the top with other state declarations
  const [isRescheduling, setIsRescheduling] = useState(false);
  const [interviewToModify, setInterviewToModify] = useState(null);
  const [cancelModalVisible, setCancelModalVisible] = useState(false);
  
  // Add these new handler functions before the return statement
  const handleReschedule = (interview) => {
    setIsRescheduling(true);
    setInterviewToModify(interview);
    
    // Pre-fill the form with existing interview data
    form.setFieldsValue({
      candidateId: interview.id,
      candidateName: interview.candidateName,
      position: interview.position,
      date: moment(interview.date, 'YYYY-MM-DD'),
      time: moment(interview.time, 'h:mm A'),
      duration: 30, // You might want to store this in your interview object
      type: interview.type,
      location: interview.location || '',
      notes: interview.notes || ''
    });
    
    setModalVisible(true);
  };
  
  const handleCancelInterview = (interview) => {
    setInterviewToModify(interview);
    setCancelModalVisible(true);
  };
  
  const confirmCancelInterview = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Remove the interview from the list
      setScheduledInterviews(prev => 
        prev.filter(interview => interview.id !== interviewToModify.id)
      );
      
      message.success('Interview cancelled successfully');
      setCancelModalVisible(false);
    } catch (error) {
      console.error('Error cancelling interview:', error);
      message.error('Failed to cancel interview');
    } finally {
      setLoading(false);
    }
  };
  
  // Modify the handleSubmit function to handle both new and rescheduled interviews
  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Format date and time for display
      const formattedDate = values.date.format('YYYY-MM-DD');
      const formattedTime = values.time.format('h:mm A');
      
      if (isRescheduling) {
        // Update existing interview
        const updatedInterviews = scheduledInterviews.map(interview => {
          if (interview.id === interviewToModify.id) {
            return {
              ...interview,
              candidateName: values.candidateName,
              position: values.position,
              date: formattedDate,
              time: formattedTime,
              type: values.type,
              location: values.location,
              notes: values.notes,
              status: 'Rescheduled'
            };
          }
          return interview;
        });
        
        setScheduledInterviews(updatedInterviews);
        message.success('Interview rescheduled successfully');
      } else {
        // Create new interview object
        const newInterview = {
          id: scheduledInterviews.length + 1,
          candidateName: values.candidateName,
          position: values.position,
          date: formattedDate,
          time: formattedTime,
          type: values.type,
          location: values.location,
          status: 'Scheduled',
          notes: values.notes
        };
        
        // Add to scheduled interviews
        setScheduledInterviews([...scheduledInterviews, newInterview]);
        message.success('Interview scheduled successfully');
      }
      
      setModalVisible(false);
      form.resetFields();
      setIsRescheduling(false);
      setInterviewToModify(null);
    } catch (error) {
      console.error('Error scheduling interview:', error);
      message.error('Failed to schedule interview');
    } finally {
      setLoading(false);
    }
  };
  
  // Modify the handleCancel function to reset rescheduling state
  const handleCancel = () => {
    setModalVisible(false);
    form.resetFields();
    setIsRescheduling(false);
    setInterviewToModify(null);
  };
  
  const candidateColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => <a onClick={() => showScheduleModal(record)}>{text}</a>
    },
    {
      title: 'Position',
      dataIndex: 'position',
      key: 'position'
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let color = 'blue';
        if (status === 'Shortlisted') color = 'green';
        return <Tag color={color}>{status}</Tag>;
      }
    },
    {
      title: 'Match Score',
      dataIndex: 'matchScore',
      key: 'matchScore',
      render: (score) => {
        let color = 'green';
        if (score < 80) color = 'orange';
        if (score < 70) color = 'red';
        return <span style={{ color }}>{score}%</span>;
      }
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button 
          type="primary" 
          onClick={() => showScheduleModal(record)}
          icon={<CalendarOutlined />}
        >
          Schedule
        </Button>
      )
    }
  ];
  
  const interviewColumns = [
    {
      title: 'Candidate',
      dataIndex: 'candidateName',
      key: 'candidateName'
    },
    {
      title: 'Position',
      dataIndex: 'position',
      key: 'position'
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date'
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time'
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type) => {
        const icon = type === 'Video Call' ? <VideoCameraOutlined /> : <EnvironmentOutlined />;
        return (
          <span>
            {icon} {type}
          </span>
        );
      }
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => <Tag color="green">{status}</Tag>
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button.Group>
          <Button icon={<CalendarOutlined />} onClick={() => handleReschedule(record)}>Reschedule</Button>
          <Button danger onClick={() => handleCancelInterview(record)}>Cancel</Button>
        </Button.Group>
      )
    }
  ];
  
  return (
    <div className="RSI-interview-scheduler-container">
      <div className="RSI-scheduler-header">
        <div className="RSI-header-left">
          {/* <Button 
            icon={<ArrowLeftOutlined />} 
            onClick={() => navigate('/recruiter-dashboard')}
            className="RSI-back-button"
          >
            Back to Dashboard
          </Button> */}
          <h1>Interview Scheduler</h1>
        </div>
        <Button 
          type="primary" 
          icon={<PlusOutlined />}
          style={{background: '#ffffff', color: '#000000', borderColor: '#d9d9d9'}}
          onClick={() => setModalVisible(true)}
        >
          Schedule New Interview
        </Button>
      </div>
      
      {loading ? (
        <div className="RSI-loading-container">
          <Spin size="large" />
          <p>Loading interview data...</p>
        </div>
      ) : (
        <div className="RSI-scheduler-content">
          <Card 
            title={<h2><CalendarOutlined /> Scheduled Interviews</h2>}
            className="RSI-interviews-card"
          >
            <Table 
              dataSource={scheduledInterviews} 
              columns={interviewColumns} 
              rowKey="id"
              pagination={{ pageSize: 5 }}
            />
          </Card>
          
          <Card 
            title={
              <div className="RSI-candidates-header">
                <h2><TeamOutlined /> Available Candidates</h2>
                <Input 
                  placeholder="Search candidates" 
                  prefix={<SearchOutlined />}
                  onChange={(e) => handleSearch(e.target.value)}
                  value={searchText}
                  className="RSI-search-input"
                />
              </div>
            }
            className="RSI-candidates-card"
          >
            <Table 
              dataSource={filteredCandidates} 
              columns={candidateColumns} 
              rowKey="id"
              pagination={{ pageSize: 5 }}
            />
          </Card>
        </div>
      )}
      
      {/* Cancel Confirmation Modal */}
      <Modal
        title="Cancel Interview"
        visible={cancelModalVisible}
        onCancel={() => setCancelModalVisible(false)}
        footer={[
          <Button key="back" onClick={() => setCancelModalVisible(false)}>
            No, Keep It
          </Button>,
          <Button 
            key="submit" 
            type="primary" 
            danger 
            loading={loading} 
            onClick={confirmCancelInterview}
          >
            Yes, Cancel Interview
          </Button>,
        ]}
      >
        <p>Are you sure you want to cancel the interview with {interviewToModify?.candidateName}?</p>
        <p>This action cannot be undone.</p>
      </Modal>
      
      <Modal
        title="Schedule Interview"
        visible={modalVisible}
        onCancel={handleCancel}
        footer={null}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <div className="RSI-form-row">
            <Form.Item
              name="candidateId"
              label="Candidate ID"
              hidden
            >
              <Input />
            </Form.Item>
            
            <Form.Item
              name="candidateName"
              label="Candidate Name"
              rules={[{ required: true, message: 'Please select a candidate' }]}
              className="RSI-form-col"
            >
              <Select
                placeholder="Select candidate"
                disabled={selectedCandidate !== null}
              >
                {candidates.map(candidate => (
                  <Option key={candidate.id} value={candidate.name}>{candidate.name}</Option>
                ))}
              </Select>
            </Form.Item>
            
            <Form.Item
              name="position"
              label="Position"
              rules={[{ required: true, message: 'Please select a position' }]}
              className="RSI-form-col"
            >
              <Select placeholder="Select position">
                {jobs.map(job => (
                  <Option key={job.id} value={job.title}>{job.title}</Option>
                ))}
              </Select>
            </Form.Item>
          </div>
          
          <div className="RSI-form-row">
            <Form.Item
              name="date"
              label="Interview Date"
              rules={[{ required: true, message: 'Please select a date' }]}
              className="RSI-form-col"
            >
              <DatePicker 
                style={{ width: '100%' }} 
                disabledDate={(current) => current && current < moment().startOf('day')}
              />
            </Form.Item>
            
            <Form.Item
              name="time"
              label="Interview Time"
              rules={[{ required: true, message: 'Please select a time' }]}
              className="RSI-form-col"
            >
              <TimePicker 
                format="h:mm a" 
                style={{ width: '100%' }} 
                minuteStep={15}
              />
            </Form.Item>
            
            <Form.Item
              name="duration"
              label="Duration (minutes)"
              rules={[{ required: true, message: 'Please select duration' }]}
              className="RSI-form-col"
            >
              <Select placeholder="Select duration">
                <Option value={15}>15 minutes</Option>
                <Option value={30}>30 minutes</Option>
                <Option value={45}>45 minutes</Option>
                <Option value={60}>60 minutes</Option>
                <Option value={90}>90 minutes</Option>
              </Select>
            </Form.Item>
          </div>
          
          <div className="RSI-form-row">
            <Form.Item
              name="type"
              label="Interview Type"
              rules={[{ required: true, message: 'Please select interview type' }]}
              className="RSI-form-col"
            >
              <Select placeholder="Select type">
                <Option value="Video Call">Video Call</Option>
                <Option value="Phone Call">Phone Call</Option>
                <Option value="In-person">In-person</Option>
              </Select>
            </Form.Item>
            
            <Form.Item
              name="location"
              label="Location/Link"
              className="RSI-form-col-2"
            >
              <Input placeholder="Enter meeting link or location" />
            </Form.Item>
          </div>
          
          <Form.Item
            name="notes"
            label="Notes"
          >
            <Input.TextArea 
              rows={4} 
              placeholder="Add any additional notes or instructions for the interview"
            />
          </Form.Item>
          
          <div className="RSI-form-actions">
            <Button onClick={handleCancel}>Cancel</Button>
            <Button type="primary" htmlType="submit" loading={loading}>
              Schedule Interview
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default RecruiterScheduleInterview;