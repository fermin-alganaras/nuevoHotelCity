import { Reservation } from './Reservation';

export class PersonalInformation {
   name: String;
   lastName: String;
   email: String;
   phone: number;
   nationality: String;
   reservation: Reservation;

   constructor() {
     this.reservation = new Reservation;
   }
}
