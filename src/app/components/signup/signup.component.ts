import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  registerData: string = "";
  isLoading: boolean = false;
  constructor(private _AuthService:AuthService , private _Router:Router) { }
  ngOnInit(): void {
  }
  registerForm: FormGroup = new FormGroup({
    first_name : new FormControl(null , [Validators.minLength(3) , Validators.maxLength(16) , Validators.required]) ,
    last_name : new FormControl(null , [Validators.minLength(3) , Validators.maxLength(16) , Validators.required]) ,
    email : new FormControl(null , [Validators.email , Validators.required]) ,
    age : new FormControl(null , [Validators.min(18) , Validators.maxLength(60) , Validators.required]) ,
    password : new FormControl(null , [Validators.pattern("^[A-Z][a-z]{3,8}") , Validators.required]) ,
  })
  register() {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this._AuthService.signUP(this.registerForm.value).subscribe({
        next: (res) => {
          if (res.message === "success") {
            this.isLoading = false;
            this._Router.navigate(["/signin"]);
          } else {
            this.isLoading = false;
            this.registerData = res.message;
          }
        }
    })
    }
  }
}
