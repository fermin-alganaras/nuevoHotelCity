import { NhDate } from './Date';

export class Reservation {
  adults: number;
  kids: number;
  bedType: String;
  additionalInformation: String;
  fromDate: NhDate;
  toDate: NhDate;
  nights: number;
  availability: Boolean;

  constructor() {
    this.adults = 1;
    this.kids = 0;
    this.nights = 1;
  }
}
