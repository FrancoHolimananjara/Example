import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BulletinComponent } from './Pages/Bulletin/bulletin/bulletin.component';
import { IndicatorComponent } from './Pages/Indicator/indicator/indicator.component';
import { LoginComponent } from './Pages/login/login.component';
import { SignUpComponent } from './Pages/sign-up/sign-up.component';
import { SimulationComponent } from './Pages/simulation/simulation.component';

const routes: Routes = [
  { path: '', component: IndicatorComponent },
  { path: 'login', component: LoginComponent },
  { path: 'create/new/account', component: SignUpComponent },
  { path: 'simulation', component: SimulationComponent },
  { path: 'new/indicator', component: IndicatorComponent },
  { path: 'bulletin', component: BulletinComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
