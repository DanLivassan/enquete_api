import request from 'supertest'
import app from '../app'

describe('Cors Middleware', () => {
  test('should enable cors', async () => {
    app.post('/test_cors', (req, res) => {
      res.send(req.body)
    })
    await request(app)
      .post('/test_cors')
      .send({ name: 'Dan' })
      .expect('access-control-allow-origin', '*')
      .expect('access-control-allow-methods', '*')
      .expect('access-control-allow-headers', '*')
  })
})
