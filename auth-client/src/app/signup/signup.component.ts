import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"],
  standalone: false,
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(public router: Router, private fb: FormBuilder) {
    this.signupForm = this.fb.group({
      username: ["", [Validators.required, Validators.minLength(3)]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      confirmPassword: ["", [Validators.required]],
      terms: [false, Validators.requiredTrue],
    });
  }

  checkPasswords() {
    console.log(this.signupForm.value);
    const password = this.signupForm.get("password")?.value;
    const confirmPassword = this.signupForm.get("confirmPassword")?.value;
    if (password !== confirmPassword) {
      this.signupForm.get("confirmPassword")?.setErrors({ mismatch: true });
    } else {
      this.signupForm.get("confirmPassword")?.setErrors(null);
    }
  }

  onSubmit() {
    if (this.signupForm.valid) {
      console.log("Form Data:", this.signupForm.value);
    } else {
      console.log("Form Invalid");
      this.signupForm.markAllAsTouched();
    }
  }
}
