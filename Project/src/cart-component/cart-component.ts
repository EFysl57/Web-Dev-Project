import { Component } from '@angular/core';
import { ApiService } from '../api-service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-cart-component',
  imports: [CommonModule],
  templateUrl: './cart-component.html',
  styleUrl: './cart-component.css',
})
export class CartComponent {
  cart: any[] = [];

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.api.getCart().subscribe((data: any) => {
      this.cart = data;
    });
  }

  remove(id: number) {
    this.api.removeFromCart(id).subscribe(() => this.load());
  }
}
