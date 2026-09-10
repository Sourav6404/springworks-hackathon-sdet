const request = require('supertest');

// Requiring server starts the Express app on port 3004
require('../server');

const BASE_URL = `http://localhost:${process.env.PORT || 3004}`;

describe('API Regression Tests (Tests 1-5)', () => {

  // 1. Wrong status code – POST /api/quote should return 200 OK
  test('1. POST /api/quote should return 200 OK status code', async () => {
    const response = await request(BASE_URL)
      .post('/api/quote')
      .send({
        checkIds: ['IDENTITY'],
        discountPercent: 10
      });

    expect(response.status).toBe(200);
  });

  // 2. Hidden field leak – GET /api/checks-catalog must not expose vendorCost
  test('2. GET /api/checks-catalog must not expose vendorCost', async () => {
    const response = await request(BASE_URL)
      .get('/api/checks-catalog');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);

    response.body.forEach((check) => {
      expect(check).not.toHaveProperty('vendorCost');
    });
  });

  // 3. Duplicate check IDs – The same check should be priced only once
  test('3. POST /api/quote should price duplicate check IDs only once', async () => {
    const response = await request(BASE_URL)
      .post('/api/quote')
      .send({
        checkIds: ['IDENTITY', 'IDENTITY'],
        discountPercent: 0
      });

    expect(response.body.subtotal).toBe(299);
  });

  // 4. Missing checkIds – Should return 400 Bad Request
  test('4. POST /api/quote without checkIds should return 400 Bad Request', async () => {
    const response = await request(BASE_URL)
      .post('/api/quote')
      .send({
        discountPercent: 10
      });

    expect(response.status).toBe(400);
  });

  // 5. Invalid checkIds – Unknown checkIds should return 400 Bad Request
  test('5. POST /api/quote with unknown checkIds should return 400 Bad Request', async () => {
    const response = await request(BASE_URL)
      .post('/api/quote')
      .send({
        checkIds: ['INVALID_CHECK_ID_9999'],
        discountPercent: 0
      });

    expect(response.status).toBe(400);
  });

});
