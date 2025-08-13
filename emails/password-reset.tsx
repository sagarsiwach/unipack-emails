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
import * as React from 'react';

interface PasswordResetEmailProps {
  username?: string;
  resetUrl?: string;
  companyName?: string;
  expiryTime?: string;
}

export default function PasswordResetEmail({
  username = 'User',
  resetUrl = '#',
  companyName = 'Unipack',
  expiryTime = '24 hours',
}: PasswordResetEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Reset your {companyName} password</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Text style={logo}>{companyName}</Text>
          </Section>

          {/* Main Content */}
          <Section style={content}>
            <Text style={heading}>Password Reset Request</Text>
            
            <Text style={text}>
              Hi {username},
            </Text>
            
            <Text style={text}>
              We received a request to reset the password for your {companyName} account. If you made this request, click the button below to create a new password:
            </Text>

            <Section style={buttonContainer}>
              <Button style={button} href={resetUrl}>
                Reset Password
              </Button>
            </Section>

            <Text style={text}>
              This password reset link will expire in {expiryTime}. If you need to request another reset link, you can do so from our login page.
            </Text>

            <Hr style={hr} />

            <Section style={warningSection}>
              <Text style={warningTitle}>⚠️ Security Notice</Text>
              <Text style={warningText}>
                If you didn't request this password reset, please ignore this email. Your password will remain unchanged, and your account is secure.
              </Text>
              <Text style={warningText}>
                For your security, never share this reset link with anyone. Our support team will never ask you for your password or login credentials.
              </Text>
            </Section>

            <Hr style={hr} />

            <Text style={text}>
              If you're having trouble with the button above, copy and paste the following URL into your browser:
            </Text>
            <Text style={urlText}>
              {resetUrl}
            </Text>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              Need help? Contact our support team at support@{companyName.toLowerCase()}.com
            </Text>
            <Text style={footerText}>
              © 2024 {companyName}. All rights reserved.
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
  backgroundColor: '#dc3545',
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
  backgroundColor: '#dc3545',
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

const warningSection = {
  backgroundColor: '#fff3cd',
  border: '1px solid #ffeeba',
  borderRadius: '4px',
  padding: '16px',
  margin: '24px 0',
};

const warningTitle = {
  fontSize: '16px',
  fontWeight: 'bold',
  color: '#856404',
  margin: '0 0 12px',
};

const warningText = {
  fontSize: '14px',
  lineHeight: '20px',
  color: '#856404',
  margin: '8px 0',
};

const urlText = {
  fontSize: '14px',
  color: '#007bff',
  wordBreak: 'break-all' as const,
  margin: '12px 0',
  padding: '12px',
  backgroundColor: '#f8f9fa',
  border: '1px solid #dee2e6',
  borderRadius: '4px',
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