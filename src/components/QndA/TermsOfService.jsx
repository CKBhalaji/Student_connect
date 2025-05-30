import React from 'react';
import { Card, Typography } from 'antd';
import './PolicyPages.css';

const { Title, Paragraph } = Typography;

const TermsOfService = () => {
  return (
    <div className="policy-container">
      <div className="policy-hero">
        <h1>Terms of Service</h1>
        <p>Rules and guidelines for using our platform</p>
      </div>
      
      <Card className="policy-card">
        <Paragraph strong>Effective Date: {new Date().toLocaleDateString()}</Paragraph>
        
        <Title level={3}>1. Acceptance of Terms</Title>
        <Paragraph>
          By accessing or using our platform, you agree to be bound by these Terms. 
          If you disagree, you may not use our services.
        </Paragraph>

        <Title level={3}>2. User Accounts</Title>
        <Paragraph>
          <ul>
            <li>You must provide accurate registration information</li>
            <li>You are responsible for maintaining account security</li>
            <li>You must be at least 16 years old to use our services</li>
          </ul>
        </Paragraph>

        <Title level={3}>3. User Responsibilities</Title>
        <Paragraph>
          You agree not to:
          <ul>
            <li>Violate any laws or third-party rights</li>
            <li>Post false or misleading information</li>
            <li>Upload malicious software</li>
            <li>Harass other users</li>
            <li>Circumvent security measures</li>
          </ul>
        </Paragraph>

        <Title level={3}>4. Content Ownership</Title>
        <Paragraph>
          <ul>
            <li>You retain ownership of content you submit</li>
            <li>You grant us a license to use, display, and distribute your content</li>
            <li>We may remove content that violates these Terms</li>
          </ul>
        </Paragraph>

        <Title level={3}>5. Payments and Refunds</Title>
        <Paragraph>
          <ul>
            <li>Premium services require payment</li>
            <li>All fees are non-refundable unless required by law</li>
            <li>We may change pricing with 30 days notice</li>
          </ul>
        </Paragraph>

        <Title level={3}>6. Termination</Title>
        <Paragraph>
          We may suspend or terminate accounts that violate these Terms. 
          You may terminate your account at any time.
        </Paragraph>

        <Title level={3}>7. Limitation of Liability</Title>
        <Paragraph>
          We are not liable for:
          <ul>
            <li>Indirect, incidental, or consequential damages</li>
            <li>Accuracy of job postings or user content</li>
            <li>Service interruptions beyond our control</li>
          </ul>
        </Paragraph>

        <Paragraph strong>
          For questions about these Terms, contact legal@yourdomain.com.
        </Paragraph>
      </Card>
    </div>
  );
};

export default TermsOfService;