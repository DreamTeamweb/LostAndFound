import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
import { ObjectLostComponent } from './components/object-lost/object-lost.component';
import { ObjectFoundComponent } from './components/object-found/object-found.component';
import { ContactComponent } from './components/contact/contact.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [
  {path:'', redirectTo:'signin',pathMatch:'full'},
  {path:'object-found',component:ObjectFoundComponent},
  {path:'signup',component:SignupComponent},
  {path:'signin',component:SigninComponent},
  {path:'object-lost',component:ObjectLostComponent},
  {path:'contact',component:ContactComponent},
  {path:'home',component:HomeComponent}
       // Add this
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
