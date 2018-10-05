import { Injectable, Inject } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MPDocTypeResolverService  implements Resolve<any>{
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<any>|Promise<any>|any {

    return this.MercadoPagoService.getIdentificationTypes();
  }

  constructor(@Inject('MercadoPagoService') private MercadoPagoService) { }

}
