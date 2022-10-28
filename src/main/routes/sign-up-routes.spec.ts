import app from '../config/app'
import request from 'supertest'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'

describe('Sign Up tests', () => {
  beforeAll(async () => {
    await MongoHelper.connect()
  })
  afterAll(async () => {
    await MongoHelper.disconnect()
  })
  test('should create a new account', async () => {
    await request(app)
      .post('/signup')
      .send({ name: 'Danilo', email: 'danilo@mail.com', password: 'pass', passwordConfirmation: 'pass' })
      .expect(200)
  })
})
