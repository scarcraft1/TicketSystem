import { Pipe, PipeTransform } from '@angular/core';
import { map, Observable } from 'rxjs';
import { UsersService } from 'src/app/services';

@Pipe({
  name: 'username$'
})
export class UsernamePipe implements PipeTransform {

  constructor(private readonly service: UsersService) { }

  transform(userId: string): Observable<string> {
    return this.service.loadUsers()
      .pipe(map(users => users.reduce((acc, user) => acc ? acc : user._id === userId ? user.username : '', '')));
  }

}
