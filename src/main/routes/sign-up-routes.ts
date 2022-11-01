import { Router } from 'express'
import { expressRouteAdapter } from '../adapters/express-routes-adapter'
import { makeSignUpController } from '../factories/sign-up'

export default (router: Router): void => {
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  router.post('/signup', expressRouteAdapter(makeSignUpController()))
}
