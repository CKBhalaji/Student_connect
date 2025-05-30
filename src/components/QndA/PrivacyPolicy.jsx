import React from 'react';
import { Card, Typography } from 'antd';
import './PolicyPages.css';

const { Title, Paragraph } = Typography;

const PrivacyPolicy = () => {
  return (
    <div className="policy-container">
      <div className="policy-hero">
        <h1>Privacy Policy</h1>
        <p>How we protect and use your information</p>
      </div>
      
      <Card className="policy-card">
        <Paragraph strong>Last Updated: {new Date().toLocaleDateString()}</Paragraph>
        
        <Title level={3}>1. Information We Collect</Title>
        <Paragraph>
          We collect information you provide directly to us, including:
          <ul>
            <li>Personal details (name, email, contact information)</li>
            <li>Account credentials</li>
            <li>Profile information</li>
            <li>Job application materials</li>
            <li>Payment information (for premium services)</li>
          </ul>
        </Paragraph>

        <Title level={3}>2. How We Use Your Information</Title>
        <Paragraph>
          We use the information we collect to:
          <ul>
            <li>Provide, maintain, and improve our services</li>
            <li>Process transactions and send notices</li>
            <li>Personalize user experience</li>
            <li>Communicate with you about products and services</li>
            <li>Detect and prevent fraud</li>
          </ul>
        </Paragraph>

        <Title level={3}>3. Information Sharing</Title>
        <Paragraph>
          We do not sell your personal information. We may share information with:
          <ul>
            <li>Service providers who assist with our operations</li>
            <li>Employers (for job applicants)</li>
            <li>Legal authorities when required by law</li>
          </ul>
        </Paragraph>

        <Title level={3}>4. Data Security</Title>
        <Paragraph>
          We implement appropriate security measures to protect your information, 
          including encryption, access controls, and secure servers.
        </Paragraph>

        <Title level={3}>5. Your Rights</Title>
        <Paragraph>
          You may:
          <ul>
            <li>Access, update, or delete your information</li>
            <li>Opt-out of marketing communications</li>
            <li>Request data portability</li>
            <li>Withdraw consent where applicable</li>
          </ul>
        </Paragraph>

        <Title level={3}>6. Changes to This Policy</Title>
        <Paragraph>
          We may update this policy periodically. We'll notify you of significant changes 
          through our website or email.
        </Paragraph>

        <Paragraph strong>
          Contact us at privacy@yourdomain.com with any questions about this policy.
        </Paragraph>
      </Card>
    </div>
  );
};

export default PrivacyPolicy;