import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isLogin: boolean = false;
  constructor(private _AuthService:AuthService) { }

  ngOnInit(): void {
    if (localStorage.getItem("userToken")) {
      this._AuthService.saveUserData(); 
    }
    this._AuthService.userData.subscribe({
      next: () => {
        if (this._AuthService.userData.getValue()!=null) {
          this.isLogin = true;
        } else {
          this.isLogin = false;
        }
      }
    })
  }
  logOut() {
    this._AuthService.signOut();
  }
}
