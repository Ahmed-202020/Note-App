import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';
import { Login, Register } from '../interfaces/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData:any = new BehaviorSubject(null);
  baseURL: string = "https://route-egypt-api.herokuapp.com/";
  constructor(private _HttpClient: HttpClient , private _Router:Router) { }

  saveUserData() {
    let encodedToken = JSON.stringify(localStorage.getItem("userToken"));
    let decodedToken = jwtDecode(encodedToken);
    this.userData.next(decodedToken);
  }
  signUP(registerForm:Register):Observable<any>{
    return this._HttpClient.post(this.baseURL + "signup" , registerForm)
  }
  signIn(loginForm:Login):Observable<any>{
    return this._HttpClient.post(this.baseURL + "signin" , loginForm)
  }
  signOut(){
    localStorage.removeItem("userToken");
    this.userData.next(null);
    this._Router.navigate(["/signin"]);
  }
}
