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
                                <h1>Nuevo Hotel City</h1>
                                <h3><small>Mendoza Argentina</small></h3><br><br>
                                <h3>Solicitud de Reserva</h3>
                                <label>Nombre: </label><h6>${requestInfo.name}</h6>
                                <label>Email: Apellido: </label><h6>${requestInfo.name}</h6>
                                <label>Cantidad de adultos: </label><h6>${requestInfo.adults}</h6>
                                <label>Tipo de cama </label><h6>${requestInfo.bedType}</h6>
                                <label>Cantidad de niños:</label><h6>${requestInfo.kids}</h6>
                                <label>Fechas: </label><h6>${requestInfo.reservation.fromDate.day}/${requestInfo.reservation.fromDate.month}/${requestInfo.reservation.fromDate.year} - ${requestInfo.reservation.toDate.day}/${requestInfo.reservation.toDate.month}/${requestInfo.reservation.toDate.year}</h6>
                                <label>Informacion adicional: </label><p>${requestInfo.additionalInformation}</p><br><br>
                                <p><small>Esto es un mensaje automatizado generado por www.nuevoHotelCity.com</small></p>`;

      let requestBody = new SendMailRequest(this.HOTEL_MAIL, RESERVATION_REQUEST, reservationRequestMessage);
      return this.sendEmail(requestBody);
  }

  public sendReservationReplyMail(requestInfo: any) {
    let reservationReply = `
                              <img src="${this.ASSETS_PATH}hotelLogoMail.png" class="cityBanner sm-hide lg-visible" alt="">
                              <p>Su reserva a nombre de ${requestInfo.name} esta siendo procesada
                              en instantes recibira respuesta de un representante del Hotel.
                              Por favor no responda a este mail.</p>
                              <p><small>Esto es un mensaje automatizado generado por www.nuevoHotelCity.com</small></p>
                              <p>&copy; Nuevo Hotel City, Mendoza, Argentina<p>`;

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
    let json = JSON.stringify(reqParams);
    let params = "json="+json;
    let url = this.HOTEL_CITY_REST_URL + '/mail';
    return this.http.post(url, params, {headers: headers});
  }

  constructor(@Inject("HOTEL_CITY_REST_URL") private HOTEL_CITY_REST_URL,
              @Inject('HOTEL_MAIL') private HOTEL_MAIL,
              @Inject('Assets') public ASSETS_PATH,
              @Inject('SASS_PATH') private SASS_PATH,
              private http: HttpClient) { }

}
