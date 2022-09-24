export interface AccessorieOrder {
  id: string;
  accessorieName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  status: string;
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
  iCountry: string;
  iState: string;
//  Organisation form
  oName: string;
  oType: string;
  oSector: string;
  oRegistrationNumber: string;
  oResponsibleName: string;
  oAddress: string;
  oZipCode: number;
  oPhone: number;
  oEmail: string;
  oCountry: string;
  oState: string;
  createdAt: Date;
  updatedAt: Date;
}
