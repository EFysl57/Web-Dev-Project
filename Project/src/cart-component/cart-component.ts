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
  total_price = 0;
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
    this.api.getCart().subscribe({
      next: (data: any) => {
        this.cart = data.items;
        this.total_price = data.total;
        this.cd.detectChanges();
      },
      error: (err) => {
        this.authService.logout();
        this.router.navigate(['/login'])
      }
  });
  }

  remove(id: number) {
    this.api.removeFromCart(id).subscribe(() => this.load());
  }

  update(item: any, quantity: number) {
    this.api.updateCartItem(item.id, quantity).subscribe({
      next: () => {
      this.load();
  }});
  }

  buy_action() {
    if(this.cart.length) {
      alert("Confirm operation");
    }
    
  }
}
