import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private loggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  isLoggedIn$ = this.loggedInSubject.asObservable();

  private hasToken(): boolean {
    return !!localStorage.getItem('access');
  }

  getToken(): string | null {
    return localStorage.getItem('access');
  }


  isLoggedIn(): boolean {
    if(this.getToken()) {
      return true;
    }

    else {
      return false;
    }
  }

  login(token: string) {
    localStorage.setItem('access', token);
    this.loggedInSubject.next(true);
  }

}