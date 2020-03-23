import DataProvider, { Response, StatusCode } from "./data-provider";
import { Hobby } from "./Hobbies/hobby";
import { User } from "./Users/user";

const fakePause = 1000;

export class FakeDataProvider implements DataProvider {
  async get(uri: string): Promise<Response> {
    await this.fakeWait();
    if (uri.includes('/users')) {
      return Promise.resolve({ body: sessionStorage.getItem('users'), statusCode: 200 });
    }
    if (uri.includes('/hobbies/')) {
      const userId = parseInt(uri.replace('/hobbies/', '')) || 0;
      const hobbies = (JSON.parse(sessionStorage.getItem('hobbies') || '[]') as Hobby[])
        ?.filter(hobby => hobby.userId === userId) || null;
      return Promise.resolve({ body: JSON.stringify(hobbies), statusCode: 200 });
    }
    return Promise.resolve({ body: null, statusCode: 404 });
  }

  async post(uri: string, body: any): Promise<Response> {
    await this.fakeWait();
    if (uri.includes('/user')) {
      const users = [...JSON.parse(sessionStorage.getItem('users') || '[]') as User[], body];
      sessionStorage.setItem('users', JSON.stringify(users))
      return Promise.resolve({ body: JSON.stringify(body), statusCode: 201 });
    }
    if (uri.includes('/hobby')) {
      const hobbies: Hobby[] = [...JSON.parse(sessionStorage.getItem('hobbies') || '[]') as Hobby[], body];
      sessionStorage.setItem('hobbies', JSON.stringify(hobbies))
      return Promise.resolve({ body: JSON.stringify(body), statusCode: 201 });
    }
    return Promise.resolve({ body: null, statusCode: 404 });
  }

  async delete(uri: string): Promise<Response> {
    await this.fakeWait();
    if (uri.includes('/hobbies/')) {
      const hobbyId = parseInt(uri.replace('/hobbies/', '')) || 0;
      const hobbies = (JSON.parse(sessionStorage.getItem('hobbies') || '[]') as Hobby[])
        ?.filter(hobby => hobby.id !== hobbyId) || null;
      sessionStorage.setItem('hobbies', JSON.stringify(hobbies))
      return Promise.resolve({ body: null, statusCode: 204 });
    }
    return Promise.resolve({ body: null, statusCode: 404 });
  }

  private async fakeWait(): Promise<void> { return new Promise(resolve => setTimeout(() => resolve(), fakePause)) }
}

export class DataService {
  constructor(protected dataService: DataProvider) {}
  protected checkExpectedStatusCode(response: Response, expectedStatus: StatusCode) {
    if (response.statusCode !== expectedStatus) {
      throw new Error(`Unexpected response status ${response.statusCode}`, );
    }
  }
}
