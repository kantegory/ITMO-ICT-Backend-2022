import bcrypt from "bcrypt";

export default (user: any, password: string): boolean => {
    return bcrypt.compareSync(password, user.password);
}
