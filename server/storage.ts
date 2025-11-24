import * as bcrypt from "bcrypt";

interface User {
  id: string;
  email: string;
  password: string;
  name: string;
}

const users: Map<string, User> = new Map();
const usersByEmail: Map<string, string> = new Map();

export const storage = {
  async getUserByEmail(email: string): Promise<User | undefined> {
    const userId = usersByEmail.get(email);
    if (!userId) return undefined;
    return users.get(userId);
  },

  async getUserById(id: string): Promise<User | undefined> {
    return users.get(id);
  },

  async createUser(data: Omit<User, "id">): Promise<User> {
    const id = crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36);
    const user: User = { ...data, id };
    users.set(id, user);
    usersByEmail.set(data.email, id);
    return user;
  },

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  },

  async verifyPassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  },
};
