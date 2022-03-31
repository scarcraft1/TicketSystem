import { NgModule } from '@angular/core';
import { CoreModule } from '@core';
import { COMPONENTS } from './components';
import { TicketsRoutingModule } from './tickets.routing';



@NgModule({
  declarations: COMPONENTS,
  imports: [
    CoreModule,
    TicketsRoutingModule
  ]
})
export class TicketsModule { }
