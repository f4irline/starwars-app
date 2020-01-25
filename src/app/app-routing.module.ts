import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './services/auth/auth.guard';


const routes: Routes = [{
  path: '',
  component: LoginComponent,
}, {
  path: 'home',
  component: HomeComponent,
  canActivate: [AuthGuard],
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
