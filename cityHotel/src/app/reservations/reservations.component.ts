import { Component, OnInit, Inject } from '@angular/core';
import { PersonalInformation } from './PersonalInformation';
import { Reservation } from './Reservation';
import { IMyOptions } from './../../../node_modules/mydaterangepicker/dist/interfaces/my-options.interface';
import { RadioControlValueAccessor } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { IMyDateRangeModel } from './../../../node_modules/mydaterangepicker/dist/interfaces/my-date-range-model.interface';
import 'rxjs/add/observable/of';
import { ActivatedRoute } from '@angular/router';


declare var $ :any;

@Component({
  selector: 'nh-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})
export class ReservationsComponent implements OnInit {

  rooms: any;
  info = new PersonalInformation();
  sendingRequest = false;
  responseRecieved = false;
  myPrice: number;


  onDateRangeChanged(event: IMyDateRangeModel) {
    let nights = (event.endEpoc - event.beginEpoc)/(60*60*24);
    this.info.reservation.nights = nights;
    this.updatePrice();
  }

  getRoomsPrice(paxNumber?: any): number {
    let pax = paxNumber ? paxNumber : this.info.reservation.adults + this.info.reservation.kids;
    let price = 0;
    this.rooms.forEach(function(room) {
      if(room.maxPax === pax) {
        price = room.price;
        return;
      } else if(room.denomination === 'quadruple' && room.maxPax < pax) {
        let extraRoomPax = pax - room.maxPax;
        price = room.price + this.getRoomsPrice(extraRoomPax);
        return;
      }
    }.bind(this))

    return price;
  }

  updatePrice() {
    let price = this.getRoomsPrice();
    this.myPrice = price * this.info.reservation.nights;
  }

  nextStep(from, to) {
    from.classList.add('disabled');
    to.classList.remove('disabled');
    $(to).tab('show');
  }

  validatePhone(event) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  myDateRangePickerOptions: IMyOptions = {
    // other options...
    dateFormat: 'dd.mm.yyyy',
  };


  private dates: any = {beginDate:  {year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate()},
                         endDate: {year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() + 1}};


   confirmReservation() {
     this.sendingRequest = true;
     this.info.reservation.fromDate = this.dates.beginDate;
     this.info.reservation.toDate = this.dates.endDate;

     this.automatedMailService.sendReservationRequestMail(this.info).subscribe(
       response => {
         if(response.status === this.CONSTANTS.RESPONSE_CODES.STATUS_OK) {
           this.responseRecieved = true;
           this.sendingRequest = false;
           this.automatedMailService.sendReservationReplyMail(this.info);
         }
       },
       error => {
         console.log(error);
       }
     );
   }


  constructor(@Inject('Assets') private ASSETS_PATH,
              @Inject('AutomatedMailService') private automatedMailService,
              @Inject('CONSTANTS') private CONSTANTS,
              private route: ActivatedRoute) {
               this.rooms = this.route.snapshot.data.rooms.rooms;
               this.myPrice = this.rooms[0].price;
             }

  ngOnInit() {
  }

}
