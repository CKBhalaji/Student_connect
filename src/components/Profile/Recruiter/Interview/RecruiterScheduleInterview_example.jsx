import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Form, 
  Input, 
  Select, 
  DatePicker, 
  TimePicker, 
  Button, 
  Card, 
  message, 
  Avatar,
  Modal
} from 'antd';
import { 
  CalendarOutlined, 
  UserOutlined, 
  ClockCircleOutlined,
  VideoCameraOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  MailOutlined,
  ArrowLeftOutlined
} from '@ant-design/icons';
import moment from 'moment';
import './RecruiterScheduleInterview_example.css';

const { Option } = Select;
const { TextArea } = Input;

const RecruiterScheduleInterview = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [interviewType, setInterviewType] = useState('virtual');
  const [participants, setParticipants] = useState([]);
  const [availableInterviewers, setAvailableInterviewers] = useState([]);
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const [interviewDetails, setInterviewDetails] = useState(null);

  // Mock data - replace with API calls
  const mockInterviewers = [
    { id: 'i1', name: 'Sarah Johnson', role: 'Senior Recruiter', avatar: 'SJ' },
    { id: 'i2', name: 'Michael Chen', role: 'Technical Lead', avatar: 'MC' },
    { id: 'i3', name: 'Emily Wilson', role: 'HR Manager', avatar: 'EW' },
    { id: 'i4', name: 'David Kim', role: 'Engineering Manager', avatar: 'DK' }
  ];

  // Get candidate data from location state or fetch from API
  const candidate = location.state?.candidate || {
    id: 'c1',
    name: 'Alex Johnson',
    position: 'Frontend Developer',
    avatar: 'AJ',
    email: 'alex.johnson@example.com',
    phone: '(555) 123-4567'
  };

  useEffect(() => {
    // Simulate fetching available interviewers
    setAvailableInterviewers(mockInterviewers);
    
    // If coming from applications page, pre-fill candidate info
    if (location.state?.candidate) {
      form.setFieldsValue({
        candidateName: location.state.candidate.name,
        candidateEmail: location.state.candidate.email,
        position: location.state.candidate.position
      });
    }
  }, [form, location.state]);

  const handleInterviewTypeChange = (value) => {
    setInterviewType(value);
  };

  const handleAddParticipant = (value) => {
    const interviewer = availableInterviewers.find(i => i.id === value);
    if (interviewer && !participants.some(p => p.id === value)) {
      setParticipants([...participants, interviewer]);
    }
  };

  const handleRemoveParticipant = (id) => {
    setParticipants(participants.filter(p => p.id !== id));
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const interviewData = {
        ...values,
        date: values.date.format('YYYY-MM-DD'),
        time: values.time.format('HH:mm'),
        participants,
        type: interviewType,
        candidate: {
          id: candidate.id,
          name: candidate.name,
          email: candidate.email
        }
      };
      
      setInterviewDetails(interviewData);
      setIsConfirmModalVisible(true);
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const confirmScheduleInterview = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      message.success('Interview scheduled successfully!');
      navigate('/recruiter-dashboard');
    } catch (error) {
      message.error('Failed to schedule interview');
    } finally {
      setLoading(false);
      setIsConfirmModalVisible(false);
    }
  };

  const disabledDate = (current) => {
    // Can not select days before today
    return current && current < moment().startOf('day');
  };

  const disabledHours = () => {
    // Disable hours before 8 AM and after 6 PM
    return [...Array(24).keys()].filter(h => h < 8 || h > 18);
  };

  return (
    <div className="RSIE-schedule-interview-page">
      <div className="RSIE-page-header">
        <Button 
          icon={<ArrowLeftOutlined />} 
          onClick={() => navigate(-1)}
          className="RSIE-back-button"
        >
          Back
        </Button>
        <h1><CalendarOutlined /> Schedule Interview</h1>
        <p>Arrange an interview with {candidate.name} for the {candidate.position} position</p>
      </div>

      <div className="RSIE-interview-form-container">
        <Card className="RSIE-form-card">
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
          >
            <div className="RSIE-form-section">
              <h2>Candidate Information</h2>
              <div className="RSIE-candidate-info">
                <Avatar size={64} className="RSIE-candidate-avatar">
                  {candidate.avatar}
                </Avatar>
                <div className="RSIE-candidate-details">
                  <h3>{candidate.name}</h3>
                  <p>{candidate.position}</p>
                  <div className="RSIE-candidate-contact">
                    <span><MailOutlined /> {candidate.email}</span>
                    <span><PhoneOutlined /> {candidate.phone || 'Not provided'}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="RSIE-form-section">
              <h2>Interview Details</h2>
              <div className="RSIE-form-row">
                <Form.Item
                  label="Interview Type"
                  name="type"
                  initialValue="virtual"
                  rules={[{ required: true, message: 'Please select interview type' }]}
                >
                  <Select onChange={handleInterviewTypeChange}>
                    <Option value="virtual">
                      <VideoCameraOutlined /> Virtual Meeting
                    </Option>
                    <Option value="phone">
                      <PhoneOutlined /> Phone Call
                    </Option>
                    <Option value="onsite">
                      <EnvironmentOutlined /> On-site
                    </Option>
                  </Select>
                </Form.Item>

                {interviewType === 'virtual' && (
                  <Form.Item
                    label="Meeting Link"
                    name="meetingLink"
                    rules={[{ required: true, message: 'Please provide meeting link' }]}
                  >
                    <Input placeholder="Zoom/Teams/Google Meet link" />
                  </Form.Item>
                )}

                {interviewType === 'onsite' && (
                  <Form.Item
                    label="Location"
                    name="location"
                    rules={[{ required: true, message: 'Please provide location' }]}
                  >
                    <Input placeholder="Office address or meeting room" />
                  </Form.Item>
                )}
              </div>

              <div className="RSIE-form-row">
                <Form.Item
                  label="Date"
                  name="date"
                  rules={[{ required: true, message: 'Please select date' }]}
                >
                  <DatePicker 
                    disabledDate={disabledDate}
                    suffixIcon={<CalendarOutlined />}
                    style={{ width: '100%' }}
                  />
                </Form.Item>

                <Form.Item
                  label="Time"
                  name="time"
                  rules={[{ required: true, message: 'Please select time' }]}
                >
                  <TimePicker 
                    format="h:mm a"
                    minuteStep={15}
                    disabledHours={disabledHours}
                    suffixIcon={<ClockCircleOutlined />}
                    style={{ width: '100%' }}
                  />
                </Form.Item>

                <Form.Item
                  label="Duration"
                  name="duration"
                  initialValue="60"
                  rules={[{ required: true, message: 'Please select duration' }]}
                >
                  <Select>
                    <Option value="30">30 minutes</Option>
                    <Option value="45">45 minutes</Option>
                    <Option value="60">1 hour</Option>
                    <Option value="90">1.5 hours</Option>
                    <Option value="120">2 hours</Option>
                  </Select>
                </Form.Item>
              </div>
            </div>

            <div className="RSIE-form-section">
              <h2>Interview Team</h2>
              <Form.Item
                label="Add Interviewers"
                help="Select interviewers to include in this interview"
              >
                <Select
                  placeholder="Select interviewers"
                  onSelect={handleAddParticipant}
                >
                  {availableInterviewers
                    .filter(i => !participants.some(p => p.id === i.id))
                    .map(interviewer => (
                      <Option key={interviewer.id} value={interviewer.id}>
                        <div className="RSIE-interviewer-option">
                          <Avatar size="small" className="RSIE-interviewer-avatar">
                            {interviewer.avatar}
                          </Avatar>
                          <span>{interviewer.name} ({interviewer.role})</span>
                        </div>
                      </Option>
                    ))}
                </Select>
              </Form.Item>

              <div className="RSIE-participants-list">
                {participants.length > 0 ? (
                  participants.map(participant => (
                    <div key={participant.id} className="RSIE-participant-item">
                      <Avatar className="RSIE-participant-avatar">
                        {participant.avatar}
                      </Avatar>
                      <div className="RSIE-participant-info">
                        <span className="RSIE-participant-name">{participant.name}</span>
                        <span className="RSIE-participant-role">{participant.role}</span>
                      </div>
                      <Button 
                        type="text" 
                        danger
                        onClick={() => handleRemoveParticipant(participant.id)}
                      >
                        Remove
                      </Button>
                    </div>
                  ))
                ) : (
                  <p className="RSIE-no-participants">No interviewers added yet</p>
                )}
              </div>
            </div>

            <div className="RSIE-form-section">
              <h2>Additional Information</h2>
              <Form.Item
                label="Interview Round"
                name="round"
                initialValue="technical"
                rules={[{ required: true, message: 'Please select interview round' }]}
              >
                <Select>
                  <Option value="screening">Screening</Option>
                  <Option value="technical">Technical</Option>
                  <Option value="cultural">Cultural Fit</Option>
                  <Option value="final">Final Round</Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Notes for Candidate"
                name="notes"
              >
                <TextArea 
                  rows={4} 
                  placeholder="Provide any preparation instructions or materials for the candidate"
                />
              </Form.Item>

              <Form.Item
                label="Internal Notes"
                name="internalNotes"
              >
                <TextArea 
                  rows={4} 
                  placeholder="Private notes for the interview team"
                />
              </Form.Item>
            </div>

            <div className="RSIE-form-actions">
              <Button 
                type="default" 
                onClick={() => navigate(-1)}
                className="RSIE-cancel-btn"
              >
                Cancel
              </Button>
              <Button 
                type="primary" 
                htmlType="submit"
                className="RSIE-submit-btn"
              >
                Schedule Interview
              </Button>
            </div>
          </Form>
        </Card>
      </div>

      {/* Confirmation Modal */}
      <Modal
        title="Confirm Interview Details"
        visible={isConfirmModalVisible}
        onCancel={() => setIsConfirmModalVisible(false)}
        footer={[
          <Button key="back" onClick={() => setIsConfirmModalVisible(false)}>
            Go Back
          </Button>,
          <Button 
            key="submit" 
            type="primary" 
            loading={loading}
            onClick={confirmScheduleInterview}
          >
            Confirm Schedule
          </Button>
        ]}
        width={700}
      >
        {interviewDetails && (
          <div className="RSIE-confirmation-details">
            <div className="RSIE-confirmation-section">
              <h3>Interview With</h3>
              <div className="RSIE-candidate-info">
                <Avatar size={48}>{candidate.avatar}</Avatar>
                <div>
                  <p className="RSIE-candidate-name">{candidate.name}</p>
                  <p className="RSIE-candidate-position">{candidate.position}</p>
                </div>
              </div>
            </div>

            <div className="RSIE-confirmation-section">
              <h3>Details</h3>
              <div className="RSIE-details-grid">
                <div className="RSIE-detail-item">
                  <span className="RSIE-detail-label">Date:</span>
                  <span className="RSIE-detail-value">
                    {moment(interviewDetails.date).format('dddd, MMMM Do YYYY')}
                  </span>
                </div>
                <div className="RSIE-detail-item">
                  <span className="RSIE-detail-label">Time:</span>
                  <span className="RSIE-detail-value">
                    {moment(interviewDetails.time, 'HH:mm').format('h:mm a')}
                  </span>
                </div>
                <div className="RSIE-detail-item">
                  <span className="RSIE-detail-label">Duration:</span>
                  <span className="RSIE-detail-value">
                    {interviewDetails.duration} minutes
                  </span>
                </div>
                <div className="RSIE-detail-item">
                  <span className="RSIE-detail-label">Type:</span>
                  <span className="RSIE-detail-value">
                    {interviewDetails.type === 'virtual' ? 'Virtual Meeting' : 
                     interviewDetails.type === 'phone' ? 'Phone Call' : 'On-site'}
                  </span>
                </div>
                <div className="RSIE-detail-item">
                  <span className="RSIE-detail-label">Round:</span>
                  <span className="RSIE-detail-value">
                    {interviewDetails.round === 'screening' ? 'Screening' :
                     interviewDetails.round === 'technical' ? 'Technical' :
                     interviewDetails.round === 'cultural' ? 'Cultural Fit' : 'Final Round'}
                  </span>
                </div>
              </div>
            </div>

            {interviewDetails.type === 'virtual' && (
              <div className="RSIE-confirmation-section">
                <h3>Meeting Link</h3>
                <p className="RSIE-meeting-link">{interviewDetails.meetingLink}</p>
              </div>
            )}

            {interviewDetails.type === 'onsite' && (
              <div className="RSIE-confirmation-section">
                <h3>Location</h3>
                <p className="RSIE-location">{interviewDetails.location}</p>
              </div>
            )}

            <div className="RSIE-confirmation-section">
              <h3>Interview Team</h3>
              <div className="RSIE-participants-list">
                {participants.map(p => (
                  <div key={p.id} className="RSIE-participant-item">
                    <Avatar size="small">{p.avatar}</Avatar>
                    <span className="RSIE-participant-name">{p.name}</span>
                    <span className="RSIE-participant-role">({p.role})</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default RecruiterScheduleInterview;