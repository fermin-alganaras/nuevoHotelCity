import { Injectable } from '@angular/core';

@Injectable()
export class ConstantsService {

  lang = {
    fotos: "Fotos",
    reservas: "Reservas",
    tarifas: "Tarifas",
    acercaDe: "Acerca de nosotros"
  }

  RESPONSE_CODES = {
    STATUS_OK: "200",
    STATUS_ERROR: "400"
  }

  constructor() { }

}
