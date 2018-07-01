import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { GalleryComponent } from './gallery/gallery.component';
import { GalleryThumbnailComponent } from './gallery-thumbnail/gallery-thumbnail.component';
import { ConstantsService } from './services/constants.service';
import { GalleryService } from './services/gallery.service';
import { AutomatedMailService } from './services/automated.mail.service';
import { PricingService } from './services/pricing-service.service';
import { PricingResolverService } from "./services/resolvers/pricing-resolver.service";
import { ReservationsComponent } from './reservations/reservations.component';
import { HomeComponent } from './home/home.component';
import { CompanyComponent } from './company/company.component';
import { FormsModule }   from '@angular/forms';
import { MyDateRangePickerModule } from './../../node_modules/mydaterangepicker/dist/my-date-range-picker.module';
import { HttpClientModule } from '@angular/common/http';
import { GalleryResolverService } from './services/resolvers/gallery-resolver.service';

const appRoutes: Routes = [
  { path: 'gallery',
    component: GalleryComponent,
    resolve: {
      galleryImages: GalleryResolverService
    }
  },
  { path: 'reservations',
    component: ReservationsComponent,
    resolve: {
      rooms: PricingResolverService
    }
  },
  { path: 'home', component: HomeComponent },
  { path: 'ourselves', component: CompanyComponent },
  { path: '', redirectTo:'/home', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    GalleryComponent,
    GalleryThumbnailComponent,
    ReservationsComponent,
    HomeComponent,
    CompanyComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    NgbModule.forRoot(),
    FormsModule,
    MyDateRangePickerModule,
    HttpClientModule
  ],
  providers: [
    GalleryResolverService,
    PricingResolverService,
    {provide: "CONSTANTS", useClass: ConstantsService},
    {provide: "GalleryService", useClass: GalleryService},
    {provide: "PricingService", useClass: PricingService},
    {provide: "AutomatedMailService", useClass: AutomatedMailService},
    {provide: "GalleryImagesPath", useValue: "http://192.168.0.4:8080/gallery/"},
    {provide: "Assets", useValue: "http://192.168.0.4:8080/"},
    {provide: "SASS_PATH", useValue: "http://192.168.0.4:8080/sass/"},
    {provide: "HOTEL_MAIL", useValue: "fermin.alganaras@gmail.com"},
    {provide: "HOTEL_CITY_REST_URL", useValue: "http://192.168.0.4:8080/api/cityHotel"}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
