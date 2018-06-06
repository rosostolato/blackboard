import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {NgxFilequakeModule} from '@ebcoder/ngx-filequake';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxFilequakeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
