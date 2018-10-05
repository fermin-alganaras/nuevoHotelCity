import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

const headers = new HttpHeaders().set('Content-Type','application/json');

@Injectable()
 export class ReservationService {

   private sendEmail(info: any) {
     this.automatedMailService.sendReservationReplyMail(info);
   }

   private checkAvailability(beginDate : any, endDate : any, adults : any, kids : any) {
     let reqParams = {beginDate: '', endDate: '', adultPax: 1, kidPax: 0};
     reqParams.beginDate = beginDate;
     reqParams.endDate = endDate;
     reqParams.adultPax = adults;
     reqParams.kidPax = kids;

     let url = this.HOTEL_CITY_REST_URL + '/rooms/availability';
     return this.http.post(url, reqParams, {headers: headers});
   }

   private doReservation(beginDate : any, endDate : any, adults : any, kids : any, paymentId: any) {
     let reqParams = {beginDate: '', endDate: '', adultPax: 1, kidPax: 0, paymentId: 0};
     reqParams.beginDate = beginDate;
     reqParams.endDate = endDate;
     reqParams.adultPax = adults;
     reqParams.kidPax = kids;
     reqParams.paymentId = paymentId;

     let url = this.HOTEL_CITY_REST_URL + '/reservation';
     return this.http.post(url, reqParams, {headers: headers});
   }

   private doPay(params : any) {
     let url = this.HOTEL_CITY_REST_URL + '/payments';
     return this.http.post(url, params, {headers: headers});
   }

  constructor(@Inject('HOTEL_CITY_REST_URL') private HOTEL_CITY_REST_URL,
              @Inject('AutomatedMailService') private automatedMailService,
              @Inject('CONSTANTS') public CONSTANTS,
              private http: HttpClient) { }

}
