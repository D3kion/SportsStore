import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../model/auth.service';

@Component({
  templateUrl: 'admin.component.html',
})
export class AdminComponent {
  constructor(private router: Router, private auth: AuthService) {}

  logout() {
    this.auth.clear();
    this.router.navigateByUrl('/');
  }
}
