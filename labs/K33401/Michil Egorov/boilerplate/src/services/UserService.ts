import User from "../orm/models/User"


class UserService {
    public async getById(id: number): Promise<User> {
        const user = await User.findByPk(id);

        if(!user) {
            throw new Error(`User (id=${id}) does not exist`);
        }

        return user;
    }

    public async create(userData: {email: string, password: string}): Promise<User> {
      const user = await User.create(userData)
      return user
    }
  }
  
  export default UserService
  