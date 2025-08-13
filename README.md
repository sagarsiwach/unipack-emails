# 📧 Unipack Emails

Professional email templates and API service built with React Email and Bun.

## 🚀 Features

- **Professional Email Templates**: Welcome, Newsletter, Password Reset, and more
- **REST API**: Render emails via HTTP endpoints
- **Multiple Formats**: HTML and plain text output
- **Live Preview**: Browser preview of all templates
- **Type-Safe**: Built with TypeScript
- **Fast Runtime**: Powered by Bun for optimal performance

## 📦 Templates

### Welcome Email
Professional welcome email for new user registrations with customizable branding.

**Props:**
- `username` - User's display name
- `loginUrl` - Link to dashboard/login
- `companyName` - Your company name

### Newsletter Email  
Responsive newsletter template with article sections and social links.

**Props:**
- `title` - Newsletter title
- `articles` - Array of article objects with title, excerpt, url, readTime
- `companyName` - Your company name
- `unsubscribeUrl` - Unsubscribe link

### Password Reset Email
Secure password reset email with expiry warnings and security notices.

**Props:**
- `username` - User's display name  
- `resetUrl` - Password reset link
- `companyName` - Your company name
- `expiryTime` - Link expiry duration (e.g., "24 hours")

## 🛠️ Development

### Prerequisites
- [Bun](https://bun.sh) (latest version)
- Node.js 18+ (for React Email CLI)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/unipack-emails.git
cd unipack-emails

# Install dependencies
bun install

# Start development server
bun run dev
```

### Available Scripts

```bash
# Start React Email development server (http://localhost:3000)
bun run dev

# Start API server (http://localhost:3001)  
bun run server

# Build/export templates
bun run build

# Preview templates in browser
bun run preview

# Start production API server
bun start
```

## 🌐 API Usage

### Base URL
```
http://localhost:3001
```

### Endpoints

#### Health Check
```http
GET /health
```

#### List Templates
```http
GET /templates
```

#### Render Email
```http
POST /render/{templateName}
Content-Type: application/json

{
  "data": {
    "username": "John Doe",
    "loginUrl": "https://app.example.com",
    "companyName": "Your Company"
  },
  "format": "html" // "html" | "text" | "both"
}
```

#### Preview in Browser
```http
GET /preview/{templateName}
```

### Example Response
```json
{
  "success": true,
  "html": "<html>...</html>",
  "text": "plain text version"
}
```

## 🎯 Usage Examples

### Welcome Email
```javascript
const response = await fetch('http://localhost:3001/render/welcome', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    data: {
      username: 'Alice Johnson',
      loginUrl: 'https://app.mycompany.com/dashboard',
      companyName: 'MyCompany'
    },
    format: 'html'
  })
});

const { html } = await response.json();
// Use html with your email service (Resend, SendGrid, etc.)
```

### Newsletter Email
```javascript
const response = await fetch('http://localhost:3001/render/newsletter', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    data: {
      title: 'Monthly Update',
      companyName: 'MyCompany',
      articles: [
        {
          title: 'New Feature Launch',
          excerpt: 'We are excited to introduce our latest feature...',
          url: 'https://blog.mycompany.com/new-feature',
          readTime: '4 min read'
        }
      ],
      unsubscribeUrl: 'https://app.mycompany.com/unsubscribe'
    }
  })
});
```

## 🔧 Integration

### With Resend
```javascript
import { Resend } from 'resend';

const resend = new Resend('your-api-key');

// Get rendered email
const emailResponse = await fetch('http://localhost:3001/render/welcome', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ 
    data: { username: 'John', companyName: 'MyApp' } 
  })
});

const { html } = await emailResponse.json();

// Send with Resend
await resend.emails.send({
  from: 'noreply@mycompany.com',
  to: 'user@example.com',
  subject: 'Welcome to MyApp!',
  html: html
});
```

### With SendGrid
```javascript
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Render email
const emailResponse = await fetch('http://localhost:3001/render/welcome', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ 
    data: { username: 'John', companyName: 'MyApp' } 
  })
});

const { html } = await emailResponse.json();

// Send with SendGrid
await sgMail.send({
  from: 'noreply@mycompany.com',
  to: 'user@example.com',
  subject: 'Welcome!',
  html: html
});
```

## 📁 Project Structure

```
unipack-emails/
├── emails/                 # Email template components
│   ├── welcome.tsx
│   ├── newsletter.tsx
│   └── password-reset.tsx
├── server/                 # API server
│   └── index.ts
├── public/                 # Static assets
├── package.json
├── tsconfig.json
└── README.md
```

## 🎨 Customization

### Adding New Templates

1. Create a new component in the `emails/` directory:

```tsx
// emails/new-template.tsx
import { Html, Head, Body, Container, Text } from '@react-email/components';
import * as React from 'react';

interface NewTemplateProps {
  message?: string;
}

export default function NewTemplate({ message = 'Hello' }: NewTemplateProps) {
  return (
    <Html>
      <Head />
      <Body>
        <Container>
          <Text>{message}</Text>
        </Container>
      </Body>
    </Html>
  );
}
```

2. Add the template to the server:

```tsx
// server/index.ts
import NewTemplate from '../emails/new-template';

const templates = {
  welcome: WelcomeEmail,
  newsletter: NewsletterEmail,
  'password-reset': PasswordResetEmail,
  'new-template': NewTemplate,  // Add here
} as const;
```

3. Test your template:
```bash
# Preview in browser
curl http://localhost:3001/preview/new-template

# Render via API
curl -X POST http://localhost:3001/render/new-template \
  -H "Content-Type: application/json" \
  -d '{"data": {"message": "Custom message"}}'
```

## 📊 Production Deployment

### Environment Variables
```bash
NODE_ENV=production
PORT=3001
```

### Docker Support
```dockerfile
FROM oven/bun:1 as base
WORKDIR /app

COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

COPY . .

EXPOSE 3001
CMD ["bun", "start"]
```

### Build & Deploy
```bash
# Build for production
bun run build

# Start production server
NODE_ENV=production bun start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-template`
3. Make your changes
4. Test thoroughly: `bun run dev` and `bun run server`
5. Commit changes: `git commit -m "Add new template"`
6. Push to branch: `git push origin feature/new-template`
7. Open a Pull Request

## 📝 License

MIT License - see [LICENSE](LICENSE) for details.

## 🆘 Support

- 📖 [Documentation](http://localhost:3001) (when server is running)
- 🐛 [Issues](https://github.com/yourusername/unipack-emails/issues)
- 💬 [Discussions](https://github.com/yourusername/unipack-emails/discussions)

---

Built with ❤️ using [React Email](https://react.email) and [Bun](https://bun.sh)
