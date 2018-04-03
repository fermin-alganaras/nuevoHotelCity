import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { GalleryComponent } from './gallery/gallery.component';
import { GalleryThumbnailComponent } from './gallery-thumbnail/gallery-thumbnail.component';
import { ConstantsService } from './constants.service';
import { GalleryService } from './gallery.service';
import { AutomatedMailService } from './automated.mail.service';
import { ReservationsComponent } from './reservations/reservations.component';
import { HomeComponent } from './home/home.component';
import { PricesComponent } from './prices/prices.component';
import { CompanyComponent } from './company/company.component';
import { ModalComponent } from './modal/modal.component';
import { FormsModule }   from '@angular/forms';
import { MyDateRangePickerModule } from './../../node_modules/mydaterangepicker/dist/my-date-range-picker.module';
import { HttpClientModule } from '@angular/common/http';

const appRoutes: Routes = [
  {path: 'gallery', component: GalleryComponent},
  {path: 'reservations', component: ReservationsComponent},
  {path: 'home', component: HomeComponent},
  {path: 'prices', component: PricesComponent},
  {path: 'ourselves', component: CompanyComponent},
  {path: '', redirectTo:'/home', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    GalleryComponent,
    GalleryThumbnailComponent,
    ReservationsComponent,
    HomeComponent,
    PricesComponent,
    CompanyComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    MyDateRangePickerModule,
    HttpClientModule
  ],
  providers: [
    {provide: "CONSTANTS", useClass: ConstantsService},
    {provide: "GalleryService", useClass: GalleryService},
    {provide: "AutomatedMailService", useClass: AutomatedMailService},
    {provide: "GalleryImagesPath", useValue: "./../../assets/gallery/"},
    {provide: "Assets", useValue: "./../../assets/"},
    {provide: "HOTEL_MAIL", useValue: "fermin.alganaras@gmail.com"},
    {provide: "HOTEL_CITY_REST_URL", useValue: "http://localhost:8080"}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
