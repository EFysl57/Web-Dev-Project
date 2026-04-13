import { Component } from '@angular/core';
import { ApiService } from '../api-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-component',
  imports: [FormsModule],
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
      console.log(res);
      localStorage.setItem('token', res.access);
    }) 
  }

}
