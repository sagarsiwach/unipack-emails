import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Button,
  Hr,
  Link,
  Preview,
} from '@react-email/components';
import React from 'react';

interface NewsletterEmailProps {
  title?: string;
  articles?: Array<{
    title: string;
    excerpt: string;
    url: string;
    readTime?: string;
  }>;
  companyName?: string;
  unsubscribeUrl?: string;
}

export default function NewsletterEmail({
  title = 'Weekly Newsletter',
  articles = [
    {
      title: 'Sample Article Title',
      excerpt: 'This is a sample article excerpt that gives readers a preview of the content...',
      url: '#',
      readTime: '5 min read',
    },
  ],
  companyName = 'Unipack',
  unsubscribeUrl = '#',
}: NewsletterEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>{title} - Latest updates from {companyName}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Text style={logo}>{companyName}</Text>
            <Text style={headerSubtitle}>{title}</Text>
          </Section>

          {/* Introduction */}
          <Section style={content}>
            <Text style={greeting}>
              Hello there! 👋
            </Text>
            <Text style={text}>
              Here's what's been happening at {companyName} this week. We've curated the most interesting updates, insights, and stories just for you.
            </Text>
          </Section>

          {/* Articles */}
          <Section style={content}>
            <Text style={sectionHeading}>Latest Articles</Text>
            
            {articles.map((article, index) => (
              <Section key={index} style={articleSection}>
                <Text style={articleTitle}>
                  <Link href={article.url} style={articleLink}>
                    {article.title}
                  </Link>
                </Text>
                <Text style={articleExcerpt}>
                  {article.excerpt}
                </Text>
                {article.readTime && (
                  <Text style={readTime}>
                    {article.readTime}
                  </Text>
                )}
                <Section style={articleButtonContainer}>
                  <Button style={articleButton} href={article.url}>
                    Read More
                  </Button>
                </Section>
                {index < articles.length - 1 && <Hr style={articleHr} />}
              </Section>
            ))}
          </Section>

          <Hr style={hr} />

          {/* Call to Action */}
          <Section style={content}>
            <Text style={ctaText}>
              Want to stay connected? Follow us on social media for daily updates and behind-the-scenes content.
            </Text>
            <Section style={socialSection}>
              <Button style={socialButton} href="#">Twitter</Button>
              <Button style={socialButton} href="#">LinkedIn</Button>
              <Button style={socialButton} href="#">Facebook</Button>
            </Section>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              © 2024 {companyName}. All rights reserved.
            </Text>
            <Text style={footerText}>
              You're receiving this because you subscribed to our newsletter.
            </Text>
            <Text style={footerText}>
              <Link href={unsubscribeUrl} style={unsubscribeLink}>
                Unsubscribe
              </Link> | <Link href="#" style={unsubscribeLink}>
                Update preferences
              </Link>
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
  margin: '0 0 8px 0',
};

const headerSubtitle = {
  fontSize: '16px',
  color: '#ffffff',
  margin: '0',
  opacity: 0.9,
};

const content = {
  padding: '0 24px',
};

const greeting = {
  fontSize: '18px',
  fontWeight: '600',
  color: '#333333',
  margin: '32px 0 16px',
};

const text = {
  fontSize: '16px',
  lineHeight: '24px',
  color: '#555555',
  margin: '16px 0',
};

const sectionHeading = {
  fontSize: '20px',
  fontWeight: 'bold',
  color: '#333333',
  margin: '32px 0 20px',
  borderBottom: '2px solid #007bff',
  paddingBottom: '8px',
};

const articleSection = {
  margin: '24px 0',
};

const articleTitle = {
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '0 0 12px',
};

const articleLink = {
  color: '#007bff',
  textDecoration: 'none',
};

const articleExcerpt = {
  fontSize: '14px',
  lineHeight: '20px',
  color: '#666666',
  margin: '0 0 8px',
};

const readTime = {
  fontSize: '12px',
  color: '#999999',
  margin: '0 0 16px',
};

const articleButtonContainer = {
  margin: '16px 0',
};

const articleButton = {
  backgroundColor: 'transparent',
  border: '1px solid #007bff',
  borderRadius: '4px',
  color: '#007bff',
  fontSize: '14px',
  fontWeight: '500',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '8px 16px',
};

const articleHr = {
  borderColor: '#e6ebf1',
  margin: '24px 0',
};

const ctaText = {
  fontSize: '16px',
  lineHeight: '24px',
  color: '#333333',
  textAlign: 'center' as const,
  margin: '24px 0 16px',
};

const socialSection = {
  textAlign: 'center' as const,
  margin: '20px 0',
};

const socialButton = {
  backgroundColor: '#007bff',
  borderRadius: '4px',
  color: '#ffffff',
  fontSize: '14px',
  fontWeight: '500',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '8px 16px',
  margin: '0 8px',
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

const unsubscribeLink = {
  color: '#8898aa',
  textDecoration: 'underline',
};