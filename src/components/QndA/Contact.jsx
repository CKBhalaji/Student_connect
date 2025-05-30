import { useState } from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    MailOutlined,
    PhoneOutlined,
    EnvironmentOutlined,
    ClockCircleOutlined,
    FacebookOutlined,
    TwitterOutlined,
    LinkedinOutlined,
    InstagramOutlined
} from '@ant-design/icons';
import {
    Button,
    Card,
    Col,
    Divider,
    Form,
    Input,
    Row,
    Typography,
    message
} from 'antd';
import './Contact.css';


const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

const Contact = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        setLoading(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            message.success('Your message has been sent successfully!');
            form.resetFields();
        } catch (error) {
            message.error('Failed to send message. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const contactMethods = [
        {
            icon: <MailOutlined className="CON-contact-icon" />,
            title: "Email Us",
            details: "support@jobplatform.com",
            description: "We'll respond within 24 hours"
        },
        {
            icon: <PhoneOutlined className="CON-contact-icon" />,
            title: "Call Us",
            details: "+1 (555) 123-4567",
            description: "Mon-Fri, 9am-5pm EST"
        },
        {
            icon: <EnvironmentOutlined className="CON-contact-icon" />,
            title: "Visit Us",
            details: "123 Career Lane, Tech City, TC 10001",
            description: "Schedule an appointment first"
        }
    ];

    const faqs = [
        {
            question: "How can I reset my password?",
            answer: "Click on 'Forgot Password' on the login page and follow the instructions sent to your email."
        },
        {
            question: "Where can I view my application status?",
            answer: "Check your dashboard under 'My Applications' section for current status updates."
        },
        {
            question: "How do I delete my account?",
            answer: "Go to Account Settings and click 'Delete Account'. Note this action is irreversible."
        }
    ];

    return (
        <div className="CON-contact-container">
            {/* Hero Section */}
            <div className="CON-contact-hero">
                <h1 className="CON-hero-title">Contact Us</h1>
                <p>We're here to help and answer any questions you might have</p>
            </div>

            {/* Contact Methods */}
            <Row gutter={[24, 24]} className="CON-contact-methods">
                {contactMethods.map((method, index) => (
                    <Col xs={24} sm={12} md={8} key={index}>
                        <Card className="CON-method-card">
                            <div className="CON-method-icon">{method.icon}</div>
                            <Title level={4} className="CON-method-title">{method.title}</Title>
                            <Text strong className="CON-method-details">{method.details}</Text>
                            <Text className="CON-method-description">{method.description}</Text>
                        </Card>
                    </Col>
                ))}
            </Row>

            <Divider />

            {/* Main Content */}
            <Row gutter={[24, 24]}>
                {/* Contact Form */}
                <Col xs={24} lg={12}>
                    <Card className="CON-form-card">
                        <Title level={3} className="CON-form-title">Send Us a Message</Title>
                        <Form
                            form={form}
                            name="contact"
                            layout="vertical"
                            onFinish={onFinish}
                        >
                            <Form.Item
                                name="name"
                                label="Your Name"
                                rules={[{ required: true, message: 'Please input your name!' }]}
                            >
                                <Input placeholder="John Doe" />
                            </Form.Item>

                            <Form.Item
                                name="email"
                                label="Email Address"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your email!'
                                    },
                                    {
                                        type: 'email',
                                        message: 'Please enter a valid email address!',
                                    }
                                ]}
                            >
                                <Input placeholder="john@example.com" />
                            </Form.Item>

                            <Form.Item
                                name="subject"
                                label="Subject"
                                rules={[{ required: true, message: 'Please input a subject!' }]}
                            >
                                <Input placeholder="Regarding job application..." />
                            </Form.Item>

                            <Form.Item
                                name="message"
                                label="Message"
                                rules={[{ required: true, message: 'Please input your message!' }]}
                            >
                                <TextArea rows={6} placeholder="Type your message here..." />
                            </Form.Item>

                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    loading={loading}
                                    className="CON-submit-button"
                                >
                                    Send Message
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                    {/* Map Section - Ensure this is the last element */}
                    <Card className="CON-map-card">
                        <Title level={3} className="CON-map-title">Our Location</Title>
                        <div className="CON-map-container">
                            {/* Replace with your actual map embed */}
                            <div className="CON-map-placeholder">
                                <EnvironmentOutlined className="CON-map-icon" />
                                <Text>Map would be displayed here</Text>
                            </div>
                        </div>
                    </Card>
                </Col>

                {/* Additional Info */}
                <Col xs={24} lg={12}>
                    <Card className="CON-info-card">
                        <Title level={3} className="CON-info-title">Office Hours</Title>
                        <div className="CON-info-item">
                            <ClockCircleOutlined className="CON-info-icon" />
                            <div>
                                <Text strong>Monday - Friday</Text>
                                <Text>9:00 AM - 5:00 PM EST</Text>
                            </div>
                        </div>
                        <div className="CON-info-item">
                            <ClockCircleOutlined className="CON-info-icon" />
                            <div>
                                <Text strong>Saturday - Sunday</Text>
                                <Text>Closed (Email support only)</Text>
                            </div>
                        </div>

                        <Divider />

                        <Title level={3} className="CON-info-title">Quick Links</Title>
                        <div className="CON-quick-links">
                            <a href="/faq">Frequently Asked Questions</a>
                            <a href="/privacy">Privacy Policy</a>
                            <a href="/terms">Terms of Service</a>
                            <a href="/support">Support Center</a>
                        </div>

                        <Divider />

                        <Title level={3} className="CON-info-title">Follow Us</Title>
                        <div className="CON-social-links">
                            <a href="#"><FacebookOutlined className="CON-social-icon" /></a>
                            <a href="#"><TwitterOutlined className="CON-social-icon" /></a>
                            <a href="#"><LinkedinOutlined className="CON-social-icon" /></a>
                            <a href="#"><InstagramOutlined className="CON-social-icon" /></a>
                        </div>
                    </Card>

                    {/* FAQ Preview */}
                    <Card className="CON-faq-preview">
                        <Title level={4} className="CON-faq-preview-title">Common Questions</Title>
                        <div className="CON-faq-list">
                            {faqs.map((item, index) => (
                                <div key={index} className="CON-faq-item">
                                    <Text strong>{item.question}</Text>
                                    <Text>{item.answer}</Text>
                                </div>
                            ))}
                        </div>
                        <Button type="link" href="/faq" className="CON-view-all-faq">
                            View All FAQs →
                        </Button>
                    </Card>

                </Col>
            </Row>


        </div>
    );
};

export default Contact;