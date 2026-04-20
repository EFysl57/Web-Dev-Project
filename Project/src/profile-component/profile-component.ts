import { ChangeDetectorRef, Component } from '@angular/core';
import { AuthService } from '../app/auth.service';
import { Router } from '@angular/router';
import { ApiService } from '../api-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-profile-component',
  imports: [CommonModule, FormsModule],
  templateUrl: './profile-component.html',
  styleUrl: './profile-component.css',
})
export class ProfileComponent {
  user = {
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    city: ''
  };



  constructor(private api: ApiService, private router: Router,
    private cd: ChangeDetectorRef
  ) {}



  ngOnInit() {
    this.getProfile()
  }
  getProfile() {
    this.api.getUser().subscribe({
      next: (data: any) => {
        this.user = data;
        this.cd.detectChanges();
      },
    error: (err) => {
      this.logout();
    }
    })
  }
  

  saveProfile() {
    this.api.updateUserProfile(this.user).subscribe({
      next: (res: any) => {
        alert('Profile saved successfully');
      },
      error: (err) => {
        console.error(err);
      }
    });
  }



  logout() {
    this.api.logout().subscribe({
      next: () => {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        this.router.navigate(['/login']);
      },

      error: () => {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        this.router.navigate(['/login']);
      }

    })
  }
}
