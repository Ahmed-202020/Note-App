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
    const ls = localStorage.getItem("login");
    if (ls) {
      this.isLogin = JSON.parse(ls);
    }
    this._AuthService.isLogin.subscribe(() => {
      this.isLogin = this._AuthService.isLogin.getValue();
    })
  }
  logOut() {
    this._AuthService.signOut();
  }
}
