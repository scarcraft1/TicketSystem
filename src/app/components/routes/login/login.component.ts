import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { SyncValidators } from 'src/app/validators';
import { AuthService } from '../../../services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  public submitted = false;
  public invalidLogin = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly authService: AuthService) {
    this.form = this.createForm();
  }

  ngOnInit(): void {
  }

  private createForm() {
    return this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', SyncValidators.Password]
    });
  }

  public onSubmit() {
    this.submitted = true;
    this.invalidLogin = false;
    if (this.form.valid) {
      const value = this.form.value;
      this.authService.logIn(value.username, value.password)
        .subscribe(login => login ? this.router.navigate(['tickets']) : this.invalidLogin = true);
    }
  }

}
