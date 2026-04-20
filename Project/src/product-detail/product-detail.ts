import { Component } from '@angular/core';
import { ApiService } from '../api-service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../app/auth.service';
@Component({
  selector: 'app-product-detail',
  imports: [CommonModule],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetail {
  product: any;

  constructor(private api: ApiService, private route: ActivatedRoute, private cd: ChangeDetectorRef, private authService: AuthService, private router: Router) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];

    this.api.getProduct(id).subscribe({
      next: (data: any) => {
        this.product = data;
        this.cd.detectChanges();
    }});
  
  }


  buyProduct() {
    if(this.authService.isLoggedIn()) {
      alert("Confirm operation");
    }

    else {
      this.router.navigate(['login'])
    }
    
  }
 


  addToCart(id: number) {
    if(this.authService.isLoggedIn()) {
      this.api.addToCart(id).subscribe();
      alert("Added to cart");
    }

    else {
      this.router.navigate(['login']);
    }

    
  }

}