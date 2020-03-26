import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ObjectPerduComponent } from './object-perdu/object-perdu.component'; // Add this
import { ObjectTrouveComponent } from './object-trouve/object-trouve.component'; // Add this
import { ContactComponent } from './contact/contact.component'; // Add this


const routes: Routes = [
  { path: '', component: ObjectPerduComponent },              // Add this
  { path:'objTrouve', component: ObjectTrouveComponent },           // Add this
  { path: 'contact', component: ContactComponent }           // Add this
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
