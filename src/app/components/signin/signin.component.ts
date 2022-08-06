import { Component, OnInit } from '@angular/core';
import { PluginService } from '../../services/plugin.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  loginData: string = "";
  isLoading: boolean = false;
  constructor(private _PluginService: PluginService , private _AuthService:AuthService , private _Router:Router) { }
  ngOnInit(): void {
    this._PluginService.getPlugin("#signin") ;
  }
  loginForm: FormGroup = new FormGroup({
    email : new FormControl(null , [Validators.email , Validators.required]) ,
    password : new FormControl(null , [Validators.pattern("^[A-Z][a-z]{3,8}") , Validators.required]) ,
  })
  login() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this._AuthService.signIn(this.loginForm.value).subscribe({
        next: (res) => {
          if (res.message === "success") {
            this.isLoading = false;
            localStorage.setItem("userToken", res.token);
            this._AuthService.saveUserData();
            this._Router.navigate(["/profile"]);
          } else {
            this.isLoading = false;
            this.loginData = res.message;
          }
        }
    })
    }
  }

}
