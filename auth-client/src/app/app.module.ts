import { NgModule } from "@angular/core";
import {
  BrowserModule,
  provideClientHydration,
} from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { ButtonModule } from "primeng/button";
import { CheckboxModule } from "primeng/checkbox";
import { InputTextModule } from "primeng/inputtext";
import { MenubarModule } from "primeng/menubar";
import { ToastModule } from "primeng/toast";
import { AvatarModule } from "primeng/avatar";
import { AvatarGroupModule } from "primeng/avatargroup";
import { MenuModule } from "primeng/menu";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { providePrimeNG } from "primeng/config";
import Aura from "@primeng/themes/aura";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { NavbarComponent } from "./navbar/navbar.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SignInComponent } from "./sign-in/sign-in.component";
import { SignupComponent } from "./signup/signup.component";
import { HomeComponent } from "./home/home.component";
import { FooterComponent } from "./footer/footer.component";
import {
  HttpClient,
  HttpClientModule,
  provideHttpClient,
  withInterceptorsFromDi,
} from "@angular/common/http";
import { MessageService } from "primeng/api";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SignInComponent,
    SignupComponent,
    HomeComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ButtonModule,
    CheckboxModule,
    ToastModule,
    InputTextModule,
    MenubarModule,
    FormsModule,
    ReactiveFormsModule,
    AvatarModule,
    AvatarGroupModule,
    MenuModule,
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    providePrimeNG({ theme: { preset: Aura } }),
    provideHttpClient(withInterceptorsFromDi()),
    MessageService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
