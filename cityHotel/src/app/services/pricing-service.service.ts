import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PricingService {

  public getPrices(): any {

    let url = this.HOTEL_CITY_REST_URL + '/prices';
    return this.http.get(url, {});
  }

  constructor(@Inject('HOTEL_CITY_REST_URL') private HOTEL_CITY_REST_URL,
              private http: HttpClient) { }

}
