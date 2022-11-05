import app from '../config/app'
import request from 'supertest'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'

describe('Login tests', () => {
  beforeAll(async () => {
    await MongoHelper.connect()
    await request(app)
      .post('/signup')
      .send({ name: 'Danilo', email: 'danilo@mail.com', password: 'pass', passwordConfirmation: 'pass' })
  })
  afterAll(async () => {
    await MongoHelper.disconnect()
  })
  test('should retrieve an account', async () => {
    await request(app)
      .post('/login')
      .send({ email: 'danilo@mail.com', password: 'pass' }).expect(200)
  })
  test('should give an error an account', async () => {
    await request(app)
      .post('/login')
      .send({ email: 'danilo@mail.com', password: 'wrong' }).expect(401)
  })
})
