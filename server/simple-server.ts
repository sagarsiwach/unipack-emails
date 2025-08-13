// Simple test server without React Email components
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

      // Home page
      if (url.pathname === '/' && req.method === 'GET') {
        const docs = `
          <html>
            <head>
              <title>Unipack Emails API</title>
            </head>
            <body>
              <h1>🚀 Unipack Emails API</h1>
              <p>Server is running successfully!</p>
              <p>React Email components are being debugged...</p>
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
          error: 'Route not found'
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

console.log(`🚀 Simple Email server running at http://localhost:${server.port}`);
export default server;