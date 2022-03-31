import { AbstractControl, ValidationErrors } from '@angular/forms';

export function PasswordMismatch(control: AbstractControl): ValidationErrors | null {
  return control?.value.password !== control?.value.repeatPassword
  ? { passwordMismatch: 'The passwords don\'t match.' } as ValidationErrors
  : null;
}
