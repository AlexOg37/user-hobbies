export type StatusCode = 200 | 201 | 204 | 404;

export type Response = {
  statusCode: StatusCode,
  body: any
}

export default interface DataProvider {
  get: (uri: string) => Promise<Response>,
  post: (uri: string, body: any) => Promise<Response>,
  delete: (uri: string) => Promise<Response>
}
