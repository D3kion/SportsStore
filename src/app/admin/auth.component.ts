import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../model/auth.service';

@Component({
  templateUrl: 'auth.component.html',
})
export class AuthComponent {
  public username: string = 'admin';
  public password: string = 'secret';
  public errorMsg: string | null = null;

  constructor(private router: Router, private auth: AuthService) {}

  authenticate(form: NgForm) {
    if (!form.valid) {
      this.errorMsg = 'Form Data Invalid';
      return;
    }

    this.auth.authenticate(this.username, this.password).subscribe((ok) => {
      if (ok) {
        this.router.navigateByUrl('/admin/main');
      }
      this.errorMsg = 'Authentication Failed';
    });
  }
}
