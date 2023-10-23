import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedInUsernameSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  public loggedInUsername$: Observable<string | null> = this.loggedInUsernameSubject.asObservable();
  private userDataSubject: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null); 
  public userData$: Observable<any | null> = this.userDataSubject.asObservable(); 

  getToken(): string {
    return localStorage.getItem('access_token') || '';
  }

  setUserData(userData: any): void {
    this.userDataSubject.next(userData);
  }

  getUserData(): Observable<any | null> {
    return this.userData$;
  }

  logout(): void {
    localStorage.removeItem('access_token');
    this.loggedInUsernameSubject.next(null);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    console.log("Token-->>", token)
    return !!token;
  }
}
