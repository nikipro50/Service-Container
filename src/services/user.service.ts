import { Service } from "../core/container";
import User from "../models/user";

@Service
export default class UserService {
    private users: User[] = [];

    addUser(name: string): User {
        const user = { id: Date.now(), name };
        this.users.push(user);
        return user;
    }

    getAll(): ReadonlyArray<User> {
        return this.users;
    }
}
