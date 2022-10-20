export interface HttpResponse {
  statusCode: number;
  body: any;
}
export interface HttpRequest {
  data: any;
}
export interface Controller {
  handle(request: HttpRequest): Promise<HttpResponse>;
}
