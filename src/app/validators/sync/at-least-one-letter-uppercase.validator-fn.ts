import { AbstractControl, ValidationErrors } from '@angular/forms';

export function AtLeastOneLetterUppercase(control: AbstractControl): ValidationErrors | null {
  if (typeof control.value === 'string' && control.value && !/[A-Z]/.test(control.value)) {
    return { oneuppercase: 'Should have at least one letter uppercase' };
  }
  return null;
}
