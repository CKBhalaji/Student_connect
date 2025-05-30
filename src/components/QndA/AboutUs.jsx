import { TeamOutlined, TrophyOutlined, BulbOutlined, HeartOutlined } from '@ant-design/icons';
import { Card, Col, Divider, Row, Typography } from 'antd';
import './AboutUs.css';

const { Title, Text, Paragraph } = Typography;

const AboutUs = () => {
  // Team members data
  const teamMembers = [
    {
      name: 'Barathvaj T S K',
      role: 'Backend Developer/Team Lead',
      bio: 'Passionate about learning new technology.',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    {
      name: 'Bhalaji C K',
      role: 'Developer',
      bio: 'Product specialist focused on creating seamless user experiences.',
      avatar: 'https://randomuser.me/api/portraits/men/46.jpg'
    }
    // ,
    // {
    //   name: 'Michael Chen',
    //   role: 'Lead Developer',
    //   bio: 'Full-stack developer building robust and scalable solutions.',
    //   avatar: 'https://randomuser.me/api/portraits/men/22.jpg'
    // },
    // {
    //   name: 'Emma Davis',
    //   role: 'Student Success',
    //   bio: 'Dedicated to helping students navigate their career journeys.',
    //   avatar: 'https://randomuser.me/api/portraits/women/63.jpg'
    // }
  ];

  // Company milestones
  const milestones = [
    // { year: '2018', event: 'Company founded with vision to bridge gap between students and employers' },
    // { year: '2019', event: 'Launched first MVP with basic job posting functionality' },
    // { year: '2020', event: 'Expanded to 50+ universities during pandemic remote hiring surge' },
    // { year: '2021', event: 'Introduced recruiter analytics dashboard' },
    // { year: '2022', event: 'Reached 100,000+ student users' },
    { year: '2025', event: 'Started the project' },
    { year: '2025(1/2)', event: 'Testing the product' },
  ];

  return (
    <div className="AU-about-us-container">
      {/* Hero Section */}
      <div className="AU-about-hero">
        <h1 className="AU-hero-title">About Our Platform</h1>
        <p>Connecting talented students with top recruiters since 2018</p>
        
      </div>

      {/* Mission Section */}
      <Card className="AU-mission-card">
        <div className="AU-mission-content">
          <BulbOutlined className="AU-mission-icon" />
          <div>
            <Title level={3}>Our Mission</Title>
            <Paragraph>
              To democratize career opportunities by creating the most effective bridge between 
              academic talent and industry needs. We believe every student deserves access to 
              meaningful employment opportunities regardless of their background or connections.
            </Paragraph>
          </div>
        </div>
      </Card>

      <Divider />

      {/* Stats Section */}
      <Row gutter={[16, 16]} className="AU-stats-row">
        <Col xs={24} sm={12} md={6}>
          <Card className="AU-stat-card">
            <TeamOutlined className="AU-stat-icon" />
            <Title level={2}>150K+</Title>
            <Text>Students Connected</Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card className="AU-stat-card">
            <TrophyOutlined className="AU-stat-icon" />
            <Title level={2}>5K+</Title>
            <Text>Recruiting Partners</Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card className="AU-stat-card">
            <HeartOutlined className="AU-stat-icon" />
            <Title level={2}>95%</Title>
            <Text>Satisfaction Rate</Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card className="AU-stat-card">
            <BulbOutlined className="AU-stat-icon" />
            <Title level={2}>80%</Title>
            <Text>Interview Conversion</Text>
          </Card>
        </Col>
      </Row>

      <Divider />

      {/* Our Story Section */}
      <div className="AU-story-section">
        <Title level={2}>Our Story</Title>
        <Paragraph>
          Founded in 2018 by a group of university career counselors and tech entrepreneurs, 
          our platform was born out of frustration with the traditional campus recruitment 
          process. We noticed talented students were being overlooked while recruiters 
          struggled to find qualified candidates beyond their usual networks.
        </Paragraph>
        <Paragraph>
          What started as a simple job board has evolved into a comprehensive career 
          ecosystem with smart matching algorithms, skills assessments, and personalized 
          career coaching. Today, we serve students from 300+ institutions and work with 
          companies ranging from startups to Fortune 500s.
        </Paragraph>
      </div>

      {/* Timeline Section */}
      <div className="AU-timeline-section">
        <Title level={3}>Milestones</Title>
        <div className="AU-timeline">
          {milestones.map((item, index) => (
            <div key={index} className="AU-timeline-item">
              <div className="AU-timeline-year">{item.year}</div>
              <div className="AU-timeline-event">{item.event}</div>
            </div>
          ))}
        </div>
      </div>

      <Divider />

      {/* Team Section */}
      <div className="AU-team-section">
        <Title level={2}>Meet The Team</Title>
        <Text className="AU-team-subtitle">
          The passionate people behind our platform
        </Text>
        
        <Row gutter={[24, 24]} className="AU-team-row">
          {teamMembers.map((member, index) => (
            // <Col xs={24} sm={12} md={6} key={index}>
            <Col xs={24} sm={12} md={6} key={index}>
              <Card
                hoverable
                cover={<img alt={member.name} src={member.avatar} />}
                className="AU-team-card"
              >
                <Card.Meta
                  title={member.name}
                  description={
                    <>
                      <Text strong>{member.role}</Text>
                      <Paragraph className="AU-team-bio">{member.bio}</Paragraph>
                    </>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* Values Section */}
      <div className="AU-values-section">
        <Title level={2}>Our Values</Title>
        <Row gutter={[24, 24]}>
          <Col xs={24} sm={12} md={8}>
            <Card className="AU-value-card">
              <Title level={4}>Student First</Title>
              <Paragraph>
                Every decision starts with how it impacts students' career trajectories.
                We measure success by their outcomes, not just our revenue.
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card className="AU-value-card">
              <Title level={4}>Data-Driven</Title>
              <Paragraph>
                We let metrics guide our product development, constantly testing and 
                iterating based on what actually works for our users.
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card className="AU-value-card">
              <Title level={4}>Authentic Connections</Title>
              <Paragraph>
                We facilitate real human connections, not just algorithm-driven matches.
                Relationships matter in career development.
              </Paragraph>
            </Card>
          </Col>
        </Row>
      </div>

      {/* CTA Section */}
      <div className="AU-cta-section">
        <Card className="AU-cta-card">
          <Title level={3}>Join Our Mission</Title>
          <Paragraph>
            Whether you're a student looking for opportunities or a recruiter seeking 
            top talent, we'd love to have you be part of our community.
          </Paragraph>
          <div className="AU-cta-buttons">
            <a href="/register?role=student" className="AU-cta-button student">Student Sign Up</a>
            <a href="/register?role=recruiter" className="AU-cta-button recruiter">Recruiter Sign Up</a>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AboutUs;