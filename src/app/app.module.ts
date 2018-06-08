import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { PapaParseModule } from 'ngx-papaparse';
import { NgxFilequakeModule } from '@ebcoder/ngx-filequake';
import { DragAndDropModule } from 'angular-draggable-droppable';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { AppComponent } from './app.component';
import { PeriodTableComponent } from './period-table/period-table.component';
import { MateriasTableComponent } from './materias-table/materias-table.component';

@NgModule({
  declarations: [
    AppComponent,
    PeriodTableComponent,
    MateriasTableComponent
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    PapaParseModule,
    NgxFilequakeModule,
    AngularFontAwesomeModule,
    DragAndDropModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
