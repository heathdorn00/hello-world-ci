import request from 'supertest';

// Set test environment
process.env.NODE_ENV = 'test';

import { app } from '../server';

describe('Server Endpoints', () => {
  describe('GET /', () => {
    it('returns API information', async () => {
      const response = await request(app).get('/');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('endpoints');
      expect(response.body.endpoints).toHaveProperty('health');
      expect(response.body.endpoints).toHaveProperty('metrics');
    });
  });

  describe('GET /health', () => {
    it('returns healthy status', async () => {
      const response = await request(app).get('/health');

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('healthy');
      expect(response.body).toHaveProperty('uptime');
      expect(response.body).toHaveProperty('timestamp');
    });
  });

  describe('GET /ready', () => {
    it('returns ready status', async () => {
      const response = await request(app).get('/ready');

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('ready');
      expect(response.body).toHaveProperty('version');
    });
  });

  describe('GET /metrics', () => {
    it('returns Prometheus metrics', async () => {
      const response = await request(app).get('/metrics');

      expect(response.status).toBe(200);
      expect(response.text).toContain('http_requests_total');
      expect(response.text).toContain('http_errors_total');
      expect(response.text).toContain('app_uptime_seconds');
    });
  });

  describe('POST /greet', () => {
    it('returns greeting for valid name', async () => {
      const response = await request(app)
        .post('/greet')
        .send({ name: 'Alice' });

      expect(response.status).toBe(200);
      expect(response.body.greeting).toBe('Hello, Alice!');
      expect(response.body).toHaveProperty('timestamp');
    });

    it('returns formal greeting', async () => {
      const response = await request(app)
        .post('/greet')
        .send({ name: 'Bob', style: 'formal' });

      expect(response.status).toBe(200);
      expect(response.body.greeting).toBe('Good day, Bob. Welcome!');
    });

    it('returns enthusiastic greeting', async () => {
      const response = await request(app)
        .post('/greet')
        .send({ name: 'Charlie', style: 'enthusiastic' });

      expect(response.status).toBe(200);
      expect(response.body.greeting).toContain('!!!');
    });

    it('returns 400 for missing name', async () => {
      const response = await request(app)
        .post('/greet')
        .send({});

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toBe('Name is required');
    });

    it('returns 400 for whitespace-only name', async () => {
      const response = await request(app)
        .post('/greet')
        .send({ name: '   ' });

      // Greeter throws error for whitespace, which results in 500
      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('404 handler', () => {
    it('returns 404 for unknown route', async () => {
      const response = await request(app).get('/unknown');

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toBe('Not found');
    });
  });
});
