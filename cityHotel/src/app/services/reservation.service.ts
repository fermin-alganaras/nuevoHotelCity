import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

const headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');

@Injectable()
 export class ReservationService {

   private checkAvailability(beginDate : any, endDate : any, adults : any, kids : any) {
     let reqParams = {beginDate: "", endDate: "", adultPax: 1, kidPax: 0};
     reqParams.beginDate = "beginDate";
     reqParams.endDate = "endDate";
     reqParams.adultPax = adults;
     reqParams.kidPax = kids;

     console.log(reqParams);

     let url = this.HOTEL_CITY_REST_URL + '/rooms/availability';
     this.http.post(url, reqParams, {headers: headers}).subscribe(
       response => {
         return response;
       },
       error => {console.log("Error happened" + error)}
     );
   }

  constructor(@Inject("HOTEL_CITY_REST_URL") private HOTEL_CITY_REST_URL,
              private http: HttpClient) { }

}
