const request = require('supertest');
const { setUp, tearDown } = require('./setup');
const { app } = require('../server');

describe('Ingestion API Tests', () => {
  beforeAll(async () => {
    await setUp();
  });

  afterAll(async () => {
    await tearDown();
  });

  describe('POST /api/ingest', () => {
    it('should create new ingestion with HIGH priority', async () => {
      const response = await request(app)
        .post('/api/ingest')
        .send({
          ids: [1, 2, 3, 4, 5],
          priority: 'HIGH'
        });
      
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('ingestion_id');
    });

    it('should handle invalid priority', async () => {
      const response = await request(app)
        .post('/api/ingest')
        .send({
          ids: [1, 2, 3],
          priority: 'INVALID'
        });
      
      expect(response.statusCode).toBe(400);
    });
  });

  describe('GET /api/status/:id', () => {
    it('should return correct batch statuses', async () => {
      // First create an ingestion
      const ingestResponse = await request(app)
        .post('/api/ingest')
        .send({
          ids: [1, 2, 3, 4, 5],
          priority: 'HIGH'
        });

      expect(ingestResponse.statusCode).toBe(200);
      
      // Then check its status
      const statusResponse = await request(app)
        .get(`/api/status/${ingestResponse.body.ingestion_id}`);
      
      expect(statusResponse.statusCode).toBe(200);
      expect(statusResponse.body).toHaveProperty('batches');
      expect(Array.isArray(statusResponse.body.batches)).toBe(true);
    });
  });
});