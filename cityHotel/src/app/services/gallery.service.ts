import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable()
 export class GalleryService {

  public getGalleryImages(): any {
    let params = new HttpParams().set('path', 'gallery');

    let url = this.HOTEL_CITY_REST_URL + '/images';
    return this.http.get(url, {params});
  }

  constructor(@Inject("HOTEL_CITY_REST_URL") private HOTEL_CITY_REST_URL,
              private http: HttpClient) { }

}
