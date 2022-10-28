import { MongoHelper } from '../infra/db/mongodb/helpers/mongo-helper'
import app from './config/app'
import env from './config/env'

MongoHelper.connect().then(() => {
  app.listen(env.port, () => console.log(`Server is running on port: ${env.port}`))
}).catch(console.error)
