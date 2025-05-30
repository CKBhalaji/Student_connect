import { useState } from 'react';
import { Card, Collapse, Divider, Input, Typography } from 'antd';
import { SearchOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import './FAQ.css';

const { Panel } = Collapse;
const { Title, Text } = Typography;
const { Search } = Input;

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // FAQ data - can be moved to a separate file if needed
  const faqData = [
    {
      category: 'General',
      questions: [
        {
          question: 'What is this platform for?',
          answer: 'This platform connects students with recruiters for job opportunities. Students can browse and apply for jobs, while recruiters can post jobs and manage applications.'
        },
        {
          question: 'Is there a cost to use this platform?',
          answer: 'No, the platform is completely free for students. Recruiters may have subscription plans depending on their needs.'
        },
        {
          question: 'How do I create an account?',
          answer: 'Click on the "Register" button in the top right corner and fill out the required information based on whether you are a student or recruiter.'
        }
      ]
    },
    {
      category: 'For Students',
      questions: [
        {
          question: 'How do I apply for jobs?',
          answer: 'Browse available jobs in the Jobs section, click on a job that interests you, and click the "Apply" button. You may need to upload your resume or answer additional questions.'
        },
        {
          question: 'Can I track my applications?',
          answer: 'Yes, your dashboard shows all your applications and their current status (submitted, under review, interview scheduled, etc.).'
        },
        {
          question: 'How do I upload my resume?',
          answer: 'Go to your Profile page and look for the "Resume Upload" section. You can upload PDF, DOC, or DOCX files.'
        },
        {
          question: 'What should I do if I forgot my password?',
          answer: 'Click on "Forgot Password" on the login page and follow the instructions to reset your password via email.'
        }
      ]
    },
    {
      category: 'For Recruiters',
      questions: [
        {
          question: 'How do I post a job?',
          answer: 'In your recruiter dashboard, click "Post New Job" and fill out all required fields including job title, description, requirements, and application deadline.'
        },
        {
          question: 'How can I manage applications?',
          answer: 'The recruiter dashboard provides tools to view, filter, and manage all applications for your posted jobs. You can update application statuses and contact applicants.'
        },
        {
          question: 'What analytics are available?',
          answer: 'The analytics dashboard shows metrics like number of applicants, application sources, time-to-hire, and other recruitment KPIs.'
        },
        {
          question: 'How do I schedule interviews?',
          answer: 'When viewing an application, click "Schedule Interview" to select a date/time and send an invitation to the candidate.'
        }
      ]
    },
    {
      category: 'Technical Issues',
      questions: [
        {
          question: 'The page isn\'t loading properly. What should I do?',
          answer: 'Try refreshing the page, clearing your browser cache, or using a different browser. If the problem persists, contact our support team.'
        },
        {
          question: 'I\'m getting an error when uploading files. What now?',
          answer: 'Ensure your file is in an accepted format (PDF, DOC, DOCX) and under 5MB in size. If it meets these requirements and still fails, contact support.'
        },
        {
          question: 'How do I enable cookies for this site?',
          answer: 'Check your browser settings to allow cookies for our domain. This is typically found in Privacy or Security settings.'
        }
      ]
    }
  ];

  // Filter FAQs based on search query
  const filteredData = faqData.map(category => ({
    ...category,
    questions: category.questions.filter(q => 
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
      q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="F-faq-container">
      <div className="F-faq-header">
        <Title level={2} className="F-faq-title">
          <QuestionCircleOutlined /> Frequently Asked Questions
        </Title>
        <Text className="F-secondary">
          Find answers to common questions about using our platform
        </Text>
        
        <div className="F-faq-search">
          <Search
            placeholder="Search FAQs..."
            allowClear
            enterButton={<SearchOutlined />}
            size="large"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="F-search-input"
          />
        </div>
      </div>

      <Divider />

      {filteredData.length > 0 ? (
        filteredData.map((category) => (
          <div key={category.category} className="F-faq-category">
            <Title level={4} className="F-category-title">
              {category.category}
            </Title>
            <Card bordered={false} className="F-faq-card">
              <Collapse accordion ghost>
                {category.questions.map((item, index) => (
                  <Panel 
                    header={item.question} 
                    key={`${category.category}-${index}`}
                    className="F-faq-panel"
                  >
                    <div className="F-faq-answer">{item.answer}</div>
                  </Panel>
                ))}
              </Collapse>
            </Card>
          </div>
        ))
      ) : (
        <Card className="F-no-results-card">
          <Text>No FAQs found matching your search. Try different keywords.</Text>
        </Card>
      )}

      <Divider />

      <div className="F-faq-footer">
        <Text strong>Still have questions?</Text>
        <Text>
          Contact our support team at <a href="mailto:support@jobplatform.com">support@jobplatform.com</a> 
          or call us at +1 (555) 123-4567.
        </Text>
      </div>
    </div>
  );
};

export default FAQ;