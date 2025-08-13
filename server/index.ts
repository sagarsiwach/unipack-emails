import { render } from '@react-email/render';
import WelcomeEmail from '../emails/welcome';
import NewsletterEmail from '../emails/newsletter';
import PasswordResetEmail from '../emails/password-reset';

interface EmailRequest {
  template: string;
  data: Record<string, any>;
  format?: 'html' | 'text' | 'both';
}

interface EmailResponse {
  success: boolean;
  html?: string;
  text?: string;
  error?: string;
}

const templates = {
  welcome: WelcomeEmail,
  newsletter: NewsletterEmail,
  'password-reset': PasswordResetEmail,
} as const;

type TemplateName = keyof typeof templates;

function renderEmailTemplate(templateName: TemplateName, data: Record<string, any>, format: 'html' | 'text' | 'both' = 'html') {
  const Template = templates[templateName];
  
  if (!Template) {
    throw new Error(`Template '${templateName}' not found`);
  }

  const result: { html?: string; text?: string } = {};

  if (format === 'html' || format === 'both') {
    result.html = render(Template(data));
  }

  if (format === 'text' || format === 'both') {
    result.text = render(Template(data), { plainText: true });
  }

  return result;
}

const server = Bun.serve({
  port: 3001,
  development: process.env.NODE_ENV !== 'production',
  
  async fetch(req) {
    const url = new URL(req.url);
    
    // CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      // Health check endpoint
      if (url.pathname === '/health' && req.method === 'GET') {
        return new Response(
          JSON.stringify({ 
            status: 'healthy', 
            timestamp: new Date().toISOString(),
            version: '1.0.0'
          }),
          { 
            headers: { 
              'Content-Type': 'application/json',
              ...corsHeaders 
            } 
          }
        );
      }

      // List available templates
      if (url.pathname === '/templates' && req.method === 'GET') {
        return new Response(
          JSON.stringify({
            success: true,
            templates: Object.keys(templates).map(name => ({
              name,
              description: getTemplateDescription(name as TemplateName),
              endpoint: `/render/${name}`,
            }))
          }),
          { 
            headers: { 
              'Content-Type': 'application/json',
              ...corsHeaders 
            } 
          }
        );
      }

      // Render email template
      if (url.pathname.startsWith('/render/') && req.method === 'POST') {
        const templateName = url.pathname.split('/render/')[1] as TemplateName;
        
        if (!templates[templateName]) {
          return new Response(
            JSON.stringify({ 
              success: false, 
              error: `Template '${templateName}' not found. Available templates: ${Object.keys(templates).join(', ')}` 
            }),
            { 
              status: 404,
              headers: { 
                'Content-Type': 'application/json',
                ...corsHeaders 
              } 
            }
          );
        }

        let body: EmailRequest;
        try {
          body = await req.json();
        } catch (e) {
          return new Response(
            JSON.stringify({ 
              success: false, 
              error: 'Invalid JSON body' 
            }),
            { 
              status: 400,
              headers: { 
                'Content-Type': 'application/json',
                ...corsHeaders 
              } 
            }
          );
        }

        const format = body.format || 'html';
        const rendered = renderEmailTemplate(templateName, body.data || {}, format);

        const response: EmailResponse = {
          success: true,
          ...rendered,
        };

        return new Response(
          JSON.stringify(response),
          { 
            headers: { 
              'Content-Type': 'application/json',
              ...corsHeaders 
            } 
          }
        );
      }

      // Preview email template (GET for easy browser testing)
      if (url.pathname.startsWith('/preview/') && req.method === 'GET') {
        const templateName = url.pathname.split('/preview/')[1] as TemplateName;
        
        if (!templates[templateName]) {
          return new Response(
            `Template '${templateName}' not found. Available templates: ${Object.keys(templates).join(', ')}`,
            { 
              status: 404,
              headers: corsHeaders 
            }
          );
        }

        // Get sample data based on template
        const sampleData = getSampleData(templateName);
        const { html } = renderEmailTemplate(templateName, sampleData, 'html');

        return new Response(html, {
          headers: { 
            'Content-Type': 'text/html',
            ...corsHeaders 
          }
        });
      }

      // API documentation
      if (url.pathname === '/' && req.method === 'GET') {
        const docs = `
          <html>
            <head>
              <title>Unipack Emails API</title>
              <style>
                body { font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
                h1 { color: #007bff; }
                h2 { color: #333; margin-top: 2em; }
                pre { background: #f8f9fa; padding: 15px; border-radius: 4px; overflow-x: auto; }
                .endpoint { background: #e3f2fd; padding: 10px; border-radius: 4px; margin: 10px 0; }
                .method { font-weight: bold; color: #007bff; }
              </style>
            </head>
            <body>
              <h1>🚀 Unipack Emails API</h1>
              <p>Professional email template rendering service built with Bun and React Email.</p>
              
              <h2>Available Endpoints</h2>
              
              <div class="endpoint">
                <span class="method">GET</span> <code>/health</code> - Health check
              </div>
              
              <div class="endpoint">
                <span class="method">GET</span> <code>/templates</code> - List available templates
              </div>
              
              <div class="endpoint">
                <span class="method">POST</span> <code>/render/{templateName}</code> - Render email template
              </div>
              
              <div class="endpoint">
                <span class="method">GET</span> <code>/preview/{templateName}</code> - Preview email template in browser
              </div>
              
              <h2>Available Templates</h2>
              <ul>
                ${Object.keys(templates).map(name => 
                  `<li><strong>${name}</strong> - ${getTemplateDescription(name as TemplateName)} 
                   <br><a href="/preview/${name}" target="_blank">Preview</a></li>`
                ).join('')}
              </ul>
              
              <h2>Example Usage</h2>
              <pre>
POST /render/welcome
Content-Type: application/json

{
  "data": {
    "username": "John Doe",
    "loginUrl": "https://app.unipack.com/login",
    "companyName": "Unipack"
  },
  "format": "html"
}
              </pre>
              
              <h2>Response Format</h2>
              <pre>
{
  "success": true,
  "html": "&lt;html&gt;...&lt;/html&gt;",
  "text": "plain text version (if requested)"
}
              </pre>
            </body>
          </html>
        `;
        
        return new Response(docs, {
          headers: { 
            'Content-Type': 'text/html',
            ...corsHeaders 
          }
        });
      }

      // 404 for other routes
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Route not found',
          availableRoutes: ['/health', '/templates', '/render/{templateName}', '/preview/{templateName}']
        }),
        { 
          status: 404,
          headers: { 
            'Content-Type': 'application/json',
            ...corsHeaders 
          } 
        }
      );

    } catch (error) {
      console.error('Server error:', error);
      
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: error instanceof Error ? error.message : 'Internal server error' 
        }),
        { 
          status: 500,
          headers: { 
            'Content-Type': 'application/json',
            ...corsHeaders 
          } 
        }
      );
    }
  }
});

function getTemplateDescription(templateName: TemplateName): string {
  const descriptions = {
    welcome: 'Welcome email for new user registration',
    newsletter: 'Newsletter email with articles and updates',
    'password-reset': 'Password reset email with secure reset link',
  };
  
  return descriptions[templateName] || 'Email template';
}

function getSampleData(templateName: TemplateName): Record<string, any> {
  const sampleData = {
    welcome: {
      username: 'John Doe',
      loginUrl: 'https://app.unipack.com/login',
      companyName: 'Unipack',
    },
    newsletter: {
      title: 'Weekly Newsletter',
      companyName: 'Unipack',
      articles: [
        {
          title: 'Introducing New Features',
          excerpt: 'We are excited to announce several new features that will enhance your experience...',
          url: 'https://blog.unipack.com/new-features',
          readTime: '5 min read',
        },
        {
          title: 'Product Updates',
          excerpt: 'This month we have shipped improvements to performance, security, and user interface...',
          url: 'https://blog.unipack.com/product-updates',
          readTime: '3 min read',
        },
      ],
      unsubscribeUrl: 'https://app.unipack.com/unsubscribe',
    },
    'password-reset': {
      username: 'John Doe',
      resetUrl: 'https://app.unipack.com/reset-password?token=abc123',
      companyName: 'Unipack',
      expiryTime: '24 hours',
    },
  };
  
  return sampleData[templateName] || {};
}

console.log(`🚀 Email server running at http://localhost:${server.port}`);
console.log('📧 Available endpoints:');
console.log('  - GET  / (documentation)');
console.log('  - GET  /health');
console.log('  - GET  /templates');
console.log('  - POST /render/{templateName}');
console.log('  - GET  /preview/{templateName}');

export default server;