import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { PersonalInformation } from './PersonalInformation';
import { Reservation } from './Reservation';
import { Credit } from './Credit';
import { PaymentRequest } from './PaymentRequest';
import { IMyOptions } from './../../../node_modules/mydaterangepicker/dist/interfaces/my-options.interface';
import { RadioControlValueAccessor } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { IMyDateRangeModel } from './../../../node_modules/mydaterangepicker/dist/interfaces/my-date-range-model.interface';
import 'rxjs/add/observable/of';
import { ActivatedRoute } from '@angular/router';



declare var $: any;


@Component({
  selector: 'nh-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})
export class ReservationsComponent implements OnInit {

  @ViewChild('availability') availability: ElementRef;
  @ViewChild('error') error: ElementRef;
  @ViewChild('creditError') creditError: ElementRef;
  @ViewChild('creditCard') creditCard: ElementRef;
  @ViewChild('confirmation') confirmation: ElementRef;
  rooms: any;
  docTypes: any;
  info = new PersonalInformation();
  sendingRequest = false;
  responseRecieved = false;
  myPrice: number;
  showAvailavilityTag = false;
  closeResult: string;
  credit = new Credit();
  docNumberPattern:any;
  token: any;
  cardThumbnail: String;
  cardNumberDisplay: string;
  payment = new PaymentRequest();
  errorMessage: String;

  open(content) {
    this.modalService.open(content, { size: 'sm' });
  }

  checkAvailability() {
    this.sendingRequest = true;
    this.reservationService.checkAvailability(this.dates.beginDate, this.dates.endDate, this.info.reservation.adults, this.info.reservation.kids).subscribe(
      response => {

        if (response) {
            this.open(this.availability);
            this.info.reservation.availability = response;
        } else {
            this.errorMessage = this.CONSTANTS.ERROR_MESSAGES.NO_AVAILABILITY;
            this.open(this.error);
            this.info.reservation.availability = response;
        }
      },
      error => {
        this.errorMessage = error.message;
        this.open(this.error);
      }
    );

    this.sendingRequest = false;
  }

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
    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  validateOnlyNumbers(event, max) {
    const pattern = /^\d+$/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  validateOnlyLettersAndSpaces(event, max) {
    const pattern = /^[a-zA-Z\s]*$/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }


  validateNoSpecialChars(event, max) {
    const pattern = /[^a-zA-Z0-9]/;

    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  myDateRangePickerOptions: IMyOptions = {
    // other options...
    dateFormat: 'dd.mm.yyyy',
  };


  private dates: any = {beginDate:  {year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate()},
                         endDate: {year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() + 1}};

   getToken(form){
     return this.mercadoPagoService.getToken(form);
   }

   createPaymentMethodElement(id) {
     let form = document.querySelector('#creditCardForm');

     if (document.querySelector("input[name=paymentMethodId]")===null) {
        var paymentMethod = document.createElement('input');
        paymentMethod.setAttribute('name', "paymentMethodId");
        paymentMethod.setAttribute('type', "hidden");
        paymentMethod.setAttribute('value', id);

        form.appendChild(paymentMethod);
    } else {
        (<HTMLInputElement>document.querySelector("input[name=paymentMethodId]")).value = id;
    }

    return form;
   }

   getPaymentMethodAndToken() {
     this.sendingRequest = true;
     let bin = this.credit.cardNumber.slice(0, 6);

     this.mercadoPagoService.guessPaymentMethod(bin).then(
       (response) => {
         this.cardThumbnail = response[0].secure_thumbnail;
         this.cardNumberDisplay = this.credit.cardNumber.slice(0, 4) + " " + this.credit.cardNumber.slice(0, 3) + "...";
         this.payment.payment_method_id = response[0].id;

         this.getToken(this.createPaymentMethodElement(response[0].id)).then(
           (response) => {
             this.sendingRequest = false;
             this.token = response;
             this.nextStep(this.creditCard.nativeElement, this.confirmation.nativeElement);
           },
           (error) => {
             this.sendingRequest = false;
             this.errorMessage = error;
             this.open(this.error);
           }
         );
       },
       (error) => {
         this.sendingRequest = false;
         this.errorMessage = error.message;
         this.open(this.error);
       }
     );
   }

   confirmReservation() {
     this.sendingRequest = true;
     this.info.reservation.fromDate = this.dates.beginDate;
     this.info.reservation.toDate = this.dates.endDate;
     this.info.reservation.additionalInformation = this.info.reservation.additionalInformation || "N/A";
     this.info.reservation.bedType = this.info.reservation.bedType || "Individual";

     this.payment.amount = this.myPrice;
     this.payment.token = this.token;
     this.payment.email = this.info.email;

     this.reservationService.doPay(this.payment).subscribe(
       response => {
         if(response.status==="201") {
             if(response.body.status === this.CONSTANTS.PAYMENT_CODES.REJECTED) {
               this.sendingRequest = false;
               this.errorMessage = response.body.status_detail;
               this.open(this.error);

             } else {
               this.reservationService.doReservation(this.dates.beginDate, this.dates.endDate, this.info.reservation.adults, this.info.reservation.kids, response.response.id).subscribe(
                 response => {
                   if (response.status===this.CONSTANTS.RESPONSE_CODES.STATUS_OK) {
                     this.sendingRequest = false;
                     this.responseRecieved = true;
                     this.reservationService.sendEmail(this.info);
                   } else {
                     this.sendingRequest = false;
                     this.errorMessage = this.CONSTANTS.ERROR_MESSAGES.RESERVATION_ERROR;
                     this.open(this.error);
                   }
                 },
                 error => {
                   this.sendingRequest = false;
                   this.errorMessage = this.CONSTANTS.ERROR_MESSAGES.RESERVATION_ERROR;
                   this.open(this.error);
                 }
               );
             }
             this.responseRecieved = true;
             this.sendingRequest = false;
           } else {
             this.sendingRequest = false;
             this.errorMessage = this.CONSTANTS.ERROR_MESSAGES.PAYMENT_ERROR;
             this.open(this.error);
           }
         },
         error => {
           this.sendingRequest = false;
           this.errorMessage = error.message;
           this.open(this.error);
         }
     )
   }


  constructor(@Inject('Assets') public ASSETS_PATH,
              @Inject('AutomatedMailService') private automatedMailService,
              @Inject('ReservationService') private reservationService,
              @Inject('MercadoPagoService') private mercadoPagoService,
              @Inject('CONSTANTS') public CONSTANTS,
              private modalService: NgbModal,
              private route: ActivatedRoute) {
               this.rooms = this.route.snapshot.data.rooms.rooms;
               this.myPrice = this.rooms[0].price;

               this.docTypes = this.route.snapshot.data.docTypes;
               this.credit.docType = this.docTypes[0];
               this.docNumberPattern = `.{${this.credit.docType.min_length},${this.credit.docType.max_length}}`
             }

  ngOnInit() {
  }

}
