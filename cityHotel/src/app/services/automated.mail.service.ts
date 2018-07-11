import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SendMailRequest } from './../entities/SendMailRequest';
import { HttpHeaders } from '@angular/common/http';


const headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
const RESERVATION_REQUEST = "Solicitud De Reserva";
const NO_REPLY_RESERVATION_RECIEVED = "NO-REPLY Hemos recibido su solicitud de reserva"

@Injectable()
export class AutomatedMailService {

  public sendReservationRequestMail(requestInfo: any) {

      let reservationRequestMessage = `
                                <img src="${this.ASSETS_PATH}hotelLogoMail.png" class="cityBanner sm-hide lg-visible" alt="">
                                <h3>Solicitud de Reserva</h3>
                                <table style="border-collapse: collapse; font-family: arial, sans-serif; width: 100%;">
                                  <tr>
                                    <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Nombre</th>
                                    <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Apellido</th>
                                    <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Mail</th>
                                    <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Adultos</th>
                                    <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Tipo de cama</th>
                                    <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Niños</th>
                                    <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Fechas</th>
                                    <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Informacion Adicional</th>
                                  </tr>
                                  <tr>
                                    <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${requestInfo.name}</td>
                                    <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${requestInfo.lastName}</td>
                                    <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${requestInfo.email}</td>
                                    <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${requestInfo.reservation.adults}</td>
                                    <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${requestInfo.reservation.bedType}</td>
                                    <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${requestInfo.reservation.kids}</td>
                                    <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${requestInfo.reservation.fromDate.day}/${requestInfo.reservation.fromDate.month}/${requestInfo.reservation.fromDate.year} - ${requestInfo.reservation.toDate.day}/${requestInfo.reservation.toDate.month}/${requestInfo.reservation.toDate.year}</td>
                                    <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${requestInfo.reservation.additionalInformation}</td>
                                  </tr>
                                </table>

                                <p><small>Esto es un mensaje automatizado generado por www.nuevoHotelCity.com</small></p>`;

      let requestBody = new SendMailRequest(this.HOTEL_MAIL, RESERVATION_REQUEST, reservationRequestMessage);
      return this.sendEmail(requestBody);
  }

  public sendReservationReplyMail(requestInfo: any) {
    let reservationReply = `
                              <img src="${this.ASSETS_PATH}hotelLogoMail.png" class="cityBanner sm-hide lg-visible" alt="">
                              <p>Su reserva a nombre de ${requestInfo.name} ${requestInfo.lastName} esta siendo procesada
                              en instantes recibira respuesta de un representante del Hotel.
                              Por favor no responda a este mail.</p>
                              <p><small>Esto es un mensaje automatizado generado por www.nuevoHotelCity.com</small></p>`;

    let requestBody = new SendMailRequest(requestInfo.email, NO_REPLY_RESERVATION_RECIEVED, reservationReply);
    console.log(reservationReply);
    this.sendEmail(requestBody).subscribe(
      response => {
        return response;
      },
      error => {console.log("Error happened" + error)}
    )

  }

  private sendEmail(reqParams : SendMailRequest) {
    let url = this.HOTEL_CITY_REST_URL + '/mail';
    return this.http.post(url, reqParams, {headers: headers});
  }

  constructor(@Inject("HOTEL_CITY_REST_URL") private HOTEL_CITY_REST_URL,
              @Inject('HOTEL_MAIL') private HOTEL_MAIL,
              @Inject('Assets') public ASSETS_PATH,
              @Inject('SASS_PATH') private SASS_PATH,
              private http: HttpClient) { }

}
