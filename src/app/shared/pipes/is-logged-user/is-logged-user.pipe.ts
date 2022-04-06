import { Pipe, PipeTransform } from '@angular/core';
import { AuthService } from '@shared/services';

@Pipe({
  name: 'isLoggedUser'
})
export class IsLoggedUserPipe implements PipeTransform {
  constructor(private readonly service: AuthService) { }

  transform(userId: string): boolean {
    return this.service.curentUserID === userId;
  }

}
