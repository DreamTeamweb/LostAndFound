import { ContactComponent } from './components/contact/contact.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ObjectFoundComponent } from './components/object-found/object-found.component';
import { ObjectLostComponent } from './components/object-lost/object-lost.component';


@NgModule({
  declarations: [
    AppComponent,
    ContactComponent,
    ObjectFoundComponent,
    ObjectLostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }