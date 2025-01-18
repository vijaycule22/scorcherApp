import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { MenuItem } from "primeng/api";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-navbar",
  standalone: false,

  templateUrl: "./navbar.component.html",
})
export class NavbarComponent {
  items: MenuItem[] | undefined;
  isUserLoggedIn = false;
  constructor(private router: Router, public authService: AuthService) {}

  ngOnInit() {
    let currentUser = this.authService.getCurrentUser();

    console.log(currentUser);
    this.items = [
      {
        label: "Home",
        icon: "pi pi-home",
        command: () => {
          this.router.navigate(["/"]);
        },
      },
      {
        label: "Features",
        icon: "pi pi-star",
      },
      {
        label: "Projects",
        icon: "pi pi-search",
        items: [
          {
            label: "Components",
            icon: "pi pi-bolt",
          },
          {
            label: "Blocks",
            icon: "pi pi-server",
          },
          {
            label: "UI Kit",
            icon: "pi pi-pencil",
          },
          {
            label: "Templates",
            icon: "pi pi-palette",
            items: [
              {
                label: "Apollo",
                icon: "pi pi-palette",
              },
              {
                label: "Ultima",
                icon: "pi pi-palette",
              },
            ],
          },
        ],
      },
      {
        label: "sign in",
        icon: "pi pi-user",
        command: () => {
          this.router.navigate(["/signin"]); // Use this.router to navigate
        },
      },
      {
        label: "sign out",
        icon: "pi pi-user",
        visible: this.authService.isLoggedIn(),
        command: () => {
          this.onSignOut();
        },
      },
    ];
  }

  onSignOut() {
    this.isUserLoggedIn = false;
    localStorage.removeItem("token");
    this.router.navigate(["/signin"]);
  }
}
