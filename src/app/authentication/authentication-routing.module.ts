import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthenticationComponent } from './authentication.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';

const routes: Routes = [{
  path: '',
  component: AuthenticationComponent,
  children: [
    {
      path: 'login',
      component: LoginComponent,
    },
    {
      path: 'logout',
      component: LogoutComponent,
    },
    {
      path: '',
      redirectTo: 'login',
      pathMatch: 'full',
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthenticationRoutingModule {
}
