import express, { Request, Response } from 'express';
import { Greeter } from './greeter';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Metrics tracking
let requestCount = 0;
let errorCount = 0;
const startTime = Date.now();

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'healthy',
    uptime: Math.floor((Date.now() - startTime) / 1000),
    timestamp: new Date().toISOString()
  });
});

// Readiness check endpoint
app.get('/ready', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'ready',
    version: process.env.VERSION || 'dev'
  });
});

// Metrics endpoint (Prometheus format)
app.get('/metrics', (req: Request, res: Response) => {
  const uptime = Math.floor((Date.now() - startTime) / 1000);
  const metrics = `# HELP http_requests_total Total number of HTTP requests
# TYPE http_requests_total counter
http_requests_total ${requestCount}

# HELP http_errors_total Total number of HTTP errors
# TYPE http_errors_total counter
http_errors_total ${errorCount}

# HELP app_uptime_seconds Application uptime in seconds
# TYPE app_uptime_seconds gauge
app_uptime_seconds ${uptime}
`;
  res.set('Content-Type', 'text/plain');
  res.send(metrics);
});

// Greeting endpoint
app.post('/greet', (req: Request, res: Response) => {
  try {
    requestCount++;
    const { name, style } = req.body;

    if (!name) {
      errorCount++;
      return res.status(400).json({
        error: 'Name is required',
        message: 'Please provide a name in the request body'
      });
    }

    const greeter = new Greeter(name);
    let greeting: string;

    switch (style) {
      case 'formal':
        greeting = greeter.greetFormal();
        break;
      case 'enthusiastic':
        greeting = greeter.greetEnthusiastic();
        break;
      default:
        greeting = greeter.greet();
    }

    res.status(200).json({
      greeting,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    errorCount++;
    res.status(500).json({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Root endpoint
app.get('/', (req: Request, res: Response) => {
  requestCount++;
  res.status(200).json({
    message: 'Hello World CI/CD API',
    version: process.env.VERSION || 'dev',
    endpoints: {
      health: '/health',
      ready: '/ready',
      metrics: '/metrics',
      greet: 'POST /greet'
    }
  });
});

// 404 handler
app.use((req: Request, res: Response) => {
  requestCount++;
  errorCount++;
  res.status(404).json({
    error: 'Not found',
    path: req.path
  });
});

// Only start server if not in test mode
let server: any;
if (process.env.NODE_ENV !== 'test') {
  server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/health`);
    console.log(`Metrics: http://localhost:${PORT}/metrics`);
  });

  // Graceful shutdown
  process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    server.close(() => {
      console.log('HTTP server closed');
    });
  });
}

export { app, server };
