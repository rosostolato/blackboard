import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { PapaParseModule } from 'ngx-papaparse';
import { NgxFilequakeModule } from '@ebcoder/ngx-filequake';

import { AppComponent } from './app.component';
import { PeriodTableComponent } from './period-table/period-table.component';

@NgModule({
  declarations: [
    AppComponent,
    PeriodTableComponent
  ],
  imports: [
    BrowserModule,
    PapaParseModule,
    NgxFilequakeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
