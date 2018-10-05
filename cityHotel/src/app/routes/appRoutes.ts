 import { Routes } from '@angular/router';
 import { GalleryComponent } from '../gallery/gallery.component';
 import { ReservationsComponent } from '../reservations/reservations.component';
 import { PricingResolverService } from '../services/resolvers/pricing-resolver.service';
 import { MPDocTypeResolverService } from '../services/resolvers/mercadoPago/mp.docType-resolver.service';
 import { GalleryResolverService } from '../services/resolvers/gallery-resolver.service';
 import { HomeComponent } from '../home/home.component';
 import { CompanyComponent } from '../company/company.component';

export const appRoutes: Routes = [
  { path: 'gallery',
    component: GalleryComponent,
    resolve: {
      galleryImages: GalleryResolverService
    }
  },
  { path: 'reservations',
    component: ReservationsComponent,
    resolve: {
      rooms: PricingResolverService,
      docTypes: MPDocTypeResolverService
    }
  },
  { path: 'home', component: HomeComponent },
  { path: 'ourselves', component: CompanyComponent },
  { path: '', redirectTo:'/home', pathMatch: 'full' }
];
