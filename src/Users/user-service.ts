import { DataService, FakeDataProvider } from "../data-service";
import { User } from "./user";

class UserService extends DataService {
  async getAllUsers(): Promise<User[]> {
    try {
      const response = await this.dataService.get('/users');
      this.checkExpectedStatusCode(response, 200);

      return JSON.parse(response.body) || [];
    } catch (error) {
      console.error('Get all users failed.', error);
      return [];
    }
  }

  async addUser(id: number, name: string): Promise<User | undefined> {
    try {
      const response = await this.dataService.post('/user', { id, name });
      this.checkExpectedStatusCode(response, 201);

      return JSON.parse(response.body);
    } catch (error) {
      console.error('Add new user failed.', error);
    }
  }
}

export const userService = new UserService(new FakeDataProvider());
