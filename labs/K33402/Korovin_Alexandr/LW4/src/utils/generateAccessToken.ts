import { config } from "../config/config";
import { sign } from "jsonwebtoken";

export default (email: string) => {
  return sign(email, config.jwt.key);
};
