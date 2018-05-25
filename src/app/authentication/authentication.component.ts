import { Component } from '@angular/core';


@Component({
  selector: 'ngx-authentication',
  template: `
    <nb-layout windowMode>
      <nb-layout-column class="main-content">
      <router-outlet></router-outlet>
      </nb-layout-column>
    </nb-layout>s
  `,
})
export class AuthenticationComponent {
}
