import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthGuard } from './guards/auth.guard';
import { IsLoginGuard } from './guards/is-login.guard';


const routes: Routes = [
  {path: "" , redirectTo:"profile" , pathMatch:"full"} ,
  {path:"signin" , canActivate:[IsLoginGuard] , component:SigninComponent} ,
  {path:"signup" , canActivate:[IsLoginGuard] , component:SignupComponent} ,
  {path:"profile" , canActivate:[AuthGuard] ,  component:ProfileComponent} ,
  {path: "**" , component:NotFoundComponent} ,
];

@NgModule({
  imports: [RouterModule.forRoot(routes , {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
