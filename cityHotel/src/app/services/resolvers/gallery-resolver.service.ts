import { Injectable, Inject } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class GalleryResolverService  implements Resolve<any>{
  result: any;
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<any>|Promise<any>|any {

    return this.galleryService.getGalleryImages();
  }

  constructor(@Inject('GalleryService') private galleryService) { }

}
