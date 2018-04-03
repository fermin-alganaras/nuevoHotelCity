import { Injectable } from '@angular/core';

@Injectable()
export class ConstantsService {

  lang = {
    fotos: "Fotos",
    reservas: "Reservas",
    tarifas: "Tarifas",
    acercaDe: "Acerca de nosotros"
  }

  constructor() { }

}
