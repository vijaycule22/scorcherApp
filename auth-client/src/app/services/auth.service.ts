import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private apiUrl = "https://example.com/api"; // Replace with your backend URL

  constructor(private http: HttpClient, private router: Router) {}

  signIn(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/signin`, credentials);
  }

  // Optional: Additional methods for sign-up, logout, etc.
  signUp(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, data);
  }

  logout(): void {
    localStorage.removeItem("token"); // Example for token-based auth
    this.router.navigate(["/login"]);
  }
}
