import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { jwtDecode } from "jwt-decode";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private apiUrl = "http://localhost:4000/api/auth/"; // Replace with your backend URL
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient, private router: Router) {}

  signIn(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  // Optional: Additional methods for sign-up, logout, etc.
  signUp(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, data);
  }

  logout(): void {
    localStorage.removeItem("token"); // Example for token-based auth
    this.router.navigate(["/login"]);
  }

  isLoggedIn(): boolean {
    let jwtHelper = new JwtHelperService();
    let token = "";
    if (typeof window !== "undefined") {
      if (localStorage.getItem("token")) {
        token = localStorage.getItem("token") || "";
      }
    }

    if (!token) {
      return false;
    }

    let isExpired = jwtHelper.isTokenExpired(token);

    return !isExpired;
  }

  getCurrentUser() {
    let token = "";
    if (typeof window !== "undefined") {
      if (localStorage.getItem("token")) {
        token = localStorage.getItem("token") || "";
      }
    }
    if (token) {
      return jwtDecode(token);
    }
    return null;
  }
}
