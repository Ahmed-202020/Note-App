import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  constructor(private _AuthService:AuthService , private _Router:Router) { }
  ngOnInit(): void {
  }
  loginForm: FormGroup = new FormGroup({
    email : new FormControl(null , [Validators.email , Validators.required]) ,
    password : new FormControl(null , [Validators.pattern("^[A-Z][a-z]{3,8}") , Validators.required]) ,
  })
  login() {
    if (this.loginForm.valid) {
      this._AuthService.signIn();
      this._Router.navigate(["/profile"]);
    }
  }
}
