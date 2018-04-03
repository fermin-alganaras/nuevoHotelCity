import { NhDate } from './Date';

export class Reservation {
  adults: number;
  kids: number;
  bedType: String;
  additionalInformation: String;
  fromDate: NhDate;
  toDate: NhDate;

  constructor(){
    this.adults = 1;
  }
}
