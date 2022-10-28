import app from '../config/app'
import request from 'supertest'

describe('Sign Up tests', () => {
  test('should create a new account', async () => {
    await request(app)
      .post('/signup')
      .send({ name: 'Danilo', email: 'danilo@mail.com', password: 'pass', passwordConfirmation: 'pass' })
      .expect(200)
  })
})
