import {Client} from './client.model';

export interface ServiceRequest {
  id: string;
  type: string;
  schedules: any;
  name: string;
  email: string;
  clientID: string;
  country: string;
  hours: number;
  phone: string;
  status: string;
  owner: Client;
  createdAt: Date;
  updatedAt: Date;
}
