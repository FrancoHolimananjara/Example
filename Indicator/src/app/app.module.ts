import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './Components/nav-bar/nav-bar.component';
import { IndicatorComponent } from './Pages/Indicator/indicator/indicator.component';
import { IndicatorService } from './Services/indicator.service';
import { BulletinComponent } from './Pages/Bulletin/bulletin/bulletin.component';
import { LoginComponent } from './Pages/login/login.component';
import { DataService } from './Services/data.service';
import { AuthService } from './Services/auth.service';
import { AuthGuardService } from './Services/auth-guard.service';
import { SignUpComponent } from './Pages/sign-up/sign-up.component';
import { SimulationComponent } from './Pages/simulation/simulation.component';
import { DatePipe } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    IndicatorComponent,
    BulletinComponent,
    LoginComponent,
    SignUpComponent,
    SimulationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [IndicatorService, DataService, AuthService, AuthGuardService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
