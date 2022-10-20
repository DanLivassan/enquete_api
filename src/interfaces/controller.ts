export interface HttpResponse {
  statusCode: number;
}
export interface HttpRequest {
  data: any;
}
export interface Controller {
  handle(request: HttpRequest): Promise<HttpResponse>;
}
