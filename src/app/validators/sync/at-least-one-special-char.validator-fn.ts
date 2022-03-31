import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function AtLeastOneSpecialChar(specialChars: string): ValidatorFn {
  const regExp = new RegExp(`[${specialChars.split('').join('|')}]`);
  return (control: AbstractControl): ValidationErrors | null => {
    if (typeof control.value === 'string' && control.value && !regExp.test(control.value)) {
      return { onespecialchar: 'Should have at least one oh the next special chars: ' + specialChars };
    }
    return null;
  }
}
