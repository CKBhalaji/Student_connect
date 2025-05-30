import React, { useState, useEffect } from 'react';
import { Calendar, Badge, Select, Button, Modal, Tooltip, Tag, Card, Divider } from 'antd';
import {
    CalendarOutlined, ClockCircleOutlined, EnvironmentOutlined,
    BuildOutlined, InfoCircleOutlined, BellOutlined,
    CheckCircleOutlined, CloseCircleOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import './StudentCompanyDeadline.css';
import { Form, Input, DatePicker, TimePicker, Radio } from 'antd';
import moment from 'moment';
import {PlusOutlined} from '@ant-design/icons';

const { Option } = Select;

const StudentCompanyDeadline = () => {
    // State variables
    const [events, setEvents] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [dateEvents, setDateEvents] = useState([]);
    const [filterType, setFilterType] = useState('all');
    const [loading, setLoading] = useState(true);
    const [form] = Form.useForm();
    const [addEventModalVisible, setAddEventModalVisible] = useState(false);
    // Fetch events data
    useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            // Inside your useEffect where mock events are defined
            const mockEvents = [
                {
                    id: 1,
                    title: 'Software Engineer Application Deadline',
                    company: 'Tech Innovations Inc.',
                    type: 'Application Deadline',
                    date: '2023-06-15',
                    time: '11:59 PM',
                    location: 'Online',
                    description: 'Last day to submit your application for the Software Engineer position.',
                    link: 'https://example.com/job/123',
                    status: 'Upcoming',
                    // Add company details
                    industry: 'Software Development',
                    companySize: '500-1000 employees',
                    companyWebsite: 'https://techinnovations.example.com',
                    companyDescription: 'Tech Innovations Inc. is a leading software development company specializing in AI and machine learning solutions.'
                },
                {
                    id: 2,
                    title: 'Data Analyst Interview',
                    company: 'Data Insights LLC',
                    type: 'Interview',
                    date: '2023-06-10',
                    time: '2:00 PM',
                    location: 'Virtual (Zoom)',
                    description: 'First round interview for the Data Analyst position.',
                    link: 'https://zoom.us/meeting',
                    status: 'Upcoming'
                },
                {
                    id: 3,
                    title: 'UX Designer Application Deadline',
                    company: 'Creative Solutions',
                    type: 'Application Deadline',
                    date: '2023-06-20',
                    time: '11:59 PM',
                    location: 'Online',
                    description: 'Last day to submit your application for the UX Designer position.',
                    link: 'https://example.com/job/456',
                    status: 'Upcoming'
                },
                {
                    id: 4,
                    title: 'Frontend Developer Technical Assessment',
                    company: 'Web Wizards',
                    type: 'Assessment',
                    date: '2023-06-12',
                    time: '10:00 AM - 12:00 PM',
                    location: 'Online',
                    description: 'Complete a coding challenge for the Frontend Developer position.',
                    link: 'https://assessment.example.com',
                    status: 'Upcoming'
                },
                {
                    id: 5,
                    title: 'Product Manager Final Interview',
                    company: 'Innovate Corp',
                    type: 'Interview',
                    date: '2023-06-18',
                    time: '3:30 PM',
                    location: 'Company HQ - 123 Business Ave',
                    description: 'Final round interview with the product team.',
                    link: '',
                    status: 'Upcoming'
                },
                {
                    id: 6,
                    title: 'Summer Internship Application Deadline',
                    company: 'Global Tech',
                    type: 'Application Deadline',
                    date: '2023-06-05',
                    time: '11:59 PM',
                    location: 'Online',
                    description: 'Last day to submit your application for the Summer Internship program.',
                    link: 'https://example.com/internship',
                    status: 'Passed'
                },
                {
                    id: 7,
                    title: 'Networking Event - Tech Careers',
                    company: 'Multiple Companies',
                    type: 'Event',
                    date: '2023-06-25',
                    time: '5:00 PM - 8:00 PM',
                    location: 'City Convention Center',
                    description: 'Network with recruiters from top tech companies.',
                    link: 'https://example.com/event',
                    status: 'Upcoming'
                },
                {
                    id: 8,
                    title: 'Backend Developer Application Deadline',
                    company: 'Server Solutions',
                    type: 'Application Deadline',
                    date: '2023-06-30',
                    time: '11:59 PM',
                    location: 'Online',
                    description: 'Last day to submit your application for the Backend Developer position.',
                    link: 'https://example.com/job/789',
                    status: 'Upcoming'
                },
                {
                    id: 9, // Make sure to use a unique ID
                    title: 'Your New Event Title',
                    company: 'Company Name',
                    type: 'Application Deadline', // Use one of: 'Application Deadline', 'Interview', 'Assessment', 'Event'
                    date: '2023-06-22', // Format: YYYY-MM-DD
                    time: '11:59 PM',
                    location: 'Online',
                    description: 'Description of your event',
                    link: 'https://example.com/event-link', // Optional
                    status: 'Upcoming' // Use one of: 'Upcoming', 'Completed', 'Missed', 'Passed'
                }
            ];

            setEvents(mockEvents);
            setLoading(false);
        }, 1500);
    }, []);

    // Filter events based on type
    const filteredEvents = filterType === 'all'
        ? events
        : events.filter(event => event.type === filterType);

    // Get event type badge color
    const getEventTypeColor = (type) => {
        switch (type) {
            case 'Application Deadline':
                return 'red';
            case 'Interview':
                return 'blue';
            case 'Assessment':
                return 'orange';
            case 'Event':
                return 'green';
            default:
                return 'default';
        }
    };

    // Get event status icon
    const getStatusIcon = (status) => {
        switch (status) {
            case 'Upcoming':
                return <ClockCircleOutlined />;
            case 'Completed':
                return <CheckCircleOutlined />;
            case 'Missed':
                return <CloseCircleOutlined />;
            case 'Passed':
                return <CloseCircleOutlined />;
            default:
                return null;
        }
    };

    // Calendar cell renderer
    const dateCellRender = (value) => {
        const dateStr = value.format('YYYY-MM-DD');
        const dateEvents = filteredEvents.filter(event => event.date === dateStr);

        return (
            <ul className="SCD-events-list">
                {dateEvents.length > 0 ? (
                    dateEvents.map(event => (
                        <li key={event.id} onClick={() => handleEventClick(event)}>
                            <Badge
                                color={getEventTypeColor(event.type)}
                                text={
                                    <Tooltip title={`${event.title} - ${event.company}`}>
                                        <span className="SCD-event-title">{event.title.length > 20 ? `${event.title.substring(0, 20)}...` : event.title}</span>
                                    </Tooltip>
                                }
                            />
                        </li>
                    ))
                ) : (
                    <li className="SCD-no-events-cell">No events</li>
                )}
            </ul>
        );
    };

    // Handle individual event click
    const handleEventClick = (event) => {
        setDateEvents([event]);
        setModalVisible(true);
    };

    // Handle date selection
    const handleDateSelect = (date) => {
        const dateStr = date.format('YYYY-MM-DD');
        const events = filteredEvents.filter(event => event.date === dateStr);

        setSelectedDate(date);
        setDateEvents(events);

        if (events.length > 0) {
            setModalVisible(true);
        }
    };

    // Handle event type filter change
    const handleFilterChange = (value) => {
        setFilterType(value);
    };
    // Add this function to handle form submission
    const handleAddEvent = (values) => {
        // Format the date and time
        const dateStr = values.date.format('YYYY-MM-DD');
        const timeStr = values.time.format('h:mm A');

        // Create a new event object
        const newEvent = {
            id: events.length + 1, // Simple ID generation
            title: values.title,
            company: values.company,
            type: values.type,
            date: dateStr,
            time: timeStr,
            location: values.location,
            description: values.description,
            link: values.link || '',
            status: 'Upcoming'
        };

        // Add the new event to the events array
        setEvents([...events, newEvent]);

        // Close the modal and reset the form
        setAddEventModalVisible(false);
        form.resetFields();
    };

    return (
        <div className="SCD-student-deadline-calendar-container">
            <div className="SCD-calendar-header">
                <div className="SCD-header-left">
                    <h1><CalendarOutlined /> Company Deadlines Calendar</h1>
                    <p>Track all your job application deadlines, interviews, and events</p>
                </div>
                
                <div className="SCD-header-right">
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => setAddEventModalVisible(true)}
                    >
                        Add Event
                    </Button>
                    <Select
                        defaultValue="all"
                        style={{ width: 200 }}
                        onChange={handleFilterChange}
                        className="SCD-event-type-filter"
                    >
                        <Option value="all">All Events</Option>
                        <Option value="Application Deadline">Application Deadlines</Option>
                        <Option value="Interview">Interviews</Option>
                        <Option value="Assessment">Assessments</Option>
                        <Option value="Event">Events</Option>
                    </Select>
                    <Link to="/jobs">
                        <Button type="primary">Browse Jobs</Button>
                    </Link>
                </div>
            </div>

            <Card className="SCD-calendar-card" loading={loading}>
                <div className="SCD-calendar-legend">
                    <div className="SCD-legend-item">
                        <Badge color="red" text="Application Deadline" />
                    </div>
                    <div className="SCD-legend-item">
                        <Badge color="blue" text="Interview" />
                    </div>
                    <div className="SCD-legend-item">
                        <Badge color="orange" text="Assessment" />
                    </div>
                    <div className="SCD-legend-item">
                        <Badge color="green" text="Event" />
                    </div>
                </div>

                <Calendar
                    dateCellRender={dateCellRender}
                    onSelect={handleDateSelect}
                    className="SCD-deadline-calendar"
                />
            </Card>

            {/* Date Events Modal */}
            <Modal
                title="Add New Event"
                visible={addEventModalVisible}
                onCancel={() => setAddEventModalVisible(false)}
                footer={null}
                width={600}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleAddEvent}
                >
                    <Form.Item
                        name="title"
                        label="Event Title"
                        rules={[{ required: true, message: 'Please enter the event title' }]}
                    >
                        <Input placeholder="Enter event title" />
                    </Form.Item>

                    <Form.Item
                        name="company"
                        label="Company"
                        rules={[{ required: true, message: 'Please enter the company name' }]}
                    >
                        <Input placeholder="Enter company name" />
                    </Form.Item>

                    <Form.Item
                        name="type"
                        label="Event Type"
                        rules={[{ required: true, message: 'Please select the event type' }]}
                    >
                        <Radio.Group>
                            <Radio value="Application Deadline">Application Deadline</Radio>
                            <Radio value="Interview">Interview</Radio>
                            <Radio value="Assessment">Assessment</Radio>
                            <Radio value="Event">Event</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item
                        name="date"
                        label="Date"
                        rules={[{ required: true, message: 'Please select the date' }]}
                    >
                        <DatePicker style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                        name="time"
                        label="Time"
                        rules={[{ required: true, message: 'Please select the time' }]}
                    >
                        <TimePicker format="h:mm A" style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                        name="location"
                        label="Location"
                        rules={[{ required: true, message: 'Please enter the location' }]}
                    >
                        <Input placeholder="Enter location (e.g., Online, Office Address)" />
                    </Form.Item>

                    <Form.Item
                        name="description"
                        label="Description"
                    >
                        <Input.TextArea rows={4} placeholder="Enter event description" />
                    </Form.Item>

                    <Form.Item
                        name="link"
                        label="Link (Optional)"
                    >
                        <Input placeholder="Enter relevant link" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>
                            Add Event
                        </Button>
                        <Button onClick={() => setAddEventModalVisible(false)}>
                            Cancel
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default StudentCompanyDeadline;
