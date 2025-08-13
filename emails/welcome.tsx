import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Button,
  Hr,
  Preview,
} from '@react-email/components';
import React from 'react';

interface WelcomeEmailProps {
  username?: string;
  loginUrl?: string;
  companyName?: string;
}

export default function WelcomeEmail({
  username = 'User',
  loginUrl = '#',
  companyName = 'Unipack',
}: WelcomeEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Welcome to {companyName} - Get started with your new account</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Text style={logo}>{companyName}</Text>
          </Section>

          {/* Main Content */}
          <Section style={content}>
            <Text style={heading}>Welcome, {username}!</Text>
            <Text style={text}>
              We're thrilled to have you join the {companyName} community. Your account has been successfully created, and you're ready to get started.
            </Text>
            
            <Text style={text}>
              Click the button below to access your dashboard and begin exploring all the features we have to offer:
            </Text>

            <Section style={buttonContainer}>
              <Button style={button} href={loginUrl}>
                Get Started
              </Button>
            </Section>

            <Hr style={hr} />

            <Text style={text}>
              If you have any questions or need assistance, our support team is here to help. Feel free to reply to this email or contact us through our help center.
            </Text>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              © 2024 {companyName}. All rights reserved.
            </Text>
            <Text style={footerText}>
              This email was sent to you because you created an account with {companyName}.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
  maxWidth: '600px',
};

const header = {
  padding: '32px 24px',
  backgroundColor: '#007bff',
  textAlign: 'center' as const,
};

const logo = {
  fontSize: '28px',
  fontWeight: 'bold',
  color: '#ffffff',
  margin: '0',
};

const content = {
  padding: '0 24px',
};

const heading = {
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#333333',
  margin: '40px 0 20px',
  textAlign: 'center' as const,
};

const text = {
  fontSize: '16px',
  lineHeight: '24px',
  color: '#555555',
  margin: '16px 0',
};

const buttonContainer = {
  textAlign: 'center' as const,
  margin: '32px 0',
};

const button = {
  backgroundColor: '#007bff',
  borderRadius: '6px',
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '14px 28px',
  border: 'none',
};

const hr = {
  borderColor: '#e6ebf1',
  margin: '32px 0',
};

const footer = {
  padding: '24px',
  backgroundColor: '#f8f9fa',
  textAlign: 'center' as const,
};

const footerText = {
  fontSize: '12px',
  color: '#8898aa',
  margin: '4px 0',
};