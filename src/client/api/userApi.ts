import { User } from "../models/User";
import { BaseApi } from "./coreBaseApi";

class UserApi extends BaseApi {
  getAllUsers(): Promise<User[]> {
    return this.get<User[]>("/users");
  }
}

export default new UserApi();
