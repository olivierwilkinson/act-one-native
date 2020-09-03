import { GetUser } from "../graphql/queries/types/GetUser";

const admins = ["olivier.wilkinson@gmail.com"];

export default (user: GetUser["user"]) =>
  !!(user && user.email && admins.includes(user.email));
