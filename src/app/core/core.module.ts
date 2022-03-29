import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { COMPONENTS } from './components';

const CORE_MODULES = [
  CommonModule,
  FormsModule,
  HttpClientModule,
  ReactiveFormsModule,
];


@NgModule({
  declarations: COMPONENTS,
  imports: CORE_MODULES,
  exports: [...CORE_MODULES, ...COMPONENTS]
})
export class CoreModule { }
