import { 
    RocketOutlined, 
    TeamOutlined, 
    GlobalOutlined, 
    TrophyOutlined,
    CheckCircleOutlined,
    DollarOutlined,
    CalendarOutlined
  } from '@ant-design/icons';
  import { 
    Button, 
    Card, 
    Col, 
    Divider, 
    List, 
    Row, 
    Tag, 
    Typography 
  } from 'antd';
  import './Career.css';
  
  const { Title, Text, Paragraph } = Typography;
  
  const Career = () => {
    // Current job openings data
    const jobOpenings = [
      {
        id: 1,
        title: "Frontend Developer",
        type: "Full-time",
        location: "Remote",
        department: "Engineering",
        description: "We're looking for an experienced React developer to join our team building the next generation of our platform.",
        skills: ["React", "JavaScript", "Redux", "Ant Design"],
        posted: "2 days ago"
      },
      {
        id: 2,
        title: "UX/UI Designer",
        type: "Full-time",
        location: "San Francisco, CA",
        department: "Design",
        description: "Help us create beautiful, intuitive interfaces that make job searching and recruitment seamless.",
        skills: ["Figma", "UI/UX", "Prototyping", "User Research"],
        posted: "1 week ago"
      },
      {
        id: 3,
        title: "Customer Success Manager",
        type: "Full-time",
        location: "New York, NY",
        department: "Operations",
        description: "Be the bridge between our users and product team to ensure customer satisfaction and retention.",
        skills: ["Customer Support", "CRM", "Communication", "Problem Solving"],
        posted: "3 days ago"
      },
      {
        id: 4,
        title: "Backend Engineer",
        type: "Contract",
        location: "Remote",
        department: "Engineering",
        description: "Help scale our backend systems to handle millions of student-recruiter connections.",
        skills: ["Node.js", "Python", "AWS", "Database Design"],
        posted: "1 week ago"
      }
    ];
  
    // Benefits data
    const benefits = [
      {
        icon: <DollarOutlined className="CR-benefit-icon" />,
        title: "Competitive Salary",
        description: "We offer industry-standard compensation with regular reviews"
      },
      {
        icon: <CalendarOutlined className="CR-benefit-icon" />,
        title: "Flexible Time Off",
        description: "Unlimited PTO policy with mandatory minimums"
      },
      {
        icon: <TeamOutlined className="CR-benefit-icon" />,
        title: "Team Retreats",
        description: "Annual company-wide retreats in exciting locations"
      },
      {
        icon: <GlobalOutlined className="CR-benefit-icon" />,
        title: "Remote Work",
        description: "Work from anywhere with our distributed team"
      },
      {
        icon: <TrophyOutlined className="CR-benefit-icon" />,
        title: "Professional Growth",
        description: "Annual stipend for conferences and courses"
      },
      {
        icon: <CheckCircleOutlined className="CR-benefit-icon" />,
        title: "Health Benefits",
        description: "Comprehensive medical, dental, and vision coverage"
      }
    ];
  
    return (
      <div className="CR-career-container">
        {/* Hero Section */}
        <div className="CR-career-hero">
          <div className="CR-hero-content">
            <Title level={1} className="CR-hero-title">
              Build the Future of Career Connections
            </Title>
            <Paragraph className="CR-hero-subtitle">
              Join our mission to democratize access to career opportunities for students worldwide
            </Paragraph>
            <Button 
              type="primary" 
              size="large" 
              className="CR-hero-button"
              href="#openings"
            >
              View Open Positions
            </Button>
          </div>
        </div>
  
        {/* Why Join Us Section */}
        <div className="CR-section why-join">
          <Title level={2} className="CR-section-title">
            Why Join Our Team?
          </Title>
          <Paragraph className="CR-section-description">
            We're building more than just a platform - we're creating opportunities that change lives.
          </Paragraph>
          
          <Row gutter={[24, 24]} className="CR-values-row">
            <Col xs={24} sm={12} md={8}>
              <Card className="CR-value-card">
                <RocketOutlined className="CR-value-icon" />
                <Title level={4} className="CR-value-title">Mission-Driven</Title>
                <Text>
                  Every line of code and design decision impacts students' futures
                </Text>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Card className="CR-value-card">
                <TeamOutlined className="CR-value-icon" />
                <Title level={4} className="CR-value-title">Collaborative Culture</Title>
                <Text>
                  Work with talented, passionate colleagues across disciplines
                </Text>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Card className="CR-value-card">
                <GlobalOutlined className="CR-value-icon" />
                <Title level={4} className="CR-value-title">Global Impact</Title>
                <Text>
                  Our platform serves students and recruiters in 50+ countries
                </Text>
              </Card>
            </Col>
          </Row>
        </div>
  
        {/* Benefits Section */}
        <div className="CR-section benefits-section">
          <Title level={2} className="CR-section-title">
            Our Benefits
          </Title>
          <Paragraph className="CR-section-description">
            We take care of our team so you can do your best work
          </Paragraph>
          
          <Row gutter={[24, 24]} className="CR-benefits-row">
            {benefits.map((benefit, index) => (
              <Col xs={24} sm={12} md={8} key={index}>
                <Card className="CR-benefit-card" hoverable>
                  <div className="CR-benefit-icon-container">
                    {benefit.icon}
                  </div>
                  <Title level={4} className="CR-benefit-title">{benefit.title}</Title>
                  <Text className="CR-benefit-description">{benefit.description}</Text>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
  
        {/* Job Openings Section */}
        <div className="CR-section openings-section" id="openings">
          <Title level={2} className="CR-section-title">
            Current Openings
          </Title>
          <Paragraph className="CR-section-description">
            Explore opportunities to join our growing team
          </Paragraph>
          
          <List
            itemLayout="vertical"
            size="large"
            dataSource={jobOpenings}
            renderItem={(job) => (
              <List.Item key={job.id}>
                <Card className="CR-job-card" hoverable>
                  <div className="CR-job-header">
                    <Title level={3} className="CR-job-title">{job.title}</Title>
                    <div className="CR-job-meta">
                      <Tag color="blue">{job.type}</Tag>
                      <Tag color="geekblue">{job.location}</Tag>
                      <Tag>{job.department}</Tag>
                    </div>
                  </div>
                  <Paragraph className="CR-job-description">
                    {job.description}
                  </Paragraph>
                  <div className="CR-job-skills">
                    <Text strong>Skills: </Text>
                    {job.skills.map((skill, index) => (
                      <Tag key={index}>{skill}</Tag>
                    ))}
                  </div>
                  <div className="CR-job-footer">
                    <Text type="secondary">Posted {job.posted}</Text>
                    <Button type="primary" className="CR-apply-button">
                      Apply Now
                    </Button>
                  </div>
                </Card>
              </List.Item>
            )}
          />
        </div>
  
        {/* Culture Section */}
        <div className="CR-section culture-section">
          <Row gutter={[48, 24]} align="middle">
            <Col xs={24} lg={12}>
              <div className="CR-culture-content">
                <Title level={2} className="CR-section-title">
                  Our Culture
                </Title>
                <Paragraph>
                  We believe in transparency, ownership, and continuous learning. 
                  Our team thrives on collaboration while giving individuals 
                  autonomy to do their best work.
                </Paragraph>
                <Paragraph>
                  We celebrate diversity and are committed to creating an 
                  inclusive environment for all employees.
                </Paragraph>
                <Button type="default" className="CR-culture-button">
                  Learn More About Our Values
                </Button>
              </div>
            </Col>
            <Col xs={24} lg={12}>
              <div className="CR-culture-image">
                {/* Replace with your actual team image */}
                <div className="CR-image-placeholder">
                  <TeamOutlined className="CR-placeholder-icon" />
                  <Text>Team Culture Image</Text>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  };
  
  export default Career;