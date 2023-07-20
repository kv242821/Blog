import { BaseModel } from '.';

export interface IAttendance extends BaseModel {
  date: string;
  checkinTime: string;
  checkoutTime: string;
  note?: string;
}
