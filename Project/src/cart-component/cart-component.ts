import { Component } from '@angular/core';
import { ApiService } from '../api-service';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../app/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cart-component',
  imports: [CommonModule],
  templateUrl: './cart-component.html',
  styleUrl: './cart-component.css',
})
export class CartComponent {
  cart: any[] = [];

  constructor(private api: ApiService, private cd: ChangeDetectorRef, private authService: AuthService, private router: Router) {}


  ngOnInit() {

    if (this.authService.isLoggedIn()) {
      this.load();
    }

    else {
      this.router.navigate(['/login']);
    }
    
  }




  load() {
    this.api.getCart().subscribe((data: any) => {
      this.cart = data;
      this.cd.detectChanges();
    });
  }

  remove(id: number) {
    this.api.removeFromCart(id).subscribe(() => this.load());
  }
}
