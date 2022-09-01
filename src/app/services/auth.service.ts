import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  ls:any = localStorage.getItem("login");
  login: boolean = JSON.parse(this.ls) || false;
  isLogin: any = new BehaviorSubject(this.login);
  constructor(private _Router:Router) { }

  signIn(){
    this.login = true;
    this.isLogin.next(this.login);
    localStorage.setItem("login", this.isLogin.getValue());
  }
  signOut(){
    this.login = false;
    this.isLogin.next(this.login);
    localStorage.setItem("login", this.isLogin.getValue());
    this._Router.navigate(["/signin"]);
  }
}
