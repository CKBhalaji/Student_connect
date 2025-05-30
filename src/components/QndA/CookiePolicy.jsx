import React from 'react';
import { Card, Typography } from 'antd';
import './PolicyPages.css';

const { Title, Paragraph } = Typography;

const CookiePolicy = () => {
  return (
    <div className="policy-container">
      <div className="policy-hero">
        <h1>Cookie Policy</h1>
        <p>How we use cookies to enhance your experience</p>
      </div>
      
      <Card className="policy-card">
        <Paragraph strong>Last Updated: {new Date().toLocaleDateString()}</Paragraph>
        
        <Title level={3}>1. What Are Cookies?</Title>
        <Paragraph>
          Cookies are small text files stored on your device when you visit websites. 
          They help the site remember your preferences and improve your experience.
        </Paragraph>

        <Title level={3}>2. How We Use Cookies</Title>
        <Paragraph>
          We use cookies to:
          <ul>
            <li>Authenticate users and keep you logged in</li>
            <li>Remember your preferences</li>
            <li>Analyze site traffic and usage patterns</li>
            <li>Personalize content and ads</li>
            <li>Enable social media features</li>
          </ul>
        </Paragraph>

        <Title level={3}>3. Types of Cookies</Title>
        <Paragraph>
          <strong>Essential Cookies:</strong> Necessary for site functionality
          <br />
          <strong>Preference Cookies:</strong> Remember your settings
          <br />
          <strong>Analytics Cookies:</strong> Help us improve our services
          <br />
          <strong>Marketing Cookies:</strong> Track advertising effectiveness
        </Paragraph>

        <Title level={3}>4. Third-Party Cookies</Title>
        <Paragraph>
          We may use cookies from:
          <ul>
            <li>Google Analytics for usage statistics</li>
            <li>Advertising partners for relevant ads</li>
            <li>Social media platforms for sharing features</li>
          </ul>
        </Paragraph>

        <Title level={3}>5. Managing Cookies</Title>
        <Paragraph>
          You can control cookies through your browser settings. 
          Note that disabling cookies may affect site functionality.
        </Paragraph>

        <Title level={3}>6. Changes to This Policy</Title>
        <Paragraph>
          We may update this policy as our practices change. 
          Significant changes will be communicated through our website.
        </Paragraph>

        <Paragraph strong>
          Contact us at privacy@yourdomain.com with any cookie-related questions.
        </Paragraph>
      </Card>
    </div>
  );
};

export default CookiePolicy;