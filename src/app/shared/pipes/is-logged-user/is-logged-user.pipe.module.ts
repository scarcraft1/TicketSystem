import { NgModule } from "@angular/core";
import { CoreModule } from '../../../../core/core.module';
import { IsLoggedUserPipe } from './is-logged-user.pipe';

@NgModule({
  imports: [CoreModule],
  exports: [IsLoggedUserPipe],
  providers: [IsLoggedUserPipe],
  declarations: [IsLoggedUserPipe]
})
export class IsLoggedUserPipeModule { }
