import { Router } from 'express'
import { expressRouteAdapter } from '../adapters/express-routes-adapter'
import { makeLoginController } from '../factories/login'

export default (router: Router): void => {
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  router.post('/login', expressRouteAdapter(makeLoginController()))
}
