import { Injectable, Inject } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PricingResolverService  implements Resolve<any>{
  result: any;
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<any>|Promise<any>|any {

    return this.pricingService.getPrices();
  }

  constructor(@Inject('PricingService') private pricingService) { }

}
