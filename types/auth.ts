import { User } from "./modelTypes";

export type AuthPayload = {
  token: string;
  user: User;
};
