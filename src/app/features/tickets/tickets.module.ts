import { NgModule } from '@angular/core';
import { CoreModule } from '@core';
import { PaginationModule } from '@shared/components';
import { IsLoggedUserPipeModule, UsernamePipeModule, ValidityClassControlPipeModule } from '@shared/pipes';
import { COMPONENTS } from './components';
import { TicketsRoutingModule } from './tickets.routing';

@NgModule({
  declarations: COMPONENTS,
  imports: [
    CoreModule,
    PaginationModule,
    UsernamePipeModule,
    TicketsRoutingModule,
    IsLoggedUserPipeModule,
    ValidityClassControlPipeModule,
  ]
})
export class TicketsModule { }
