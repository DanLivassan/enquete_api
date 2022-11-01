import { Request, Response } from 'express'
import { Controller, HttpRequest, HttpResponse } from '../../protocol/http'

export const expressRouteAdapter = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      data: req.body
    }
    const httpResponse: HttpResponse = await controller.handle(httpRequest)
    res.status(httpResponse.statusCode).json(httpResponse.body)
  }
}
