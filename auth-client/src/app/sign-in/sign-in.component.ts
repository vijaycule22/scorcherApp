import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.scss"],
  standalone: false,
})
export class SignInComponent {
  signInForm: FormGroup;

  constructor(
    public router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.signInForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
      rememberMe: [false],
    });
  }

  ngOnInit() {}

  onSubmit() {
    if (this.signInForm.valid) {
      this.authService.signIn(this.signInForm.value).subscribe({
        next: (response) => {
          console.log("Sign-In Successful", response);
          // Store token, redirect, etc.
          localStorage.setItem("token", response.token);
        },
        error: (error) => {
          console.error("Sign-In Failed", error);
          // Display error to the user
        },
      });
    } else {
      console.log("Form Invalid");
      this.signInForm.markAllAsTouched();
    }
  }
}
