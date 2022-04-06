import { NgModule } from '@angular/core';
import { CoreModule } from '@core';
import { PaginationComponent } from './pagination.component';

@NgModule({
  imports: [CoreModule],
  exports: [PaginationComponent],
  declarations: [PaginationComponent]
})
export class PaginationModule { }
