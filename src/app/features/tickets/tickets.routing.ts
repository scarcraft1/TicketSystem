import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { ListComponent,EditComponent, NewComponent } from "./components";

const ROUTES: Routes = [
  {
    path: '',
    component: ListComponent
  },
  {
    path: 'open',
    component: NewComponent
  },
  {
    path: ':id/edit',
    component: EditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class TicketsRoutingModule { }
