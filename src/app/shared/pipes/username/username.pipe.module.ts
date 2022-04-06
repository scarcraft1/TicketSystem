import { NgModule } from "@angular/core";
import { CoreModule } from '@core';
import { UsernamePipe } from './username.pipe';

@NgModule({
  imports: [CoreModule],
  exports: [UsernamePipe],
  providers: [UsernamePipe],
  declarations: [UsernamePipe]
})
export class UsernamePipeModule { }
