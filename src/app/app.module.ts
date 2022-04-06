import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CoreModule } from '@core';
import { ValidityClassControlPipeModule } from '@shared/pipes';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { COMPONENTS } from './components';

@NgModule({
  declarations: [
    AppComponent,
    ...COMPONENTS
  ],
  imports: [
    CoreModule,
    BrowserModule,
    AppRoutingModule,
    ValidityClassControlPipeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
