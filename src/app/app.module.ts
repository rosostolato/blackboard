// Angular Core
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Material and Bootstrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatListModule } from '@angular/material/list';

// Others Modules
import { PapaParseModule } from 'ngx-papaparse';
import { NgxFilequakeModule } from '@ebcoder/ngx-filequake';
import { DragAndDropModule } from 'angular-draggable-droppable';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
// import ngMediaModule from './ngMedia';

// Components
import { AppComponent } from './app.component';
import { PeriodTableComponent } from './period-table/period-table.component';
import { MateriasTableComponent } from './materias-table/materias-table.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ClickEffectDirective } from './materias-table/clickEffect/click-effect.directive';

@NgModule({
  declarations: [
    AppComponent,
    PeriodTableComponent,
    MateriasTableComponent,
    SidebarComponent,
    ClickEffectDirective
  ],
  imports: [
    MatListModule,
    // ngMediaModule,
    BrowserModule,
    PapaParseModule,
    DragAndDropModule,
    NgxFilequakeModule,
    NgbModule.forRoot(),
    AngularFontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
