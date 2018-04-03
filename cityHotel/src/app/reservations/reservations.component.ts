import { Component, OnInit, Inject } from '@angular/core';
import { PersonalInformation } from './PersonalInformation';
import { Reservation } from './Reservation';
import {IMyOptions} from './../../../node_modules/mydaterangepicker/dist/interfaces/my-options.interface';
import { RadioControlValueAccessor } from '@angular/forms';
import { AutomatedMailService } from "./../automated.mail.service";

declare var $ :any;

@Component({
  selector: 'nh-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})
export class ReservationsComponent implements OnInit {

  info = new PersonalInformation;


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
     this.info.reservation.fromDate = this.dates.beginDate;
     this.info.reservation.toDate = this.dates.endDate;

     this.automatedMailService.sendReservationRequestMail(this.info);
   }

  constructor(@Inject('Assets') private ASSETS_PATH,
  @Inject('AutomatedMailService') private automatedMailService) { }

  ngOnInit() {
  }

}
