import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './app/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  API = 'http://127.0.0.1:8000/api/';

  constructor(private http: HttpClient) {}

  login(data: any) {
    return this.http.post(this.API + 'login/', data);
  }


  getProducts() {
      return this.http.get(this.API + 'products/');
  }

  getProduct(id: number) {
      return this.http.get(this.API + 'products/' + id + '/');
  }

  addToCart(productId: number) {


    return this.http.post(this.API + 'cart/add/', {
      product_id: productId
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
  }
  getCart() {


    return this.http.get(this.API + 'cart/');
  }

  removeFromCart(id: number) {
    return this.http.delete(this.API + 'cart/remove/' + id + '/');
  }

}
