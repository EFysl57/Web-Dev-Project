import { Component } from '@angular/core';
import { ApiService } from '../api-service';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../app/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-login-component',
  imports: [FormsModule, CommonModule],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
})
export class LoginComponent {
  username = '';
  password = '';
  isLoggedIn$: any;
  constructor(private api: ApiService, private cd: ChangeDetectorRef, private authService: AuthService, private router: Router) {
    this.isLoggedIn$ = this.authService.isLoggedIn$;

  }

  login() {
    this.api.login({
      
      username: this.username,
      password: this.password
    }).subscribe((res: any) => {
      console.log(res);
      this.authService.login(res.access);
    }) 
  }
  logout() {
    this.authService.logout();
  }
}
