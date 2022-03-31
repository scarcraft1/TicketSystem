import { AbstractControl, ValidationErrors } from '@angular/forms';

export function AtLeastOneDigit(control: AbstractControl): ValidationErrors | null {
  if (typeof control.value === 'string' && control.value && !/[0-9]/.test(control.value)) {
    return { onedigit: 'Should have at least one digit' };
  }
  return null;
}
