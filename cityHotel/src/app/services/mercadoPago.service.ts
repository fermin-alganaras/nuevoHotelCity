import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
declare let Mercadopago: any;
const publicKey = 'TEST-230fd717-dafe-4779-84c3-4e3cb22f177e';

Mercadopago.setPublishableKey(publicKey);

@Injectable()
export class MercadoPagoService {

  public getToken(form): any {
    return new Promise((resolve, reject) => {
      Mercadopago.createToken(form, function(status, response) {
        if(status === 200) {
          resolve(response);
        } else {
          reject(this.CONSTANTS.ERROR_MESSAGES.INVALID_CARD_INFO);
        }
      });

    });
  }

  public getIdentificationTypes(): any {
      let promise = new Promise((resolve, reject) => {
        Mercadopago.getIdentificationTypes(function(status, response) {
          if(status === 200) {
            resolve(response);
          } else {
            reject('something went wrong retriveing document types');
          }
        });
      }).catch(err => {throw err});

      return promise;
  }

  public guessPaymentMethod(bin): any {
    return new Promise((resolve, reject) => {
      Mercadopago.getPaymentMethod({'bin': bin}, function(status, response) {
        if(status === 200) {
          resolve(response);
        } else {
          reject('something went wrong guessing payment method');
        }
      }).catch(err => {throw err});

    });
  }

  constructor(@Inject('HOTEL_CITY_REST_URL') private HOTEL_CITY_REST_URL,
              private http: HttpClient) { }

}
