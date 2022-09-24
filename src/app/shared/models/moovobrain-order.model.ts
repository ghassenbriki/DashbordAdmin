export interface MoovobrainOrder {
  id: string;
  mode: string;
  status: string;
  pricePurchase: number;
  priceShipping: number;
  priceTaxes: number;
  priceTotal: number;
  quantity: number;
//  Wheelchair
  steeringSystem: boolean;
  headset: boolean;
  wheelchair: boolean;
  mobileApp: boolean;
//  Safety
  obstacleDetection: boolean;
  camera: boolean;
  gps: boolean;
  notifications: boolean;
  sms: boolean;
//  Accessories
  securityBelt: boolean;
  headrest: boolean;
  mirror: boolean;
  table: boolean;
  rearCamera: boolean;
// Services
  trainingSession: boolean;
  trainingHours: string | number;
  control: boolean;
  controlYears: string | number;
  controlYearsAdded: number;
  demo: boolean;
//  Client Nature , individual or organisation
  clientNature: string;
//  Individuals form
  iName: string;
  iEmail: string;
  iBirthday: Date;
  iAddress: string;
  iZipCode: number;
  iPhone: number;
  iHandicap: string;
//  Organisation form
  oName: string;
  oType: string;
  oSector: string;
  oRegistrationNumber: string;
  oResponsibleName: string;
  oHandicap: string;
  oAddress: string;
  oZipCode: number;
  oPhone: number;
  oEmail: string;
// Dates
  createdAt: Date;
  updatedAt: Date;
}
