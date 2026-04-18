import { Routes } from '@angular/router';
import { HomeComponent } from '../home-component/home-component';
import { CartComponent } from '../cart-component/cart-component';
import { LoginComponent } from '../login-component/login-component';
import { ProductDetail } from '../product-detail/product-detail';
import { ProfileComponent } from '../profile-component/profile-component';
export const routes: Routes = [
      { path: '', component: HomeComponent },
    { path: 'cart', component: CartComponent },
    { path: 'login', component: LoginComponent },
    { path: 'product/:id', component: ProductDetail },
    {path: 'profile', component: ProfileComponent}
];
