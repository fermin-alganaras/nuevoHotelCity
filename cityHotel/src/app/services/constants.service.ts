import { Injectable } from '@angular/core';

@Injectable()
export class ConstantsService {

  lang = {
    fotos: 'Fotos',
    reservas: 'Reservas',
    tarifas: 'Tarifas',
    acercaDe: 'Acerca de nosotros'
  }

  RESPONSE_CODES = {
    STATUS_OK: '200',
    STATUS_ERROR: '400'
  }

  ERROR_MESSAGES = {
    NO_AVAILABILITY: 'Lamentablemente no disponemos habitaciones para las fechas elegidas',
    INVALID_CARD_INFO: 'No pudimos validar la informacion de su tarjeta. Por favor, verifique la informacion e intente nuevamente.',
    PAYMENT_ERROR: 'No pudimos procesar su pago, por favor verifique la informacion de su tarjeta e intente nuevamente',
    RESERVATION_ERROR: 'El pago se realizo correctamente, pero no pudimos procesar la reserva, esto se debe a un error en nuestro sistema, comuniquese con reservas@nuevohotelcity.com'

  }

  PAYMENT_CODES = {
    APPROVED: 'approved',
    IN_PROCESS: 'in_process',
    REJECTED: 'rejected'
  }
  constructor() { }

}
