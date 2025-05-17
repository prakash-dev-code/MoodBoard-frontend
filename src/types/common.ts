import { PropsWithChildren } from "react";

export interface child {
  children: PropsWithChildren<React.ReactNode>;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  password?: string;
  // add more fields as needed
}
