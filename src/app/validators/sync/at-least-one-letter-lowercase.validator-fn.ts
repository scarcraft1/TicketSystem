import { AbstractControl, ValidationErrors } from '@angular/forms';

export function AtLeastOneLetterLowercase(control: AbstractControl): ValidationErrors | null {
  if (typeof control.value === 'string' && control.value && !/[a-z]/.test(control.value)) {
    return { onelowercase: 'Should have at least one letter lowercase' };
  }
  return null;
}
