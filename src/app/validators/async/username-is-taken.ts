import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { debounceTime, map, Observable, of, switchMap, take } from 'rxjs';
import { AuthService } from '../../services/auth.service';

export function UsernameIsTaken(service: AuthService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return control.valueChanges
      .pipe(
        debounceTime(500),
        take(1),
        switchMap(username => username ? service.usernameIsTaken(username) : of(null)),
        map(isTaken => isTaken ? { usernametaken: 'This username is already taken' } : null));
  }
}
