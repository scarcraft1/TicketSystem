import { TICKET_STATUS } from "./types";

export interface Ticket {
  _id: string;
  author: string;
  status: TICKET_STATUS;
  message: string;
  creationDate: Date;
  closedDate?: Date;
  answers: string[]
};
