import { NgModule } from '@angular/core';

import { ThemeModule } from '../@theme/theme.module';
import { AuthenticationComponent } from './authentication.component';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';

const PAGES_COMPONENTS = [
  AuthenticationComponent,
  LoginComponent,
  LogoutComponent
];

@NgModule({
  imports: [
    AuthenticationRoutingModule,
    ThemeModule,
  ],
  declarations: [
    ...PAGES_COMPONENTS,
  ],
})
export class AuthenticationModule {
}
