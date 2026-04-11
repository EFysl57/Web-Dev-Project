import { Component } from '@angular/core';
import { ApiService } from '../api-service';

@Component({
  selector: 'app-login-component',
  imports: [],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private api: ApiService) {

  }


  login() {
    this.api.login({
      
      username: this.username,
      password: this.password
    }).subscribe((res: any) => {
      localStorage.setItem('token', res.access);
    }) 
  }

}
