import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Pipe({
  name: 'validityClassControl',
  pure: false
})
export class ValidityClassControlPipe implements PipeTransform {
  transform(form: AbstractControl, controlName: string, submitted: boolean): string {
    if (!form) return '';
    if (form instanceof FormGroup) {
      const control = form.get(controlName);
      if (control) {
        if (!submitted && control.pristine) return '';
        return control.valid ? 'is-valid' : 'is-invalid';
      }
    }
    if (!submitted && form.pristine) return '';
    return form.valid ? 'is-valid' : 'is-invalid';
  }
}
