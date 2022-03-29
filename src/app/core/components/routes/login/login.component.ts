import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PASSWORD } from '../../../constants/regexp';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() loggedIn = new EventEmitter<boolean>();
  public form: FormGroup;

  constructor(private readonly fb: FormBuilder) {
    this.form = fb.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      password: ['', [Validators.required, Validators.pattern(PASSWORD)]]
    })
  }

  ngOnInit(): void {
  }

}
