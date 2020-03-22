import { DataService, FakeDataProvider } from "../data-service";
import { Hobby, PassionLevel } from "./hobby";

class HobbyService extends DataService {
  async getHobbiesForUser(userId: number): Promise<Hobby[]> {
    try {
      const response = await this.dataService.get(`/hobbies/${userId}`);
      this.checkExpectedStatusCode(response, 200);

      return JSON.parse(response.body) || [];
    } catch (error) {
      console.error('Get hobbies failed.', error);
      return [];
    }
  }

  async addHobby(
    id: number,
    userId: number,
    passionLevel: PassionLevel,
    description: string,
    since: string
  ): Promise<Hobby | undefined> {
    try {
      const response = await this.dataService.post('/hobby', { id, userId, passionLevel, description, since });
      this.checkExpectedStatusCode(response, 201);

      return JSON.parse(response.body);
    } catch (error) {
      console.error('Add new hobby failed.', error);
    }
  }

  async deleteHobby(id: number): Promise<boolean> {
    try {
      const response = await this.dataService.get(`/hobbies/${id}`);
      this.checkExpectedStatusCode(response, 204);
      return true;
    } catch (error) {
      console.error('Get hobbies failed.', error);
      return false;
    }
  }
}

export const hobbyService = new HobbyService(new FakeDataProvider());
