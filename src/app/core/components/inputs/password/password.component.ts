import { Component, forwardRef, Input } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css'],
  providers: [
    {
      multi: true,
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => PasswordComponent)
    },
    {
      multi: true,
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PasswordComponent)
    }
  ]
})
export class PasswordComponent implements ControlValueAccessor, Validator {
  @Input()
  minLength = 8;
  @Input()
  maxLength = Infinity;
  @Input()
  requireNumbers = true;
  @Input()
  requireUpperCase = true;
  @Input()
  requireLowerCase = true;
  @Input()
  requireSpecialChars = true;
  @Input()
  validSpecialChars: string = '#?!@$%^&*-';
  @Input()
  placeholder = 'Password';
  @Input()
  name = 'password';

  public isDisabled = false;
  public get val() { return this.value; }
  public set val(val: string) {
    this.value = val;
    this.onChange();
    this.onTouched();
    this.onValidationChange();
  }

  private value: string = '';
  private onChange: any = () => { };
  private onTouched: any = () => { };
  private onValidationChange: any = () => { };
  private readonly requireNumbersRegExp: RegExp = new RegExp(/[0-9]/);
  private readonly requireUpperCaseRegExp: RegExp = new RegExp(/[A-Z]/);
  private readonly requireLowerCaseRegExp: RegExp = new RegExp(/[a-z]/);
  private get requireSpecialCharsRegExp() {
    return new RegExp(`[${this.validSpecialChars.split('').join('|')}]`)
  }

  constructor() { }

  writeValue(value: string): void {
    this.value = value;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    const value = typeof control?.value === 'string' ? control.value : this.value;
    let errors: ValidationErrors | null = null;
    if (value.length < this.minLength) {
      const error: ValidationErrors = {minLength: { actual: value.length, required: this.minLength }}
      errors = errors ? {...errors as ValidationErrors, ...error} : error;
    }
    if (value.length > this.maxLength) {
      const error: ValidationErrors = {maxLength: { actual: value.length, required: this.maxLength }}
      errors = errors ? {...errors as ValidationErrors, ...error} : error;
    }
    if(this.requireNumbers && !this.requireNumbersRegExp.test(this.value)) {
      const error: ValidationErrors = {requireNumbers: 'The password should contain at least one number'}
      errors = errors ? {...errors as ValidationErrors, ...error} : error;
    }
    if(this.requireUpperCase && !this.requireUpperCaseRegExp.test(this.value)) {
      const error: ValidationErrors = {requireUpperCase: 'The password should contain at least one letter in upper case'}
      errors = errors ? {...errors as ValidationErrors, ...error} : error;
    }
    if(this.requireLowerCase && !this.requireLowerCaseRegExp.test(this.value)) {
      const error: ValidationErrors = {requireLowerCase: 'The password should contain at least one letter in lower case'}
      errors = errors ? {...errors as ValidationErrors, ...error} : error;
    }
    if(this.requireSpecialChars && !this.requireSpecialCharsRegExp.test(this.value)) {
      const error: ValidationErrors = {requireSpecialChars: `The password should contain at least one of the next special characters: ${this.validSpecialChars}`}
      errors = errors ? {...errors as ValidationErrors, ...error} : error;
    }
    return errors;
  }

  registerOnValidatorChange?(fn: () => void): void {
    this.onValidationChange = fn;
  }

}
