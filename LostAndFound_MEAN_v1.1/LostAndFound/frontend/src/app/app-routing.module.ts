import { ObjectLostComponent } from './components/object-lost/object-lost.component';
import { ObjectFoundComponent } from './components/object-found/object-found.component';
import { ContactComponent } from './components/contact/contact.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [
  {path:'', redirectTo:'object-found',pathMatch:'full'},
  {path:'object-found',component:ObjectFoundComponent},
  {path:'object-lost',component:ObjectLostComponent},
  {path:'contact',component:ContactComponent}

       // Add this
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
