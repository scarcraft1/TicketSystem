import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

const CORE_MODULES = [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule];

@NgModule({
  imports: CORE_MODULES,
  exports: CORE_MODULES
})
export class CoreModule { }
