import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { UserComponent } from "./user/user.component";
import { AppRoutingModule } from "./app-routing.module";
import { FormsComponent } from "./forms/forms.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ReactiveFormComponent } from "./reactive-form/reactive-form.component";
import { LoginFormComponent } from "./login-form/login-form.component";
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { MatStepperModule } from "@angular/material/stepper";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AddSectionDirective } from "./directives/add-section.directive";
import { HomeEditComponent } from "./home/home-edit/home-edit.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { StaticDataModel } from "./data.model";
import { LoaderInterceptor } from "./loader.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserComponent,
    FormsComponent,
    ReactiveFormComponent,
    LoginFormComponent,
    AddSectionDirective,
    HomeEditComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgMultiSelectDropDownModule.forRoot(),
    MatStepperModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [
    StaticDataModel,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
