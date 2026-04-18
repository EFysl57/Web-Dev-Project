import { ChangeDetectorRef, Component } from '@angular/core';
import { AuthService } from '../app/auth.service';
import { Router } from '@angular/router';
import { ApiService } from '../api-service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-profile-component',
  imports: [CommonModule],
  templateUrl: './profile-component.html',
  styleUrl: './profile-component.css',
})
export class ProfileComponent {
  user: any;
  constructor(private api: ApiService, private authService: AuthService, private router: Router,
    private cd: ChangeDetectorRef
  ) {}



  ngOnInit() {
    this.getProfile()
  }
  getProfile() {
    this.api.getUser().subscribe((data: any) => {
      this.user = data;
      this.cd.detectChanges();
    }
    );
  }
  
  logout() {
    this.authService.logout();
    this.router.navigate(['/login'])
  }
}
