import { Component } from '@angular/core';
import { ApiService } from '../api-service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-home-component',
  standalone: true,
  imports: [ CommonModule],
  templateUrl: './home-component.html',
  styleUrl: './home-component.css',
})
export class HomeComponent {
  products: any[] = [];

  constructor(private api: ApiService, private router: Router, private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadProducts();
  }


  loadProducts() {
    this.api.getProducts().subscribe((data: any) => {
      this.products = data;
      this.cd.detectChanges();
    });
  }

  addToCart(id: number) {
    this.api.addToCart(id).subscribe();
  }

  goToProduct(id: number) {
    this.router.navigate(['/product', id]);
  }
}
