import { ContactComponent } from './components/contact/contact.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ObjectFoundComponent } from './components/object-found/object-found.component';
import { ObjectLostComponent } from './components/object-lost/object-lost.component';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
import { HomeComponent } from './components/home/home.component';
import {AgmCoreModule} from '@agm/core';
import { ReactiveFormsModule } from '@angular/forms';
//FRENCH DATES
import { LOCALE_ID } from '@angular/core';

import { registerLocaleData } from '@angular/common';

import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr);
//NUMBER INPUT
import {Ng2TelInputModule} from 'ng2-tel-input';
//Imge compress
import {NgxImageCompressService} from 'ngx-image-compress';



@NgModule({
  declarations: [
    AppComponent,
    ContactComponent,
    ObjectFoundComponent,
    ObjectLostComponent,
    SignupComponent,
    SigninComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,   
    ReactiveFormsModule,
    Ng2TelInputModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDAH49QrWwcdWw7aDCbLWrN_g__jYcniFk'
    })
  ],
  providers: [ {provide: LOCALE_ID, useValue: "fr-CA" },NgxImageCompressService],
  bootstrap: [AppComponent]
})
export class AppModule { }
