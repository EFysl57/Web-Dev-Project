import { Component } from '@angular/core';
import { ApiService } from '../api-service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-product-detail',
  imports: [CommonModule],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetail {
  product: any;

  constructor(private api: ApiService, private route: ActivatedRoute, private cd: ChangeDetectorRef) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];

    this.api.getProduct(id).subscribe((data: any) => {
      this.product = data;
      this.cd.detectChanges();
    });
  }
}
