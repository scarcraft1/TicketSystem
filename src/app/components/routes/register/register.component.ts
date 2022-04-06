import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@shared/services/';
import { AsyncValidators, SyncValidators } from 'src/app/validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  public form: FormGroup;
  public submitted = false;
  public errorRegistering = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly authService: AuthService
  ) {
    this.form = this.createForm();
  }

  public onSubmit() {
    this.submitted = true;
    this.errorRegistering = false;
    if (this.form.valid) {
      const value = this.form.value;
      this.authService.register(value.username, value.password)
        .subscribe(result => result ? this.router.navigate(['tickets']) : this.errorRegistering = true);
    }
  }

  private createForm(): FormGroup {
    return this.fb.group({
      username: ['', [Validators.required, Validators.email], AsyncValidators.UsernameIsTaken(this.authService)],
      password: ['', SyncValidators.Password],
      repeatPassword: ['', SyncValidators.Password]
    }, {
      validators: SyncValidators.PasswordMismatch
    });
  }

}
