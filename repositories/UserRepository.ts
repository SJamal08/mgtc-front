import axios, {AxiosResponse} from 'axios';
import API_URL from '../config';
import {User} from '../model/User';

export default class UserRepository {
  public static async createUser(user: User): Promise<User> {
    const myUser = await axios.post<User>(
      //   `${API_URL}/api/user/create`,
      'http://localhost:8080/api/user/create',
      user,
    );
    return myUser.data;
  }

  public static async getUser(uid: string): Promise<User> {
    const myUser = await axios.get<User>(
      //   `${API_URL}/api/user/find`,
      'http://localhost:8080/api/user/find/'+ uid,
    );
    console.log(myUser)
    return myUser.data;
  }
}
