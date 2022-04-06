import { NgModule } from "@angular/core";
import { CoreModule } from "@core";
import { ValidityClassControlPipe } from "./validity-class-control.pipe";

@NgModule({
  imports: [CoreModule],
  exports: [ValidityClassControlPipe],
  providers: [ValidityClassControlPipe],
  declarations: [ValidityClassControlPipe]
})
export class ValidityClassControlPipeModule { }
