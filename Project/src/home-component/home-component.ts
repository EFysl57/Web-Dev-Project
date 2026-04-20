import { Component } from '@angular/core';
import { ApiService } from '../api-service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../app/auth.service';

@Component({
  selector: 'app-home-component',
  standalone: true,
  imports: [ CommonModule],
  templateUrl: './home-component.html',
  styleUrl: './home-component.css',
})
export class HomeComponent {
  products: any[] = [];
  cart: any[] = [];
  constructor(private api: ApiService, private router: Router, private cd: ChangeDetectorRef, private authService: AuthService) {}

  ngOnInit() {
    this.loadProducts();
  }


  loadProducts() {
    this.api.getProducts().subscribe({
      next: (data: any) => {
        this.products = data;
        this.cd.detectChanges();
  }});
  }

  addToCart(id: number) {
    if(this.authService.isLoggedIn()) {
      this.api.addToCart(id).subscribe();
    }

    else {
      
      this.router.navigate(['login']);
      
    }

    
  }



  goToProduct(id: number) {
    this.router.navigate(['/product', id]);
  }
}
