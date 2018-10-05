import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { GalleryComponent } from './gallery/gallery.component';
import { GalleryThumbnailComponent } from './gallery-thumbnail/gallery-thumbnail.component';
import { ConstantsService } from './services/constants.service';
import { GalleryService } from './services/gallery.service';
import { AutomatedMailService } from './services/automated.mail.service';
import { ReservationService } from './services/reservation.service';
import { PricingService } from './services/pricing-service.service';
import { MercadoPagoService } from './services/mercadoPago.service';
import { PricingResolverService } from './services/resolvers/pricing-resolver.service';
import { MPDocTypeResolverService } from './services/resolvers/mercadoPago/mp.docType-resolver.service';
import { ReservationsComponent } from './reservations/reservations.component';
import { HomeComponent } from './home/home.component';
import { CompanyComponent } from './company/company.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyDateRangePickerModule } from './../../node_modules/mydaterangepicker/dist/my-date-range-picker.module';
import { HttpClientModule } from '@angular/common/http';
import { GalleryResolverService } from './services/resolvers/gallery-resolver.service';
import { appRoutes } from './routes/appRoutes';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    GalleryComponent,
    GalleryThumbnailComponent,
    ReservationsComponent,
    HomeComponent,
    CompanyComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    NgbModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    MyDateRangePickerModule,
    HttpClientModule
  ],
  providers: [
    GalleryResolverService,
    PricingResolverService,
    MPDocTypeResolverService,
    {provide: 'CONSTANTS', useClass: ConstantsService},
    {provide: 'GalleryService', useClass: GalleryService},
    {provide: 'PricingService', useClass: PricingService},
    {provide: 'AutomatedMailService', useClass: AutomatedMailService},
    {provide: 'ReservationService', useClass: ReservationService},
    {provide: 'MercadoPagoService', useClass: MercadoPagoService},
    {provide: 'GalleryImagesPath', useValue: 'http://localhost:9002/gallery/'},
    {provide: 'Assets', useValue: 'http://localhost:9002/'},
    {provide: 'HOTEL_MAIL', useValue: 'noreply@nuevohotelcity.com'},
    {provide: 'HOTEL_CITY_REST_URL', useValue: 'http://localhost:9002/api/cityHotel'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
